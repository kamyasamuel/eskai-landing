import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import { applicationSchema } from "@/lib/validation"

/**
 * @deprecated Use POST /api/v1/applications and GET /api/v1/applications instead
 * 
 * Legacy applications endpoint — kept for backward compatibility.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = applicationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const {
      fullName,
      email,
      phone,
      company,
      role,
      employees,
      interest,
      useCase,
      currentTools,
      referral,
    } = parsed.data

    const db = getDb()

    // Check for duplicate email
    const existing = db
      .prepare("SELECT id, status FROM applications WHERE email = ?")
      .get(email) as { id: string; status: string } | undefined

    if (existing && existing.status !== "deleted") {
      return NextResponse.json(
        { error: "An application with this email already exists", id: existing.id },
        { status: 409 }
      )
    }

    const id = uuidv4()
    const stmt = db.prepare(`
      INSERT INTO applications (id, full_name, email, phone, company, role, employees, interest, use_case, current_tools, referral)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      id,
      fullName,
      email,
      phone || "",
      company || "",
      role,
      employees || "",
      JSON.stringify(interest || []),
      useCase,
      currentTools || "",
      referral || ""
    )

    return NextResponse.json({ success: true, id, deprecated: true }, { status: 201 })
  } catch (error) {
    console.error("Application submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = getDb()
    const rows = db
      .prepare("SELECT * FROM applications ORDER BY created_at DESC LIMIT 100")
      .all()

    return NextResponse.json({ applications: rows, deprecated: true })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}