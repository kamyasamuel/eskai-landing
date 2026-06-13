import { NextRequest, NextResponse } from "next/server"
import { withApiAuth } from "@/lib/middleware"
import { getDb } from "@/lib/db"
import type { ApiKeyInfo } from "@/lib/middleware"

async function handleGetAnalytics(
  request: NextRequest,
  { apiKey }: { apiKey: ApiKeyInfo }
) {
  try {
    const url = new URL(request.url)
    const startDate = url.searchParams.get("startDate") || ""
    const endDate = url.searchParams.get("endDate") || ""
    const topLimit = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 50)

    const db = getDb()

    // Build date filter
    const dateFilter =
      startDate && endDate
        ? "WHERE created_at >= ? AND created_at <= ?"
        : startDate
          ? "WHERE created_at >= ?"
          : endDate
            ? "WHERE created_at <= ?"
            : ""

    const dateParams: string[] = []
    if (startDate) dateParams.push(startDate)
    if (endDate) dateParams.push(endDate)

    // ── Overview ────────────────────────────────────────────────────────────────

    const pageViewsRow = db
      .prepare(`SELECT COUNT(*) as count FROM page_views ${dateFilter}`)
      .get(...dateParams) as { count: number }

    const uniqueSessionsRow = db
      .prepare(`SELECT COUNT(DISTINCT session_id) as count FROM page_views ${dateFilter}`)
      .get(...dateParams) as { count: number }

    const eventsRow = db
      .prepare(`SELECT COUNT(*) as count FROM events ${dateFilter}`)
      .get(...dateParams) as { count: number }

    const applicationsDateFilter =
      startDate && endDate
        ? "WHERE created_at >= ? AND created_at <= ?"
        : startDate
          ? "WHERE created_at >= ?"
          : endDate
            ? "WHERE created_at <= ?"
            : ""

    const applicationsRow = db
      .prepare(`SELECT COUNT(*) as count FROM applications ${applicationsDateFilter}`)
      .get(...dateParams) as { count: number }

    const conversionRate =
      pageViewsRow.count > 0
        ? Math.round((applicationsRow.count / pageViewsRow.count) * 10000) / 100
        : 0

    // ── Daily Views (last 30 days) ──────────────────────────────────────────────

    const dailyViewsFilter = dateFilter
      ? `${dateFilter} AND created_at >= date('now', '-30 days')`
      : "WHERE created_at >= date('now', '-30 days')"

    const dailyViews = db
      .prepare(
        `SELECT date(created_at) as date, COUNT(*) as views, COUNT(DISTINCT session_id) as uniqueSessions
         FROM page_views ${dailyViewsFilter}
         GROUP BY date(created_at)
         ORDER BY date ASC`
      )
      .all(...(dateParams.length > 0 ? dateParams : []))

    // ── Top Pages ───────────────────────────────────────────────────────────────

    const pagesFilter = dateFilter
      ? `FROM page_views ${dateFilter}`
      : "FROM page_views"

    const topPages = db
      .prepare(
        `SELECT path, COUNT(*) as views, COUNT(DISTINCT session_id) as uniqueSessions
         ${pagesFilter}
         GROUP BY path
         ORDER BY views DESC
         LIMIT ?`
      )
      .all(...dateParams, topLimit)

    // ── Top Referrers ───────────────────────────────────────────────────────────

    const referrersFilter = dateFilter
      ? `WHERE referrer != '' AND referrer IS NOT NULL ${startDate ? "AND created_at >= ?" : ""} ${endDate ? "AND created_at <= ?" : ""}`
      : "WHERE referrer != '' AND referrer IS NOT NULL"

    const referrerParams: string[] = dateFilter
      ? dateParams
      : []

    const topReferrers = db
      .prepare(
        `SELECT referrer, COUNT(*) as views
         FROM page_views ${referrersFilter}
         GROUP BY referrer
         ORDER BY views DESC
         LIMIT ?`
      )
      .all(...referrerParams, topLimit)

    // ── Geographic Distribution ─────────────────────────────────────────────────

    const geoFilter = dateFilter
      ? `WHERE country != '' AND country IS NOT NULL ${startDate ? "AND created_at >= ?" : ""} ${endDate ? "AND created_at <= ?" : ""}`
      : "WHERE country != '' AND country IS NOT NULL"

    const geoDistribution = db
      .prepare(
        `SELECT country, COUNT(*) as views
         FROM page_views ${geoFilter}
         GROUP BY country
         ORDER BY views DESC
         LIMIT ?`
      )
      .all(...referrerParams, topLimit)

    return NextResponse.json({
      overview: {
        totalPageViews: pageViewsRow.count,
        uniqueSessions: uniqueSessionsRow.count,
        totalEvents: eventsRow.count,
        totalApplications: applicationsRow.count,
        conversionRate,
      },
      dailyViews,
      topPages,
      topReferrers,
      geoDistribution,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withApiAuth(handleGetAnalytics, ["read:analytics"])