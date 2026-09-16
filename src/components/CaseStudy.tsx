"use client"

import { CalendarCheck, Clock, FileCheck, Quote, Wallet } from "lucide-react"

const stats = [
  { icon: FileCheck, label: "What came back", value: "20 posts + 16 scripts", color: "text-yellow-600 dark:text-yellow-300" },
  { icon: CalendarCheck, label: "A 4-week content calendar", value: "Planned & dated", color: "text-blue-700 dark:text-blue-400" },
  { icon: Clock, label: "Time it took", value: "Under 24 hours", color: "text-brand-600 dark:text-brand-400" },
  { icon: Wallet, label: "Cost of an agency", value: "$0 — done in-house", color: "text-green-700 dark:text-green-400" },
]

export default function CaseStudy() {
  return (
    <section id="real-story" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 via-white to-slate-50 dark:from-dark-950 dark:via-dark-900/20 dark:to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="eyebrow eyebrow-centered">
            A Real Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
            Asked on Monday. <span className="heading-accent">Delivered by Tuesday.</span>
          </h2>
          <div className="heading-underline" />
          <p className="text-slate-500 dark:text-dark-400 text-lg">
            Eskai runs a real business every day — <span className="text-brand-600 dark:text-brand-400">BioThrive</span>,
            a farm-input company. Here&apos;s what happened the first week it was put to work.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="text-center glass rounded-xl p-6 space-y-2"
              >
                <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400 mx-auto" />
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-dark-400">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Story card */}
        <div className="max-w-4xl mx-auto glass rounded-2xl p-8 sm:p-10 border border-slate-200 dark:border-dark-700/30">
          <Quote className="w-8 h-8 text-brand-500/30 mb-4" />
          <div className="space-y-6 text-slate-600 dark:text-dark-300 leading-relaxed">
            <p className="text-lg font-medium text-slate-900 dark:text-dark-100">
              &ldquo;I typed what I needed into a chat: a launch plan for my product. By the next
              morning Eskai had written <span className="text-yellow-600 dark:text-yellow-300">20 social posts</span>,{" "}
              <span className="text-yellow-600 dark:text-yellow-300">16 video scripts</span> and a{" "}
              <span className="text-blue-700 dark:text-blue-400">four-week calendar</span> — in a finished Word
              document, in my inbox.&rdquo;
            </p>
            <p>
              <span className="text-brand-600 dark:text-brand-400">BioThrive</span> — a biological fertilizer and
              fungicide — needed a launch plan. An agency quoted weeks and thousands of dollars.
              Instead, the request went into Eskai in plain language, and the work came back
              <span className="text-green-700 dark:text-green-400"> formatted, dated and ready to use</span>.
            </p>
            <p>
              The first attempt wasn&apos;t perfect: the document came out as plain paragraphs
              instead of proper Word tables. Eskai <span className="text-blue-700 dark:text-blue-400">spotted the
              problem itself</span>, rebuilt the whole document with real tables, and the corrected
              version was approved straight away. Nobody had to explain it twice.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-dark-700/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Kamya Samuel</div>
              <div className="text-sm text-slate-500 dark:text-dark-400">Founder & CEO, Eskaen Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}