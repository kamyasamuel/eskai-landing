"use client"

// ─────────────────────────────────────────────────────────────
// Eskai landing page — client-side analytics tracking
// Fires page views, custom events, and session heartbeats to
// the /api/v1/track/* endpoints. Fire-and-forget (no await).
// ─────────────────────────────────────────────────────────────

const SESSION_KEY = "eskai_session_id"

export function getSessionId(): string {
  if (typeof window === "undefined") return ""
  try {
    let id = window.localStorage.getItem(SESSION_KEY)
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`
      window.localStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return ""
  }
}

function currentPath(): string {
  if (typeof window === "undefined") return "/"
  return window.location.pathname + window.location.search + window.location.hash
}

function post(url: string, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return
  try {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* fire-and-forget */
    })
  } catch {
    /* ignore tracking errors — never break the page */
  }
}

/** Record a page view for the current page (one per load). */
export function trackPageView() {
  post("/api/v1/track/page-view", {
    sessionId: getSessionId(),
    path: currentPath(),
    referrer: document.referrer || "",
    userAgent: navigator.userAgent,
    pageTitle: document.title,
    durationSeconds: 0,
  })
}

/** Record a custom event (cta_click, form_start, form_submit, ...). */
export function trackEvent(eventName: string, eventProperties: Record<string, unknown> = {}) {
  post("/api/v1/track/event", {
    sessionId: getSessionId(),
    eventName,
    eventProperties,
    pagePath: currentPath(),
  })
}

/** Update the active session duration (call every ~30s). */
export function trackHeartbeat(durationSeconds: number) {
  post("/api/v1/sessions", {
    sessionId: getSessionId(),
    path: currentPath(),
    durationSeconds,
  })
}
