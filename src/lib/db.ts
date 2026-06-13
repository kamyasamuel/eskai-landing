import Database from "better-sqlite3"
import path from "path"

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), "data", "eskai.db")

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma("journal_mode = WAL")
    db.pragma("foreign_keys = ON")
    initSchema(db)
  }
  return db
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      company TEXT DEFAULT '',
      role TEXT NOT NULL,
      employees TEXT DEFAULT '',
      interest TEXT DEFAULT '[]',
      use_case TEXT NOT NULL,
      current_tools TEXT DEFAULT '',
      referral TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      status TEXT NOT NULL DEFAULT 'pending'
    );

    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer TEXT DEFAULT '',
      user_agent TEXT DEFAULT '',
      ip TEXT DEFAULT '',
      country TEXT DEFAULT '',
      city TEXT DEFAULT '',
      browser TEXT DEFAULT '',
      os TEXT DEFAULT '',
      device TEXT DEFAULT '',
      duration_seconds INTEGER DEFAULT 0,
      page_title TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      event_name TEXT NOT NULL,
      event_properties TEXT DEFAULT '{}',
      page_path TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS api_keys (
      id TEXT PRIMARY KEY,
      prefix TEXT NOT NULL,
      key_hash TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      scopes TEXT NOT NULL DEFAULT '[]',
      expires_at TEXT,
      last_used_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      revoked_at TEXT,
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS api_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_key_id TEXT REFERENCES api_keys(id),
      endpoint TEXT NOT NULL,
      method TEXT NOT NULL,
      status_code INTEGER NOT NULL,
      ip TEXT DEFAULT '',
      duration_ms INTEGER DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
    CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
    CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at);
    CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
    CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
    CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
    CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
    CREATE INDEX IF NOT EXISTS idx_events_name ON events(event_name);
    CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at);
    CREATE INDEX IF NOT EXISTS idx_api_keys_prefix ON api_keys(prefix);
    CREATE INDEX IF NOT EXISTS idx_api_keys_active ON api_keys(active);
    CREATE INDEX IF NOT EXISTS idx_api_logs_created ON api_logs(created_at);
    CREATE INDEX IF NOT EXISTS idx_api_logs_key ON api_logs(api_key_id);
    CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
  `)
}

export function closeDb() {
  if (db) {
    db.close()
    db = null
  }
}