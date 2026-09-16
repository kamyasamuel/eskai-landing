"use client"

import { useEffect, useState } from "react"
import { ArrowRight, CheckCheck, Lock, Send, Sparkles, Wifi } from "lucide-react"

const chat: Array<{ from: "eskai" | "you"; text: string }> = [
  {
    from: "eskai",
    text: "Good morning 👋 Your 8am report is ready: 3 orders came in overnight, and one supplier invoice is due today.",
  },
  { from: "you", text: "Send the invoice reminder" },
  {
    from: "eskai",
    text: "Done — sent to Grace at Kampala Agro. I'll tell you as soon as she replies.",
  },
  { from: "you", text: "how is my stock looking?" },
  {
    from: "eskai",
    text: "4 items are running low: maize seed, NPK, tomato stakes and gloves. Want me to draft the restock order?",
  },
]

export default function Hero() {
  // Scroll cue: pinned to the viewport bottom on load, fades out once the
  // visitor starts scrolling so it never overlaps content further down.
  const [showScrollCue, setShowScrollCue] = useState(true)

  useEffect(() => {
    const onScroll = () => setShowScrollCue(window.scrollY < 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 via-white to-slate-50 dark:from-brand-950/20 dark:via-dark-950 dark:to-dark-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-[128px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm text-brand-700 dark:text-brand-300 border border-brand-800/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Comes ready to use · Buy once · No subscription</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Your own AI assistant
              <br />
              <span className="heading-accent text-shimmer">that actually does the work.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-dark-300 leading-relaxed max-w-lg">
              We deliver it to you on a small device, already set up. It writes your documents,
              sends your follow-ups, keeps an eye on things and reports to you on Telegram — and
              everything stays in your office. Pay once, no monthly subscription.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#apply"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-sm sm:text-base text-white font-semibold transition-all duration-200 glow hover:glow-sm"
              >
                Reserve yours
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-you-get-it"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-sm sm:text-base text-slate-800 dark:text-dark-200 font-semibold transition-all duration-200"
              >
                See how you get it
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-dark-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-brand-500" />
                Your information stays on your device
              </span>
              <span className="flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-brand-500" />
                Works with the internet you already have
              </span>
            </div>
          </div>

          {/* Right — Chat visual */}
          <div className="flex items-center justify-center animate-float">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl glass border border-slate-200 dark:border-dark-700/50 p-5 space-y-4">
                {/* Chat header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-dark-700/30">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                    E
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Eskai</div>
                    <div className="text-xs text-green-700 dark:text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      online · working
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-3">
                  {chat.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.from === "you" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.from === "you"
                            ? "bg-brand-600 text-white rounded-br-sm"
                            : "bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-dark-200 rounded-bl-sm"
                        }`}
                      >
                        {msg.text}
                        {msg.from === "you" && (
                          <span className="ml-2 inline-flex align-middle text-white/60">
                            <CheckCheck className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-dark-700/30">
                  <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-200/70 dark:bg-dark-800 text-sm text-slate-500 dark:text-dark-500">
                    Message Eskai…
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shrink-0">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/30 via-emerald-500/30 to-brand-500/30 dark:from-brand-500/20 dark:via-emerald-500/20 dark:to-brand-500/20 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>

        {/* For the technical folks */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="rounded-xl glass border border-slate-200 dark:border-dark-700/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-dark-500">
                For the technical folks
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 shrink-0">$</span>
                <span className="text-slate-800 dark:text-dark-200">eskai.whoami()</span>
              </div>
              <div className="pl-5 text-slate-500 dark:text-dark-400">
                <span className="text-brand-700 dark:text-brand-300">→</span>{" "}
                <span>&quot;Eskai — self-hosted agent, running on your own device&quot;</span>
              </div>
              <div className="flex items-start gap-2 pt-1.5">
                <span className="text-brand-600 dark:text-brand-400 shrink-0">$</span>
                <span className="text-slate-800 dark:text-dark-200">eskai.status()</span>
              </div>
              <div className="pl-5 text-slate-500 dark:text-dark-400">
                <span className="text-brand-700 dark:text-brand-300">→</span> memory:{" "}
                <span className="text-blue-700 dark:text-blue-400">active</span> · sensors:{" "}
                <span className="text-blue-700 dark:text-blue-400">6/6 online</span> · self-repair:{" "}
                <span className="text-green-700 dark:text-green-400">engaged</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — fixed to viewport, fades on scroll */}
      <div
        aria-hidden="true"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-slate-400 dark:text-dark-600 pointer-events-none transition-opacity duration-700 ${
          showScrollCue ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-slate-300 dark:border-dark-700 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-slate-400 dark:bg-dark-500 animate-bounce motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  )
}