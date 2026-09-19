import { NextRequest, NextResponse } from "next/server"
import { timingSafeEqual } from 'node:crypto'
import { getDb } from "@/lib/db"
import { validateApiKey, verifyJwt, type JwtPayload } from "@/lib/auth"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiKeyInfo {
  id: string
  name: string
  scopes: string[]
}

export interface UserInfo {
  sub: string
  email: string
  role: string
}

export type ApiHandler<T = unknown> = (
  request: NextRequest,
  context: T
) => Promise<NextResponse> | NextResponse

// ─── readJsonBody ──────────────────────────────────────────────────────────────
// Safely parse a JSON request body. Returns either the parsed data or a
// ready-to-send 400 NextResponse (empty body, malformed JSON, etc.).
export async function readJsonBody<T = unknown>(
  request: NextRequest
): Promise<{ data: T } | { error: NextResponse }> {
  try {
    const text = await request.text()
    if (!text.trim()) {
      return {
        error: NextResponse.json(
          { error: "Request body is required. Send a JSON body with Content-Type: application/json." },
          { status: 400 }
        ),
      }
    }
    return { data: JSON.parse(text) as T }
  } catch {
    return {
      error: NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      ),
    }
  }
}

// ─── withApiAuth ──────────────────────────────────────────────────────────────

export function withApiAuth(
  handler: ApiHandler<{ apiKey: ApiKeyInfo }>,
  requiredScopes: string[] = []
): ApiHandler<Record<string, unknown>> {
  return async (request: NextRequest) => {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header. Use: Bearer <api_key>" },
        { status: 401 }
      )
    }

    const rawKey = authHeader.slice(7).trim()
    const result = validateApiKey(rawKey)

    if (!result.valid || !result.key) {
      return NextResponse.json(
        { error: "Invalid or revoked API key" },
        { status: 401 }
      )
    }

    // Check scopes
    if (requiredScopes.length > 0) {
      const hasAllScopes = requiredScopes.every((scope) =>
        result.key!.scopes.includes("admin") || result.key!.scopes.includes(scope)
      )
      if (!hasAllScopes) {
        return NextResponse.json(
          {
            error: "Insufficient permissions",
            required: requiredScopes,
            granted: result.key.scopes,
          },
          { status: 403 }
        )
      }
    }

    // Log the request
    const start = Date.now()
    const response = await handler(request, { apiKey: result.key })
    const duration = Date.now() - start

    try {
      const db = getDb()
      db.prepare(
        "INSERT INTO api_logs (api_key_id, endpoint, method, status_code, ip, duration_ms) VALUES (?, ?, ?, ?, ?, ?)"
      ).run(
        result.key.id,
        request.nextUrl.pathname,
        request.method,
        response.status,
        request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "",
        duration
      )
    } catch {
      // Logging failure should not break the response
    }

    return response
  }
}

// ─── withJwtAuth ──────────────────────────────────────────────────────────────

export function withJwtAuth(
  handler: ApiHandler<{ user: UserInfo }>
): ApiHandler<Record<string, unknown>> {
  return async (request: NextRequest) => {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header. Use: Bearer <jwt_token>" },
        { status: 401 }
      )
    }

    const token = authHeader.slice(7).trim()
    const payload = verifyJwt(token)

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired JWT token" },
        { status: 401 }
      )
    }

    return handler(request, {
      user: { sub: payload.sub, email: payload.email, role: payload.role },
    })
  }
}

// ─── withRateLimit ─────────────────────────────────────────────────────────────

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  /** Optional bucket name so different endpoints do not share a counter. */
  bucket?: string
}

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function withRateLimit(
  handler: ApiHandler<Record<string, unknown>>,
  config: RateLimitConfig = { maxRequests: 100, windowMs: 60000 }
): ApiHandler<Record<string, unknown>> {
  return async (request: NextRequest) => {
    // cf-connecting-ip is the only trustworthy source behind Cloudflare;
    // x-forwarded-for can be supplied by the caller.
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1"

    const bucket = config.bucket || new URL(request.url).pathname
    const key = bucket + ":" + ip

    const now = Date.now()
    const entry = rateLimitStore.get(key)

    if (!entry || now > entry.resetAt) {
      rateLimitStore.set(key, { count: 1, resetAt: now + config.windowMs })
    } else {
      entry.count++
      if (entry.count > config.maxRequests) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
        return NextResponse.json(
          {
            error: "Too many requests",
            retryAfterSeconds: retryAfter,
          },
          {
            status: 429,
            headers: { "Retry-After": String(retryAfter) },
          }
        )
      }
    }

    return handler(request, {})
  }
}

// ─── withRequestLog ────────────────────────────────────────────────────────────

export function withRequestLog(
  handler: ApiHandler<Record<string, unknown>>
): ApiHandler<Record<string, unknown>> {
  return async (request: NextRequest) => {
    const start = Date.now()
    const response = await handler(request, {})
    const duration = Date.now() - start

    try {
      const db = getDb()
      db.prepare(
        "INSERT INTO api_logs (api_key_id, endpoint, method, status_code, ip, duration_ms) VALUES (?, ?, ?, ?, ?, ?)"
      ).run(
        null,
        request.nextUrl.pathname,
        request.method,
        response.status,
        request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "",
        duration
      )
    } catch {
      // Logging failure should not break the response
    }

    return response
  }
}

// --- withSeedAuth -------------------------------------------------------
//
// Guards the one-time bootstrap endpoints (/api/seed). These create an admin
// user and a full-scope API key, so they must never be reachable anonymously.
//
// Fail-closed: if SEED_TOKEN is unconfigured the endpoint is disabled entirely
// (503) rather than left open. Supply the token as either
// `X-Seed-Token: <token>` or `Authorization: Bearer <token>`.

const MIN_SEED_TOKEN_LENGTH = 32

function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8')
  const bufB = Buffer.from(b, 'utf8')
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function withSeedAuth(
  handler: ApiHandler<Record<string, unknown>>
): ApiHandler<Record<string, unknown>> {
  return async (request: NextRequest) => {
    const configured = (process.env.SEED_TOKEN || '').trim()

    if (configured.length < MIN_SEED_TOKEN_LENGTH) {
      return NextResponse.json(
        {
          error:
            'Seeding is disabled. Set a SEED_TOKEN of at least 32 characters to enable the bootstrap endpoint.',
        },
        { status: 503 }
      )
    }

    const authHeader = request.headers.get('authorization') || ''
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : ''
    const provided = (request.headers.get('x-seed-token') || bearer).trim()

    if (!provided || !constantTimeEquals(provided, configured)) {
      return NextResponse.json(
        { error: 'Unauthorized. A valid seed token is required.' },
        { status: 401 }
      )
    }

    return handler(request, {})
  }
}
