"use client"

import { useEffect, useRef } from "react"
import { trackPageView, trackEvent, trackHeartbeat } from "@/lib/track"

/**
 * Global analytics provider — mounted once in the root layout.
 * - Fires a page-view on load
 * - Tracks scroll depth (25/50/75/100%)
 * - Tracks CTA clicks via event delegation (any "#apply" anchor or [data-track-cta])
 * - Sends a session heartbeat every 30 seconds for accurate duration
 */
export default function TrackingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const startRef = useRef<number>(0)

  useEffect(() => {
    startRef.current = Date.now()

    // 1. Initial page view
    trackPageView()

    // 2. Scroll depth
    const scrollTracked = new Set<number>()
    const onScroll = () => {
      try {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        if (max <= 0) return
        const pct = Math.round((window.scrollY / max) * 100)
        for (const threshold of [25, 50, 75, 100]) {
          if (pct >= threshold && !scrollTracked.has(threshold)) {
            scrollTracked.add(threshold)
            trackEvent("scroll_depth", { percent: threshold })
          }
        }
      } catch {
        /* ignore */
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // 3. CTA clicks — event delegation, catches all current + future CTAs
    const onClick = (e: MouseEvent) => {
      try {
        const el = e.target as HTMLElement | null
        const cta = el?.closest?.(
          'a[href="#apply"], a[href*="#apply"], button[data-track-cta], a[data-track-cta]'
        ) as HTMLElement | null
        if (!cta) return
        trackEvent("cta_click", {
          source: (cta as HTMLElement).dataset?.trackSource || "apply-anchor",
          href: cta.getAttribute?.("href") || "",
          text: cta.textContent?.trim().slice(0, 60) || "",
        })
      } catch {
        /* ignore */
      }
    }
    document.addEventListener("click", onClick)

    // 4. Session heartbeat every 30s
    const heartbeat = setInterval(() => {
      trackHeartbeat(Math.floor((Date.now() - startRef.current) / 1000))
    }, 30000)

    // 5. Visibility change — fire final heartbeat when tab hides
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        trackHeartbeat(Math.floor((Date.now() - startRef.current) / 1000))
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("click", onClick)
      document.removeEventListener("visibilitychange", onVisibility)
      clearInterval(heartbeat)
      trackHeartbeat(Math.floor((Date.now() - startRef.current) / 1000))
    }
  }, [])

  return <>{children}</>
}
