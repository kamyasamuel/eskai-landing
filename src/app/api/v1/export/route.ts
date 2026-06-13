import { NextRequest, NextResponse } from "next/server"
import { withApiAuth } from "@/lib/middleware"
import { getDb } from "@/lib/db"
import type { ApiKeyInfo } from "@/lib/middleware"

async function handleExport(
  request: NextRequest,
  { apiKey }: { apiKey: ApiKeyInfo }
) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get("type") || "applications"
    const format = url.searchParams.get("format") || "json"

    if (!["applications", "analytics"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Use 'applications' or 'analytics'" },
        { status: 400 }
      )
    }

    if (!["json", "csv"].includes(format)) {
      return NextResponse.json(
        { error: "Invalid format. Use 'json' or 'csv'" },
        { status: 400 }
      )
    }

    const db = getDb()

    if (type === "applications") {
      const applications = db.prepare("SELECT * FROM applications ORDER BY created_at DESC").all()

      if (format === "csv") {
        const headers = [
          "id", "full_name", "email", "phone", "company", "role",
          "employees", "interest", "use_case", "current_tools",
          "referral", "notes", "status", "created_at",
        ]

        const rows = (applications as Record<string, unknown>[]).map((app) =>
          headers.map((h) => {
            const val = app[h] ?? ""
            const str = String(val)
            // Escape CSV fields with quotes if they contain commas, quotes, or newlines
            if (str.includes(",") || str.includes('"') || str.includes("\n")) {
              return `"${str.replace(/"/g, '""')}"`
            }
            return str
          }).join(",")
        )

        const csv = [headers.join(","), ...rows].join("\n")

        return new NextResponse(csv, {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="eskai-applications-${new Date().toISOString().split("T")[0]}.csv"`,
          },
        })
      }

      return NextResponse.json({ applications })
    }

    // Analytics export
    const pageViews = db.prepare("SELECT * FROM page_views ORDER BY created_at DESC").all()

    if (format === "csv") {
      const headers = [
        "id", "session_id", "path", "referrer", "user_agent", "ip",
        "country", "city", "browser", "os", "device",
        "duration_seconds", "page_title", "created_at",
      ]

      const rows = (pageViews as Record<string, unknown>[]).map((view) =>
        headers.map((h) => {
          const val = view[h] ?? ""
          const str = String(val)
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`
          }
          return str
        }).join(",")
      )

      const csv = [headers.join(","), ...rows].join("\n")

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="eskai-analytics-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      })
    }

    return NextResponse.json({ pageViews })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withApiAuth(handleExport, ["export"])