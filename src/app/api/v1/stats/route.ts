import { NextRequest, NextResponse } from "next/server"
import { withApiAuth } from "@/lib/middleware"
import { getDb } from "@/lib/db"
import type { ApiKeyInfo } from "@/lib/middleware"
import fs from "fs"

async function handleGetStats(
  request: NextRequest,
  { apiKey }: { apiKey: ApiKeyInfo }
) {
  try {
    const db = getDb()

    // ── Database Row Counts ─────────────────────────────────────────────────────
    const count = (table: string) =>
      (db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number }).count

    const dbStats = {
      applications: count("applications"),
      pageViews: count("page_views"),
      events: count("events"),
      apiKeys: count("api_keys"),
      apiLogs: count("api_logs"),
    }

    // ── API Usage ───────────────────────────────────────────────────────────────
    const totalRequests = count("api_logs")

    const todayRequests = (
      db
        .prepare("SELECT COUNT(*) as count FROM api_logs WHERE date(created_at) = date('now')")
        .get() as { count: number }
    ).count

    const thisWeekRequests = (
      db
        .prepare(
          "SELECT COUNT(*) as count FROM api_logs WHERE created_at >= date('now', '-7 days')"
        )
        .get() as { count: number }
    ).count

    const thisMonthRequests = (
      db
        .prepare(
          "SELECT COUNT(*) as count FROM api_logs WHERE created_at >= date('now', '-30 days')"
        )
        .get() as { count: number }
    ).count

    // ── Application Status Breakdown ────────────────────────────────────────────
    const statusBreakdown = (
      db
        .prepare(
          "SELECT status, COUNT(*) as count FROM applications GROUP BY status"
        )
        .all() as { status: string; count: number }[]
    ).reduce(
      (acc, row) => {
        acc[row.status || "unknown"] = row.count
        return acc
      },
      {} as Record<string, number>
    )

    // ── Database File Size ──────────────────────────────────────────────────────
    let dbFileSize = "Unknown"
    try {
      const dbPath = process.env.DB_PATH || "data/eskai.db"
      const stat = fs.statSync(dbPath)
      const bytes = stat.size
      if (bytes < 1024) {
        dbFileSize = `${bytes} B`
      } else if (bytes < 1024 * 1024) {
        dbFileSize = `${(bytes / 1024).toFixed(1)} KB`
      } else {
        dbFileSize = `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      }
    } catch {
      // File might not exist yet
    }

    return NextResponse.json({
      database: dbStats,
      apiUsage: {
        totalRequests,
        requestsToday: todayRequests,
        requestsThisWeek: thisWeekRequests,
        requestsThisMonth: thisMonthRequests,
      },
      applications: {
        pending: statusBreakdown["pending"] || 0,
        approved: statusBreakdown["approved"] || 0,
        rejected: statusBreakdown["rejected"] || 0,
        contacted: statusBreakdown["contacted"] || 0,
        deleted: statusBreakdown["deleted"] || 0,
        unknown: statusBreakdown["unknown"] || 0,
      },
      storage: {
        dbFileSize,
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withApiAuth(handleGetStats, ["read:stats"])