import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { readJsonBody, withRateLimit } from '@/lib/middleware'
import { pageViewSchema } from '@/lib/validation'

type ClientInfo = { browser: string; os: string; device: string }

/**
 * Derive browser / OS / device from the User-Agent string.
 *
 * These fields used to be read straight from the client payload, which never
 * sent them - so all 102 historical page_views rows have blank device data.
 */
export function parseUserAgent(ua: string): ClientInfo {
  const lower = (ua || '').toLowerCase()

  let device = 'desktop'
  if (/ipad|tablet|playbook|silk|android(?!.*mobile)/.test(lower)) device = 'tablet'
  if (/mobile|iphone|ipod|windows phone|blackberry|android.*mobile/.test(lower)) device = 'mobile'

  let os = 'Unknown'
  if (/windows nt 10/.test(lower)) os = 'Windows 10/11'
  else if (/windows/.test(lower)) os = 'Windows'
  else if (/iphone|ipad|ipod/.test(lower)) os = 'iOS'
  else if (/android/.test(lower)) os = 'Android'
  else if (/mac os x|macintosh/.test(lower)) os = 'macOS'
  else if (/cros/.test(lower)) os = 'ChromeOS'
  else if (/linux/.test(lower)) os = 'Linux'

  let browser = 'Unknown'
  if (/bot|crawl|spider|slurp/.test(lower)) browser = 'Bot'
  else if (/edg\//.test(lower)) browser = 'Edge'
  else if (/opr\/|opera/.test(lower)) browser = 'Opera'
  else if (/samsungbrowser/.test(lower)) browser = 'Samsung Internet'
  else if (/firefox|fxios/.test(lower)) browser = 'Firefox'
  else if (/chrome|crios|crmo/.test(lower)) browser = 'Chrome'
  else if (/safari/.test(lower)) browser = 'Safari'

  return { browser, os, device }
}

async function handlePageView(request: NextRequest) {
  try {
    const bodyResult = await readJsonBody<unknown>(request)
    if ('error' in bodyResult) return bodyResult.error

    const parsed = pageViewSchema.safeParse(bodyResult.data)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { sessionId, path, referrer, pageTitle, durationSeconds } = parsed.data

    // Server-derived signal only. Anything the browser could set is treated as
    // untrusted: the User-Agent header beats the payload, and geo comes from
    // the edge (Cloudflare / Vercel) rather than the client.
    const headerUa = request.headers.get('user-agent') || ''
    const ua = headerUa || parsed.data.userAgent || ''
    const { browser, os, device } = parseUserAgent(ua)

    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      ''

    const country =
      request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country') || ''
    const city =
      request.headers.get('cf-ipcity') ||
      request.headers.get('x-vercel-ip-city') ||
      parsed.data.city ||
      ''

    const db = getDb()
    db.prepare(`
      INSERT INTO page_views (session_id, path, referrer, user_agent, ip, country, city, browser, os, device, duration_seconds, page_title)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      sessionId,
      path,
      referrer,
      ua,
      ip,
      country,
      city,
      browser,
      os,
      device,
      Math.min(durationSeconds, 43200),
      pageTitle
    )

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Track page view error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const POST = withRateLimit(handlePageView, {
  maxRequests: 60,
  windowMs: 60000,
  bucket: 'track-pageview',
})
