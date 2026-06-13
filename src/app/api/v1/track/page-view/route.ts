import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { pageViewSchema } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = pageViewSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const {
      sessionId,
      path,
      referrer,
      userAgent,
      country,
      city,
      browser,
      os,
      device,
      durationSeconds,
      pageTitle,
    } = parsed.data

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      ""

    const db = getDb()
    db.prepare(`
      INSERT INTO page_views (session_id, path, referrer, user_agent, ip, country, city, browser, os, device, duration_seconds, page_title)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      sessionId,
      path,
      referrer,
      userAgent,
      ip,
      country,
      city,
      browser,
      os,
      device,
      durationSeconds,
      pageTitle
    )

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Track page view error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}