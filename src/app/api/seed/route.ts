import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import { createApiKey } from "@/lib/auth"

/**
 * POST /api/seed
 * Seeds the database with initial admin user and API key.
 * Only works if no admin user exists yet.
 *
 * Body: { email, password, name }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "email, password, and name are required" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    const db = getDb()

    // Check if admin already exists
    const existing = db.prepare("SELECT id FROM admin_users LIMIT 1").get()
    if (existing) {
      return NextResponse.json(
        { error: "An admin user already exists. Use PUT /api/auth/login?seed=1 to reset." },
        { status: 409 }
      )
    }

    // Create admin user
    const adminId = uuidv4()
    const passwordHash = bcrypt.hashSync(password, 12)

    db.prepare(
      "INSERT INTO admin_users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)"
    ).run(adminId, email, passwordHash, name, "admin")

    // Create a default API key with all scopes
    const apiKey = createApiKey(
      "Default Admin Key",
      ["read:applications", "write:applications", "read:analytics", "read:stats", "admin", "export"]
    )

    return NextResponse.json(
      {
        success: true,
        adminUser: { id: adminId, email, name },
        apiKey: {
          id: apiKey.id,
          prefix: apiKey.prefix,
          rawKey: apiKey.rawKey,
          name: apiKey.name,
          scopes: ["read:applications", "write:applications", "read:analytics", "read:stats", "admin", "export"],
          message: "⚠️ Save this raw key — it will never be shown again",
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}