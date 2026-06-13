import { getDb } from "./db"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "eskai-dev-secret-change-in-production"
const BCRYPT_ROUNDS = 12
const API_KEY_PREFIX = "esk"

export interface JwtPayload {
  sub: string
  email: string
  role: string
  iat?: number
  exp?: number
}

// ─── JWT ───────────────────────────────────────────────────────────────────────

export function generateJwt(user: { id: string; email: string; role: string }): string {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  )
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}

// ─── Password Hashing ──────────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// ─── API Key Management ────────────────────────────────────────────────────────

export function generateApiKey(): { prefix: string; rawKey: string; keyHash: string } {
  const rawKey = uuidv4().replace(/-/g, "") + uuidv4().replace(/-/g, "")
  const prefix = `${API_KEY_PREFIX}_${rawKey.slice(0, 8)}`
  const keyHash = bcrypt.hashSync(rawKey, 10)
  return { prefix, rawKey, keyHash }
}

export function validateApiKey(rawKey: string): {
  valid: boolean
  key?: { id: string; name: string; scopes: string[] }
} {
  // Reconstruct the prefix from the raw key
  const prefix = `${API_KEY_PREFIX}_${rawKey.slice(0, 8)}`
  const db = getDb()

  const row = db
    .prepare(
      "SELECT id, name, scopes, key_hash, expires_at, active, revoked_at FROM api_keys WHERE prefix = ?"
    )
    .get(prefix) as
    | { id: string; name: string; scopes: string; key_hash: string; expires_at: string | null; active: number; revoked_at: string | null }
    | undefined

  if (!row) return { valid: false }
  if (!row.active || row.revoked_at) return { valid: false }
  if (row.expires_at && new Date(row.expires_at) < new Date()) return { valid: false }

  const match = bcrypt.compareSync(rawKey, row.key_hash)
  if (!match) return { valid: false }

  // Update last used timestamp
  db.prepare("UPDATE api_keys SET last_used_at = datetime('now') WHERE id = ?").run(row.id)

  return { valid: true, key: { id: row.id, name: row.name, scopes: JSON.parse(row.scopes) } }
}

export function createApiKey(
  name: string,
  scopes: string[],
  expiresAt?: string
): { prefix: string; rawKey: string; keyHash: string; id: string; name: string } {
  const { prefix, rawKey, keyHash } = generateApiKey()
  const id = uuidv4()
  const db = getDb()

  db.prepare(
    "INSERT INTO api_keys (id, prefix, key_hash, name, scopes, expires_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, prefix, keyHash, name, JSON.stringify(scopes), expiresAt || null)

  return { prefix, rawKey, keyHash, id, name }
}

export function revokeApiKey(keyId: string): boolean {
  const db = getDb()
  const result = db
    .prepare("UPDATE api_keys SET active = 0, revoked_at = datetime('now') WHERE id = ?")
    .run(keyId)
  return result.changes > 0
}

export function listApiKeys(): Array<{
  id: string
  prefix: string
  name: string
  scopes: string
  expiresAt: string | null
  lastUsedAt: string | null
  active: number
  createdAt: string
}> {
  const db = getDb()
  const rows = db
    .prepare(
      "SELECT id, prefix, name, scopes, expires_at, last_used_at, active, created_at FROM api_keys ORDER BY created_at DESC"
    )
    .all() as Array<{
    id: string
    prefix: string
    name: string
    scopes: string
    expires_at: string | null
    last_used_at: string | null
    active: number
    created_at: string
  }>

  return rows.map((r) => ({
    id: r.id,
    prefix: r.prefix,
    name: r.name,
    scopes: r.scopes,
    expiresAt: r.expires_at,
    lastUsedAt: r.last_used_at,
    active: r.active,
    createdAt: r.created_at,
  }))
}

// ─── Scope Checking ────────────────────────────────────────────────────────────

export const SCOPES = {
  READ_APPLICATIONS: "read:applications",
  WRITE_APPLICATIONS: "write:applications",
  READ_ANALYTICS: "read:analytics",
  READ_STATS: "read:stats",
  ADMIN: "admin",
  EXPORT: "export",
} as const

export function hasScope(keyScopes: string[], requiredScope: string): boolean {
  return keyScopes.includes(SCOPES.ADMIN) || keyScopes.includes(requiredScope)
}