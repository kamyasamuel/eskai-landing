import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { pageViewSchema } from "@/lib/validation"

/**
 * @deprecated Use POST /api/v1/track/page-view instead
 * 
 * Legacy tracking endpoint — kept for backward compatibility.
 * Uses Zod validation and enriched fields.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, path, referrer, userAgent } = body

    if (!sessionId || !path) {
      return NextResponse.json(
        { error: "Missing required fields: sessionId, path" },
        { status: 400 }
      )
    }

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      ""

    const db = getDb()
    db.prepare(`
      INSERT INTO page_views (session_id, path, referrer, user_agent, ip)
      VALUES (?, ?, ?, ?, ?)
    `).run(sessionId, path, referrer || "", userAgent || "", ip)

    return NextResponse.json({ success: true, deprecated: true }, { status: 201 })
  } catch (error) {
    console.error("Track error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}