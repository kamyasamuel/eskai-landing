import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { sessionHeartbeatSchema } from "@/lib/validation"

/**
 * POST /api/v1/sessions
 * Session heartbeat — updates session duration for active page views.
 * Called periodically by the client to keep session duration accurate.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = sessionHeartbeatSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { sessionId, path, durationSeconds } = parsed.data
    const db = getDb()

    // Update the most recent page view for this session + path
    const result = db
      .prepare(
        `UPDATE page_views SET duration_seconds = ?
         WHERE session_id = ? AND path = ?
         AND id = (
           SELECT id FROM page_views
           WHERE session_id = ? AND path = ?
           ORDER BY created_at DESC
           LIMIT 1
         )`
      )
      .run(durationSeconds, sessionId, path, sessionId, path)

    return NextResponse.json({
      success: true,
      updated: result.changes > 0,
    })
  } catch (error) {
    console.error("Session heartbeat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}