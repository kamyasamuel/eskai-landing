import { NextRequest, NextResponse } from "next/server"
import { withApiAuth } from "@/lib/middleware"
import { getDb } from "@/lib/db"
import { applicationUpdateSchema } from "@/lib/validation"
import type { ApiKeyInfo } from "@/lib/middleware"

function getApplicationId(request: NextRequest): string | null {
  const url = new URL(request.url)
  const segments = url.pathname.split("/")
  const id = segments[segments.length - 1]
  return id || null
}

async function handleGetApplication(
  request: NextRequest,
  { apiKey }: { apiKey: ApiKeyInfo }
) {
  try {
    const id = getApplicationId(request)
    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 })
    }

    const db = getDb()
    const application = db.prepare("SELECT * FROM applications WHERE id = ?").get(id)

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json({ application })
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleUpdateApplication(
  request: NextRequest,
  { apiKey }: { apiKey: ApiKeyInfo }
) {
  try {
    const id = getApplicationId(request)
    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 })
    }

    const body = await request.json()
    const parsed = applicationUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { status, notes } = parsed.data
    const db = getDb()

    // Build dynamic update
    const updates: string[] = []
    const params: unknown[] = []

    if (status !== undefined) {
      updates.push("status = ?")
      params.push(status)
    }
    if (notes !== undefined) {
      updates.push("notes = ?")
      params.push(notes)
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    params.push(id)

    const result = db
      .prepare(`UPDATE applications SET ${updates.join(", ")} WHERE id = ?`)
      .run(...params)

    if (result.changes === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    const application = db.prepare("SELECT * FROM applications WHERE id = ?").get(id)
    return NextResponse.json({ application })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleDeleteApplication(
  request: NextRequest,
  { apiKey }: { apiKey: ApiKeyInfo }
) {
  try {
    const id = getApplicationId(request)
    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 })
    }

    const db = getDb()
    const result = db
      .prepare("UPDATE applications SET status = 'deleted' WHERE id = ? AND (status IS NULL OR status != 'deleted')")
      .run(id)

    if (result.changes === 0) {
      return NextResponse.json({ error: "Application not found or already deleted" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Application deleted" })
  } catch (error) {
    console.error("Error deleting application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withApiAuth(handleGetApplication, ["read:applications"])
export const PATCH = withApiAuth(handleUpdateApplication, ["write:applications"])
export const DELETE = withApiAuth(handleDeleteApplication, ["admin"])