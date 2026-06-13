import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { eventSchema } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = eventSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { sessionId, eventName, eventProperties, pagePath } = parsed.data

    const db = getDb()
    db.prepare(`
      INSERT INTO events (session_id, event_name, event_properties, page_path)
      VALUES (?, ?, ?, ?)
    `).run(sessionId, eventName, JSON.stringify(eventProperties), pagePath)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Track event error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}