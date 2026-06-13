import { NextRequest, NextResponse } from "next/server"
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
}

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function withRateLimit(
  handler: ApiHandler<Record<string, unknown>>,
  config: RateLimitConfig = { maxRequests: 100, windowMs: 60000 }
): ApiHandler<Record<string, unknown>> {
  return async (request: NextRequest) => {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1"

    const now = Date.now()
    const entry = rateLimitStore.get(ip)

    if (!entry || now > entry.resetAt) {
      rateLimitStore.set(ip, { count: 1, resetAt: now + config.windowMs })
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