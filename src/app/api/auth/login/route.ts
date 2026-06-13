import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { verifyPassword, generateJwt } from "@/lib/auth"
import { loginSchema } from "@/lib/validation"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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

/**
 * Seed endpoint to create the initial admin user.
 * POST /api/auth/login?seed=1 with body: { email, password, name }
 */
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    if (searchParams.get("seed") !== "1") {
      return NextResponse.json({ error: "Use POST for login, or add ?seed=1 to create admin" }, { status: 400 })
    }

    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "email, password, and name are required" }, { status: 400 })
    }

    const db = getDb()
    const existing = db.prepare("SELECT id FROM admin_users WHERE email = ?").get(email)
    if (existing) {
      return NextResponse.json({ error: "Admin user already exists" }, { status: 409 })
    }

    const id = uuidv4()
    const passwordHash = bcrypt.hashSync(password, 12)

    db.prepare(
      "INSERT INTO admin_users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)"
    ).run(id, email, passwordHash, name, "admin")

    return NextResponse.json({ success: true, id, email, name }, { status: 201 })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}