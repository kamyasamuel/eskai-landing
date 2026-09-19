import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { readJsonBody, withRateLimit } from "@/lib/middleware"
import { verifyPassword, generateJwt } from "@/lib/auth"
import { loginSchema } from "@/lib/validation"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

async function handleLogin(request: NextRequest) {
  try {
    const bodyResult = await readJsonBody<unknown>(request)
    if ("error" in bodyResult) return bodyResult.error

    const body = bodyResult.data
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data
    const db = getDb()

    const user = db
      .prepare("SELECT id, email, password_hash, name, role FROM admin_users WHERE email = ?")
      .get(email) as
      | { id: string; email: string; password_hash: string; name: string; role: string }
      | undefined

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = generateJwt({ id: user.id, email: user.email, role: user.role })

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Login is rate limited to blunt credential-stuffing / brute-force attempts.
export const POST = withRateLimit(handleLogin, {
  maxRequests: 10,
  windowMs: 300000,
  bucket: 'login',
})

/**
 * The former PUT /api/auth/login?seed=1 bootstrap path has been REMOVED.
 *
 * It created an admin user for any supplied email address, so an anonymous
 * caller could mint their own admin account and then log in. Bootstrap now
 * lives only at the token-protected POST /api/seed.
 */
export async function PUT() {
  return NextResponse.json(
    { error: 'This endpoint has been removed. Use POST /api/seed with a valid seed token.' },
    { status: 405 }
  )
}
