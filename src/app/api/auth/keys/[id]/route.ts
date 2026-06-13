import { NextRequest, NextResponse } from "next/server"
import { withJwtAuth } from "@/lib/middleware"
import { revokeApiKey } from "@/lib/auth"
import type { UserInfo } from "@/lib/middleware"

async function handleRevokeKey(
  request: NextRequest,
  { user }: { user: UserInfo }
) {
  // Extract ID from URL path
  const url = new URL(request.url)
  const segments = url.pathname.split("/")
  const keyId = segments[segments.length - 1]

  if (!keyId) {
    return NextResponse.json({ error: "Key ID is required" }, { status: 400 })
  }

  const revoked = revokeApiKey(keyId)

  if (!revoked) {
    return NextResponse.json({ error: "API key not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: "API key revoked" })
}

export const DELETE = withJwtAuth(handleRevokeKey)