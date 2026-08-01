import { NextRequest, NextResponse } from "next/server"
import { withApiAuth } from "@/lib/middleware"
import { getDb } from "@/lib/db"
import { paginationSchema, applicationSchema } from "@/lib/validation"
import { v4 as uuidv4 } from "uuid"
import type { ApiKeyInfo } from "@/lib/middleware"

async function handleGetApplications(
  request: NextRequest,
  { apiKey }: { apiKey: ApiKeyInfo }
) {
  try {
    const url = new URL(request.url)
    const queryParams = Object.fromEntries(url.searchParams.entries())
    const parsed = paginationSchema.safeParse(queryParams)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { page, limit, sort, order, search, status, startDate, endDate } = parsed.data
    const db = getDb()

    // Build dynamic WHERE clause
    const conditions: string[] = []
    const params: unknown[] = []

    // Exclude deleted records by default
    conditions.push("(status IS NULL OR status != 'deleted')")

    if (search) {
      conditions.push("(full_name LIKE ? OR email LIKE ? OR company LIKE ? OR use_case LIKE ?)")
      const like = `%${search}%`
      params.push(like, like, like, like)
    }

    if (status) {
      conditions.push("status = ?")
      params.push(status)
    }

    if (startDate) {
      conditions.push("created_at >= ?")
      params.push(startDate)
    }

    if (endDate) {
      conditions.push("created_at <= ?")
      params.push(endDate)
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""

    // Validate sort column (prevent SQL injection)
    const allowedSorts = ["created_at", "full_name", "email", "company", "role", "status"]
    const safeSort = allowedSorts.includes(sort) ? sort : "created_at"
    const safeOrder = order === "asc" ? "ASC" : "DESC"

    // Get total count
    const countRow = db
      .prepare(`SELECT COUNT(*) as total FROM applications ${whereClause}`)
      .get(...params) as { total: number }
    const total = countRow.total
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit

    // Get paginated data
    const applications = db
      .prepare(
        `SELECT * FROM applications ${whereClause} ORDER BY ${safeSort} ${safeOrder} LIMIT ? OFFSET ?`
      )
      .all(...params, limit, offset)

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleBulkUpdate(
  request: NextRequest,
  { apiKey }: { apiKey: ApiKeyInfo }
) {
  try {
    const body = await request.json()

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Request body must be an array of { id, status?, notes? }" },
        { status: 400 }
      )
    }

    const db = getDb()
    const results: { id: string; success: boolean; error?: string }[] = []

    const updateStmt = db.prepare(`
      UPDATE applications
      SET status = COALESCE(?, status),
          notes = COALESCE(?, notes)
      WHERE id = ?
    `)

    const transaction = db.transaction(() => {
      for (const item of body) {
        if (!item.id) {
          results.push({ id: item.id || "unknown", success: false, error: "Missing id" })
          continue
        }

        const validStatuses = ["pending", "approved", "rejected", "contacted", "deleted"]
        const status = item.status && validStatuses.includes(item.status) ? item.status : null
        const notes = item.notes !== undefined ? item.notes : null

        const result = updateStmt.run(status, notes, item.id)
        results.push({
          id: item.id,
          success: result.changes > 0,
          error: result.changes === 0 ? "Not found" : undefined,
        })
      }
    })

    transaction()

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error bulk updating applications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


/**
 * POST /api/v1/applications
 * Public application submission (no API key required — same as legacy /api/applications).
 * Captures the application into the database so it appears in the dashboard,
 * the notifier, and analytics (totalApplications / conversion rate).
 */
async function handleCreateApplication(request: NextRequest) {
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
    db.prepare(`
      INSERT INTO applications (id, full_name, email, phone, company, role, employees, interest, use_case, current_tools, referral)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
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

    return NextResponse.json({ success: true, id }, { status: 201 })
  } catch (error) {
    console.error("Application submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const POST = handleCreateApplication
export const GET = withApiAuth(handleGetApplications, ["read:applications"])
export const PATCH = withApiAuth(handleBulkUpdate, ["write:applications"])