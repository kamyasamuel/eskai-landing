"use client"

import { Quote, TrendingUp, Target, Clock, CheckCircle } from "lucide-react"

const stats = [
  { icon: CheckCircle, label: "Directives Completed", value: "87%", color: "text-green-400" },
  { icon: TrendingUp, label: "Strategy Cycles Run", value: "2 dream cycles", color: "text-blue-400" },
  { icon: Target, label: "Marketing Assets", value: "20 posts + 16 scripts", color: "text-yellow-300" },
  { icon: Clock, label: "Delivery Time", value: "Under 24 hours", color: "text-brand-400" },
]

export default function CaseStudy() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/20 to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-semibold">
            Proof of Concept
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Built by a founder, for founders
          </h2>
          <p className="text-dark-400 text-lg">
            Eskai wasn't built in a lab. It was built running a real business — <span className="text-brand-400">BioThrive</span>.
            Here's what Eskai delivered in its first week working alongside Kamya.
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
                <Icon className="w-6 h-6 text-brand-400 mx-auto" />
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Story card */}
        <div className="max-w-4xl mx-auto glass rounded-2xl p-8 sm:p-10 border border-dark-700/30">
          <Quote className="w-8 h-8 text-brand-500/30 mb-4" />
          <div className="space-y-6 text-dark-300 leading-relaxed">
            <p className="text-lg font-medium text-dark-100">
              &ldquo;I defined my business, assigned roles to my team, issued directives, and within
              <span className="text-green-400"> 24 hours</span> Eskai had produced a complete marketing content plan — <span className="text-yellow-300">20 X posts</span>,
              <span className="text-yellow-300"> 16 TikTok scripts</span>, a <span className="text-blue-400">4-week calendar</span>, and a <span className="text-brand-400">KPI framework</span> — formatted in a
              professional <span className="text-green-400">DOCX</span> with proper tables and sent directly to my email.&rdquo;
            </p>
            <p>
              <span className="text-brand-400">BioThrive</span> — a biological fertilizer and fungicide — needed a launch strategy.
              Instead of hiring an agency (which would take weeks and cost thousands), Kamya
              turned to Eskai. The result: a complete <span className="text-blue-400">go-to-market</span> content plan, reviewed,
              revised, and approved within <span className="text-green-400">48 hours</span>.
            </p>
            <p>
              The <span className="text-blue-400">Dream Cycle</span> ran twice — first producing a lean strategy based on available
              data, then improving with each iteration. When a formatting issue was flagged in the
              <span className="text-yellow-300"> DOCX</span>, Eskai diagnosed the root cause (plain paragraphs instead of real tables),
              rebuilt the entire document with proper Word tables, and the fix was approved
              immediately.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-dark-700/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <div>
              <div className="font-semibold text-white">Kamya Samuel</div>
              <div className="text-sm text-dark-400">Founder & CEO, Eskaen Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}