import { NextRequest, NextResponse } from "next/server"
import { withApiAuth } from "@/lib/middleware"
import { getDb } from "@/lib/db"
import { paginationSchema } from "@/lib/validation"
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

export const GET = withApiAuth(handleGetApplications, ["read:applications"])
export const PATCH = withApiAuth(handleBulkUpdate, ["write:applications"])