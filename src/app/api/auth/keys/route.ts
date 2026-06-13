import { NextRequest, NextResponse } from "next/server"
import { withJwtAuth } from "@/lib/middleware"
import { createApiKey, listApiKeys } from "@/lib/auth"
import { createApiKeySchema } from "@/lib/validation"
import type { UserInfo } from "@/lib/middleware"

async function handleGetKeys(request: NextRequest, { user }: { user: UserInfo }) {
  const keys = listApiKeys()
  return NextResponse.json({ keys })
}

async function handleCreateKey(request: NextRequest, { user }: { user: UserInfo }) {
  try {
    const body = await request.json()
    const parsed = createApiKeySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, scopes, expiresAt } = parsed.data
    const key = createApiKey(name, scopes, expiresAt)

    return NextResponse.json(
      {
        id: key.id,
        prefix: key.prefix,
        rawKey: key.rawKey,
        name: key.name,
        scopes,
        message: "Save this raw key — it will not be shown again",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create API key error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withJwtAuth(handleGetKeys)
export const POST = withJwtAuth(handleCreateKey)