# AI Operations Manual — Eskai

This document gives an AI agent everything it needs to manage the Eskai landing site, its API, customer data, analytics, and business operations.

---

## 1. 🏢 Business Overview

**Eskai** is an AI assistant that ships pre-installed on a device we configure for the customer — it arrives ready to use. It runs a person's or business's recurring work (documents, invoices, follow-ups, records, monitoring, research, reports) and reports back in plain language over Telegram or WhatsApp. Everything it learns stays on the customer's own device; there are no cloud dependencies.

### Brand Identity

- **Tagline**: "Your own AI assistant — one that actually does the work"
- **Promise**: Delivered ready to use · Buy once, no subscription · Your information never leaves your device · The only running cost is the AI tokens it uses (bring your own API key or buy prepaid credits)
- **Target Audience**: Everyday business owners first — shop owners, farmers, clinics, schools, logistics, freelancers — plus founders, SMBs and tech leads in Africa and globally who want affordable, private, persistent AI
- **Pricing**: Personal $199 one-time · Business $599 one-time · Custom from $2,500. Optional Care Plan ($9/$29 per month) covers updates, encrypted backup of memory and remote support
- **Unique Differentiators**: Comes configured and delivered, self-awareness engine, sensory cortex, dream cycle engine, self-repair system, plain-language chat interface
- **Copy rule**: customer-facing copy is written in plain language for non-technical readers. Avoid "self-hosted", "ARM", "API", "agent" and similar jargon near the top of the page; engine names (Self-Awareness, Sensory Cortex, Dream Cycle, Self-Repair) are internal names and must be translated into benefits on the marketing site.

### Key Business Metrics to Track

| Metric             | Source                                                   | Why                             |
| ------------------ | -------------------------------------------------------- | ------------------------------- |
| Total applications | `GET /api/v1/applications`                             | Pipeline volume                 |
| Conversion rate    | `GET /api/v1/analytics` → `overview.conversionRate` | Page view → application funnel |
| Pending applicants | `GET /api/v1/stats` → `applications.pending`        | Workload for team review        |
| Daily page views   | `GET /api/v1/analytics` → `dailyViews`              | Traffic trends                  |
| Top referrers      | `GET /api/v1/analytics` → `topReferrers`            | Marketing channel effectiveness |
| Geo distribution   | `GET /api/v1/analytics` → `geoDistribution`         | Regional adoption               |

---

## 2. 🔑 Access & Authentication

### 2.1 Initial Setup (First Time)

```bash
# Seed the database with an admin user + API key
curl -X POST https://eskai.eskaen.com/api/seed \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eskai.com","password":"your-secure-password","name":"admin"}'

# Response includes a raw API key — SAVE IT (shown only once)
```

### 2.2 Getting JWT Token (For Admin Dashboard)

```bash
curl -X POST https://eskai.eskaen.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eskai.com","password":"your-secure-password"}'
# Response: { token: "eyJ...", user: { id, email, name, role } }
```

### 2.3 Managing API Keys (JWT Required)

```bash
# List existing keys
curl https://eskai.eskaen.com/api/auth/keys \
  -H "Authorization: Bearer <jwt_token>"

# Create a new key with specific scopes
curl -X POST https://eskai.eskaen.com/api/auth/keys \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Marketing Analytics","scopes":["read:analytics","export"]}'
# Response includes rawKey — SAVE IT

# Revoke a key (safe rotation / compromise response)
curl -X DELETE https://eskai.eskaen.com/api/auth/keys/<key_id> \
  -H "Authorization: Bearer <jwt_token>"
```

### 2.4 Available API Key Scopes

| Scope                  | Permits                                |
| ---------------------- | -------------------------------------- |
| `read:applications`  | View customer applications             |
| `write:applications` | Update application status/notes        |
| `read:analytics`     | Access analytics dashboard             |
| `read:stats`         | Access system statistics               |
| `export`             | Export data as CSV/JSON                |
| `admin`              | All of the above + delete applications |

---

## 3. 📋 Customer Applications

### 3.1 Viewing All Applications (Paginated)

```bash
curl https://eskai.eskaen.com/api/v1/applications \
  -H "Authorization: Bearer esk_<key>"

# With filters
curl "https://eskai.eskaen.com/api/v1/applications?page=1&limit=20&sort=created_at&order=desc&status=pending&search=kamya&startDate=2025-01-01&endDate=2025-12-31" \
  -H "Authorization: Bearer esk_<key>"
```

**Filterable Fields**: `page`, `limit` (max 100), `sort` (created_at, full_name, email, company, role, status), `order` (asc, desc), `search` (full_name, email, company, use_case), `status`, `startDate`, `endDate`

**Response includes** pagination metadata: `{ page, limit, total, totalPages }`

### 3.2 Viewing a Single Application

```bash
curl https://eskai.eskaen.com/api/v1/applications/<id> \
  -H "Authorization: Bearer esk_<key>"
```

### 3.3 Updating Application Status / Adding Notes

```bash
# Single update
curl -X PATCH https://eskai.eskaen.com/api/v1/applications/<id> \
  -H "Authorization: Bearer esk_<key>" \
  -H "Content-Type: application/json" \
  -d '{"status":"approved","notes":"Great fit for early access. Follow up via email."}'

# Bulk update (process multiple at once)
curl -X PATCH https://eskai.eskaen.com/api/v1/applications \
  -H "Authorization: Bearer esk_<key>" \
  -H "Content-Type: application/json" \
  -d '[{"id":"uuid-1","status":"approved"},{"id":"uuid-2","status":"rejected","notes":"Not the right fit"}]'
```

**Valid statuses**: `pending`, `approved`, `rejected`, `contacted`, `deleted`

### 3.4 Deleting an Application

```bash
curl -X DELETE https://eskai.eskaen.com/api/v1/applications/<id> \
  -H "Authorization: Bearer esk_<key>"
```

Requires `admin` scope. Soft-deletes by setting status to `deleted`.

---

## 4. 📊 Analytics & Business Intelligence

### 4.1 Analytics Dashboard

```bash
curl "https://eskai.eskaen.com/api/v1/analytics?startDate=2025-01-01&endDate=2025-12-31&limit=10" \
  -H "Authorization: Bearer esk_<key>"
```

**Returns**:

```json
{
  "overview": {
    "totalPageViews": 15234,
    "uniqueSessions": 8921,
    "totalEvents": 3456,
    "totalApplications": 234,
    "conversionRate": 1.54
  },
  "dailyViews": [
    { "date": "2025-06-01", "views": 523, "uniqueSessions": 345 },
    ...
  ],
  "topPages": [
    { "path": "/", "views": 5000, "uniqueSessions": 3000 },
    { "path": "#apply", "views": 2000, "uniqueSessions": 1500 },
    ...
  ],
  "topReferrers": [
    { "referrer": "twitter.com", "views": 1200 },
    ...
  ],
  "geoDistribution": [
    { "country": "Uganda", "views": 4500 },
    ...
  ]
}
```

### 4.2 System Statistics

```bash
curl https://eskai.eskaen.com/api/v1/stats \
  -H "Authorization: Bearer esk_<key>"
```

**Returns**:

```json
{
  "database": { "applications": 234, "pageViews": 15234, "events": 3456, "apiKeys": 3, "apiLogs": 891 },
  "apiUsage": { "totalRequests": 891, "requestsToday": 45, "requestsThisWeek": 312, "requestsThisMonth": 891 },
  "applications": { "pending": 180, "approved": 34, "rejected": 12, "contacted": 8, "deleted": 0 },
  "storage": { "dbFileSize": "2.3 MB" }
}
```

### 4.3 Interpreting the Numbers

- **Conversion Rate**: (Applications / Page Views) × 100. A healthy rate for early-access SaaS is 1-5%.
- **Pending backlog**: If `applications.pending` grows faster than `applications.approved`, the team needs to process faster.
- **Top Pages**: If `#apply` is a top page, the form is well-placed. If it's low, consider better CTAs.
- **Geo Distribution**: Shows where marketing efforts are landing. Good for targeting campaigns.
- **API Usage**: Low `apiLogs` suggests the API isn't being consumed — either there's no dashboard or keys aren't distributed.

---

## 5. 📥 Data Export

```bash
# Export applications as CSV (for Google Sheets / Excel)
curl "https://eskai.eskaen.com/api/v1/export?type=applications&format=csv" \
  -H "Authorization: Bearer esk_<key>" \
  -o eskai-applications.csv

# Export analytics as JSON
curl "https://eskai.eskaen.com/api/v1/export?type=analytics&format=json" \
  -H "Authorization: Bearer esk_<key>"
```

**Available exports**: `type=applications` (all customer data), `type=analytics` (all page views)
**Available formats**: `format=json` (structured), `format=csv` (spreadsheet-ready)

---

## 6. 📡 Client-Side Tracking

These endpoints are public (no API key) and meant to be called from the browser.

### 6.1 Tracking a Page View

```js
fetch('/api/v1/track/page-view', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId: 'abc-123',          // UUID generated client-side
    path: '/',                      // Current page path
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    country: '',                    // Optional — can be inferred server-side
    city: '',
    browser: navigator.userAgent,   // Optional — parsing can be done server-side
    os: '',
    device: '',
    durationSeconds: 0,
    pageTitle: document.title
  })
})
```

### 6.2 Tracking Custom Events

```js
fetch('/api/v1/track/event', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId: 'abc-123',
    eventName: 'button_click',      // e.g. 'cta_click', 'form_start', 'form_submit'
    eventProperties: { buttonId: 'get-early-access', page: '/hero' },
    pagePath: '/'
  })
})
```

### 6.3 Session Heartbeat (For Accurate Duration)

```js
// Call every 30 seconds while user is on a page
setInterval(() => {
  fetch('/api/v1/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: 'abc-123',
      path: '/',
      durationSeconds: Math.floor((Date.now() - sessionStart) / 1000)
    })
  })
}, 30000)
```

### 6.4 Legacy Endpoints (Still Work, Deprecated)

- `POST /api/track` — Simple page view tracking (no enriched fields)
- `POST /api/applications` — Application form submission
- `GET /api/applications` — Unauthenticated list (limited to 100)

> ⚠️ New code should target `/api/v1/*` endpoints instead.

---

## 7. 🗄️ Database Schema

The site uses SQLite via `better-sqlite3`. The file is at `data/eskai.db` by default.

### 7.1 Applications

```sql
CREATE TABLE applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  company TEXT DEFAULT '',
  role TEXT NOT NULL,
  employees TEXT DEFAULT '',
  interest TEXT DEFAULT '[]',          -- JSON array of selected interest tags
  use_case TEXT NOT NULL,
  current_tools TEXT DEFAULT '',
  referral TEXT DEFAULT '',
  notes TEXT DEFAULT '',               -- Internal team notes
  created_at TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'pending'        -- pending | approved | rejected | contacted | deleted
);
```

### 7.2 Page Views

```sql
CREATE TABLE page_views (
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
  created_at TEXT DEFAULT (datetime('now'))
);
```

### 7.3 Events

```sql
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_properties TEXT DEFAULT '{}',    -- JSON object
  page_path TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);
```

### 7.4 API Keys

```sql
CREATE TABLE api_keys (
  id TEXT PRIMARY KEY,
  prefix TEXT NOT NULL,                -- "esk_a1b2c3d4" for identification
  key_hash TEXT NOT NULL UNIQUE,       -- bcrypt hash (full key never stored)
  name TEXT NOT NULL,                  -- Human label
  scopes TEXT DEFAULT '[]',            -- JSON array: ["read:applications", ...]
  expires_at TEXT,                     -- Optional expiration datetime
  last_used_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  revoked_at TEXT,                     -- Set on revocation
  active INTEGER DEFAULT 1
);
```

### 7.5 API Access Logs

```sql
CREATE TABLE api_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key_id TEXT REFERENCES api_keys(id),
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  ip TEXT DEFAULT '',
  duration_ms INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
```

### 7.6 Admin Users

```sql
CREATE TABLE admin_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,         -- bcrypt
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TEXT DEFAULT (datetime('now'))
);
```

---

## 8. 🏗️ Site Structure

```
eskai-landing/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Main landing page (sections in order)
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Global styles + Tailwind
│   │   └── api/
│   │       ├── applications/route.ts   # Legacy (deprecated)
│   │       ├── track/route.ts          # Legacy (deprecated)
│   │       ├── auth/
│   │       │   ├── login/route.ts      # JWT login + admin seed
│   │       │   └── keys/
│   │       │       ├── route.ts        # List + create API keys
│   │       │       └── [id]/route.ts   # Revoke API key
│   │       ├── seed/route.ts           # One-time bootstrap
│   │       └── v1/
│   │           ├── applications/
│   │           │   ├── route.ts        # GET (paginated) + PATCH (bulk)
│   │           │   └── [id]/route.ts   # GET + PATCH + DELETE
│   │           ├── analytics/route.ts  # Dashboard data
│   │           ├── stats/route.ts      # System stats
│   │           ├── track/
│   │           │   ├── page-view/route.ts  # Enhanced page view tracking
│   │           │   └── event/route.ts      # Custom event tracking
│   │           ├── sessions/route.ts   # Session heartbeat
│   │           └── export/route.ts     # CSV/JSON data export
│   ├── components/
│   │   ├── Navbar.tsx                  # Site navigation (sticky, glass effect)
│   │   ├── Hero.tsx                    # Hero with chat visual + terminal strip + scroll cue (viewport-pinned, fades on scroll)
│   │   ├── AlreadyUsing.tsx            # Documented proof cards + early-batch slot + industries
│   │   ├── ProblemSolution.tsx         # Problem → Solution section
│   │   ├── Features.tsx                # Feature grids (12 features in 2 groups)
│   │   ├── HowYouGetIt.tsx             # Delivery & setup steps
│   │   ├── CaseStudy.tsx               # Real-world case study (BioThrive)
│   │   ├── Pricing.tsx                 # Hardware pricing tiers + cost explainer
│   │   ├── ApplicationForm.tsx         # 3-step reservation form with plan/location/payment
│   │   └── Footer.tsx                  # Site footer
│   └── lib/
│       ├── db.ts                       # SQLite connection + schema init
│       ├── auth.ts                     # JWT, bcrypt, API key CRUD, scope checking
│       ├── validation.ts              # Zod schemas for all inputs
│       └── middleware.ts              # withApiAuth, withJwtAuth, withRateLimit, withRequestLog
├── docs/
│   └── pricing-cost-model.md          # Price assumptions, unit economics, edit points
├── Dockerfile                         # Docker deployment (Node.js)
├── docker-compose.yml                 # Multi-service orchestration
├── nginx.conf                         # Nginx reverse proxy config
├── .env                                # Environment variables
└── package.json                       # Dependencies + scripts
```

### Landing Page Section Order

1. **Navbar** — Logo, navigation links, "Reserve Yours" CTA
2. **Hero** — Value proposition, chat-style product visual, terminal strip for technical readers
3. **AlreadyUsing** — Documented proof, not adoption counts: BioThrive results (20 posts + 16 scripts in <24h), $0 cloud bills, direct founder line, a "your story here" early-batch card, and industries served. Rule: every number shown is verifiable — see the guardrail comment in the component
4. **ProblemSolution** — Everyday pain points → Eskai answers
5. **Features** — Two groups: "What Eskai Does For You" (6) and "What It Can Do" (6)
6. **HowYouGetIt** — Order → we configure → arrives ready → you message it
7. **CaseStudy** — Real story (BioThrive launch plan)
8. **Pricing** — Personal $199 / Business $599 / Custom from $2,500, plus Care Plan and token costs
9. **ApplicationForm** — 3-step reservation form (plan interest, location, payment preference)
10. **Footer** — Links, copyright

---

## 9. ⚙️ Environment Variables

```env
# Database
DB_PATH=data/eskai.db

# Security
JWT_SECRET=your-256-bit-secret-change-in-production

# Server (if needed)
PORT=80
```

### Setup

```bash
cp .env.example .env   # Create .env from template
# Then edit .env with your values
```

---

## 10. 🚀 Deploying

### 10.1 Docker (Production)

```bash
docker-compose up -d
# Listens on port 80 with Nginx reverse proxy
```

### 10.2 Manual (Development)

```bash
npm run dev       # Development server on :3000
npm run build     # Production build
npm start         # Production server on :3000
```

### 10.3 Dockerfile

Uses Node.js 20 LTS in a multi-stage build. Built app served via `next start` on port 3000.

### 10.4 nginx.conf

Nginx reverse proxy forwarding `/` → `localhost:3000` with:

- Static asset caching (1 year)
- Gzip compression
- Security headers (X-Content-Type-Options, X-Frame-Options)
- Rate limiting zones configured

---

## 11. 🔐 Security Best Practices

| Practice         | Implementation                                                                   |
| ---------------- | -------------------------------------------------------------------------------- |
| API keys         | bcrypt-hashed; only prefix stored in plaintext                                   |
| Key rotation     | Create new key → deploy apps → revoke old key via`DELETE /api/auth/keys/:id` |
| Scoped access    | Each key limited to required scopes; never grant`admin` unless necessary       |
| Rate limiting    | 100 req/min per IP by default; configurable in`withRateLimit()`                |
| Audit trail      | Every API request logged to`api_logs` with key ID, endpoint, IP, duration      |
| SQL injection    | All queries use parameterized statements; sort column whitelisted                |
| Input validation | Zod schemas validate every request body                                          |
| JWT expiration   | Tokens expire after 24 hours                                                     |
| Password storage | bcrypt with 12 salt rounds                                                       |
| Data persistence | SQLite with WAL mode for concurrent reads                                        |
| CORS             | Configured per environment (default: same-origin)                                |

---

## 12. 🛠️ Common Operations

### 12.1 "How many new applications came in this week?"

```bash
curl "https://eskai.eskaen.com/api/v1/applications?status=pending&sort=created_at&order=desc&startDate=$(date -d '7 days ago' +%Y-%m-%d)" \
  -H "Authorization: Bearer esk_<key>"
```

### 12.2 "Show me traffic sources"

```bash
curl "https://eskai.eskaen.com/api/v1/analytics?limit=20" \
  -H "Authorization: Bearer esk_<key>"
# → Check `topReferrers` array
```

### 12.3 "Export all applicants for CRM import"

```bash
curl "https://eskai.eskaen.com/api/v1/export?type=applications&format=csv" \
  -H "Authorization: Bearer esk_<key>" \
  -o applicants-$(date +%F).csv
```

### 12.4 "Has anyone from Kenya applied?"

```bash
# Search via applications endpoint
curl "https://eskai.eskaen.com/api/v1/applications?search=kenya" \
  -H "Authorization: Bearer esk_<key>"
# Or check geo analytics
curl "https://eskai.eskaen.com/api/v1/analytics" \
  -H "Authorization: Bearer esk_<key>"
```

### 12.5 "Rotate an API key that might be compromised"

```bash
# 1. Create new key
curl -X POST https://eskai.eskaen.com/api/auth/keys \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Production Key","scopes":["read:applications","read:analytics"]}'
# 2. Note the rawKey from response
# 3. Deploy new key to apps
# 4. Revoke old key
curl -X DELETE https://eskai.eskaen.com/api/auth/keys/<old_key_id> \
  -H "Authorization: Bearer <jwt>"
```

### 12.6 "Approve multiple applicants at once"

```bash
# Fetch pending list first, then bulk approve
curl -X PATCH https://eskai.eskaen.com/api/v1/applications \
  -H "Authorization: Bearer esk_<key>" \
  -H "Content-Type: application/json" \
  -d '[
    {"id":"uuid-1","status":"approved","notes":"Approved for early access. Sent onboarding."},
    {"id":"uuid-2","status":"approved"},
    {"id":"uuid-3","status":"contacted","notes":"Sent follow-up email for more details."}
  ]'
```

### 12.7 "Check overall system health"

```bash
curl https://eskai.eskaen.com/api/v1/stats \
  -H "Authorization: Bearer esk_<key>"
# → Check: pending backlog, DB size, API usage trends
```

### 12.8 "How is the site performing today?"

```bash
curl "https://eskai.eskaen.com/api/v1/analytics?startDate=$(date +%Y-%m-%d)" \
  -H "Authorization: Bearer esk_<key>"
# → Check dailyViews for today, totalPageViews
```

---

## 13. 🧪 Testing the API

```bash
# Quick health check (no auth needed — just hit any endpoint without key)
curl -s -o /dev/null -w "%{http_code}" https://eskai.eskaen.com/api/v1/applications
# → Should return 401 (Missing auth)

# Valid request
curl -s https://eskai.eskaen.com/api/v1/applications \
  -H "Authorization: Bearer esk_<key>" | jq '.pagination'

# Rate limit test (first 100 succeed, then 429)
for i in $(seq 1 101); do
  curl -s -o /dev/null -w "%{http_code} " \
    https://eskai.eskaen.com/api/v1/applications \
    -H "Authorization: Bearer esk_<key>"
done
# → Expect 429 on the 101st request
```

---

## 14. 📝 Site Content Guidelines

### Tone

- **Professional but warm** — Eskai is powerful tech but approachable
- **Clear value propositions** — Focus on what Eskai DOES, not just what it IS
- **African perspective** — Target audience includes African founders; highlight affordability and self-hosting (power/network resilience)

### Key Selling Points to Emphasize

1. **Ready to use** — It arrives configured on a device we set up for you; plug in, connect to Wi-Fi, done
2. **Buy once** — One payment for the device and the setup. No subscription, nothing to cancel, no lock-in
3. **Your information stays with you** — Records, documents and conversations live on your device, in your office
4. **It works while you sleep** — Monitors, learns, chases follow-ups and reports back 24/7
5. **Plain language** — You type a message ("send the invoice reminder"); it does the work and reports back
6. **Honest running costs** — Only AI tokens: bring your own API key at zero markup, or buy prepaid credits

### Target Customer Personas

- **Shop or kiosk owner** — evenings lost to invoices, stock counts and supplier follow-ups
- **Farmer / agri co-op** — records, buyer outreach and reports kept on paper or in WhatsApp
- **Clinic, school or salon** — reminders, letters, summaries and recurring paperwork
- **Freelancer or consultant** — proposals, invoices, research and client updates
- **Small business owner** managing operations with spreadsheets and email — needs help without complexity
- **African founder** building a startup with limited capital — needs AI but can't afford $200+/month SaaS stacks
- **Tech lead / maker** who values privacy and wants AI on their own hardware

---

## 15. ❗ Troubleshooting

| Problem                         | Likely Cause                      | Fix                                                 |
| ------------------------------- | --------------------------------- | --------------------------------------------------- |
| `401 Unauthorized`            | Missing/invalid API key           | Check`Authorization: Bearer esk_...` header       |
| `403 Forbidden`               | Key lacks required scope          | Create new key with correct scopes                  |
| `429 Too Many Requests`       | Rate limit hit                    | Wait 60 seconds or increase config                  |
| `409 Conflict` (applications) | Duplicate email                   | Check existing application; update status instead   |
| Build fails TypeScript          | Schema mismatch                   | Run`npm run build` locally to see full errors     |
| DB file missing                 | First run                         | Call any API endpoint — schema auto-creates tables |
| API key not found               | Key was revoked or expired        | Check`GET /api/auth/keys` with JWT                |
| CORS errors in browser          | Client-side fetch to wrong origin | Ensure API calls go to same origin                  |

---

## 16. 📦 Dependencies

| Package                  | Purpose                   |
| ------------------------ | ------------------------- |
| `next`                 | React framework (SSR/SSG) |
| `react`, `react-dom` | UI library                |
| `better-sqlite3`       | SQLite database           |
| `bcryptjs`             | Password/API key hashing  |
| `jsonwebtoken`         | JWT auth tokens           |
| `uuid`                 | ID generation             |
| `zod`                  | Input validation          |
| `lucide-react`         | Icon library              |
| `react-hook-form`      | Form handling (client)    |
| `tailwindcss`          | CSS utility framework     |
