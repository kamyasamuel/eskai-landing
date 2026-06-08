"use client"

import {
  Cpu, Eye, Terminal, Brain, Activity, Wrench,
  GitBranch, Globe, Database, FileText, MessageSquare, Lock
} from "lucide-react"

const featureGroups = [
  {
    title: "The Eskai Difference",
    features: [
      {
        icon: Brain,
        title: "Self-Awareness Engine",
        desc: "Eskai knows who it is, who you are, and what's happening. Identity, memory, introspection, and state tracking built in from day one.",
      },
      {
        icon: Eye,
        title: "Sensory Cortex",
        desc: "Real-time system monitoring — file changes, error detection, resource pressure, event correlation. Eskai sees what's happening across your infrastructure.",
      },
      {
        icon: Activity,
        title: "Dream Cycle Engine",
        desc: "Strategic planning that synthesizes operational data into insights overnight. Eskai doesn't just execute — it reflects, learns, and improves its strategy autonomously.",
      },
      {
        icon: Wrench,
        title: "Self-Repair System",
        desc: "Circuit breakers, error tracking, checkpointing, and automatic recovery. When things break, Eskai knows, adapts, and keeps going.",
      },
    ],
  },
  {
    title: "What Eskai Can Do",
    features: [
      {
        icon: Terminal,
        title: "Code & Execute",
        desc: "Run Python, shell commands, manage Git repos, build projects, deploy applications — all through natural conversation.",
      },
      {
        icon: FileText,
        title: "Files & Documents",
        desc: "Read, write, convert CSVs, Excel, PDFs, DOCX, images, Markdown. Create professional documents with proper formatting and tables.",
      },
      {
        icon: Database,
        title: "Databases & APIs",
        desc: "Connect to SQLite, PostgreSQL, MySQL. Query, export, and analyze data. Make HTTP requests to any API. Full GitHub, Slack, Notion integration.",
      },
      {
        icon: Globe,
        title: "Web & Research",
        desc: "Search the web, browse pages, download files, conduct structured research with source tracking and synthesis reports.",
      },
      {
        icon: GitBranch,
        title: "DevOps & Infrastructure",
        desc: "Manage Docker containers, SSH into servers, set up systemd services, configure environments, handle cron jobs, run deployment validation.",
      },
      {
        icon: MessageSquare,
        title: "Communication",
        desc: "Send emails with attachments, Telegram messages with buttons and media, manage messaging workflows across platforms.",
      },
    ],
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-dark-900/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-semibold">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            150+ tools. One interface. Unlimited potential.
          </h2>
          <p className="text-dark-400 text-lg">
            Eskai is not a single-purpose tool. It is a platform of interconnected capabilities
            that compound in value the more you use them.
          </p>
        </div>

        {featureGroups.map((group, gi) => (
          <div key={gi} className="mb-16 last:mb-0">
            <h3 className="text-xl font-semibold text-dark-200 mb-8 text-center lg:text-left">
              {group.title}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.features.map((feature, fi) => {
                const Icon = feature.icon
                return (
                  <div
                    key={fi}
                    className="group rounded-xl glass glass-hover p-6 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500/10 to-emerald-500/10 border border-brand-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                    <h4 className="font-semibold text-white">{feature.title}</h4>
                    <p className="text-sm text-dark-400 leading-relaxed">{feature.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
