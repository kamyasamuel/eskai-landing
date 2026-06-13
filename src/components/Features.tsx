"use client"

import {
  Cpu, Eye, Terminal, Brain, Activity, Wrench,
  GitBranch, Globe, Database, FileText, MessageSquare, Lock, Smartphone, HardDrive
} from "lucide-react"

const featureGroups = [
  {
    title: "The Eskai Difference",
    features: [
      {
        icon: Brain,
        title: "Self-Awareness Engine",
        desc: <>Eskai knows who it is, who you are, and what's happening. <span className="text-brand-400">Identity</span>, <span className="text-blue-400">memory</span>, <span className="text-brand-400">introspection</span>, and <span className="text-blue-400">state tracking</span> built in from day one.</>,
      },
      {
        icon: Eye,
        title: "Sensory Cortex",
        desc: <>Real-time system monitoring — <span className="text-yellow-300">file changes</span>, <span className="text-red-400">error detection</span>, <span className="text-blue-400">resource pressure</span>, <span className="text-brand-400">event correlation</span>. Eskai sees what's happening across your infrastructure.</>,
      },
      {
        icon: Activity,
        title: "Dream Cycle Engine",
        desc: <>Strategic planning that synthesizes operational data into <span className="text-blue-400">insights</span> overnight. Eskai doesn't just execute — it <span className="text-brand-400">reflects</span>, <span className="text-blue-400">learns</span>, and <span className="text-green-400">improves its strategy</span> autonomously.</>,
      },
      {
        icon: Wrench,
        title: "Self-Repair System",
        desc: <><span className="text-green-400">Circuit breakers</span>, <span className="text-yellow-300">error tracking</span>, <span className="text-blue-400">checkpointing</span>, and <span className="text-green-400">automatic recovery</span>. When things break, Eskai <span className="text-brand-400">knows</span>, <span className="text-blue-400">adapts</span>, and <span className="text-green-400">keeps going</span>.</>,
      },
      {
        icon: Smartphone,
        title: "Self-Hosted on ARM",
        desc: <>Runs on <span className="text-brand-400">Raspberry Pi 4/5</span>, <span className="text-yellow-300">Android tablets</span>, and <span className="text-yellow-300">phones</span>. No cloud compute needed — deploy on hardware you already own for <span className="text-green-400">$50 or less</span>.</>,
      },
      {
        icon: HardDrive,
        title: "Your Data, Your Device",
        desc: <><span className="text-green-400">Zero data</span> leaves your hardware. No third-party servers, no <span className="text-yellow-300">data egress fees</span>, no <span className="text-red-400">privacy concerns</span>. Everything stays <span className="text-brand-400">local</span> unless you choose otherwise.</>,
      },
    ],
  },
  {
    title: "What Eskai Can Do",
    features: [
      {
        icon: Terminal,
        title: "Code & Execute",
        desc: <>Run <span className="text-brand-400">Python</span>, <span className="text-green-400">shell commands</span>, manage <span className="text-yellow-300">Git repos</span>, build projects, deploy applications — all through natural conversation.</>,
      },
      {
        icon: FileText,
        title: "Files & Documents",
        desc: <>Read, write, convert <span className="text-green-400">CSVs</span>, <span className="text-blue-400">Excel</span>, <span className="text-red-400">PDFs</span>, <span className="text-yellow-300">DOCX</span>, images, <span className="text-brand-400">Markdown</span>. Create professional documents with proper formatting and tables.</>,
      },
      {
        icon: Database,
        title: "Databases & APIs",
        desc: <>Connect to <span className="text-brand-400">SQLite</span>, <span className="text-blue-400">PostgreSQL</span>, <span className="text-yellow-300">MySQL</span>. Query, export, and analyze data. Make <span className="text-green-400">HTTP requests</span> to any API. Full <span className="text-yellow-300">GitHub</span>, <span className="text-red-400">Slack</span>, <span className="text-blue-400">Notion</span> integration.</>,
      },
      {
        icon: Globe,
        title: "Web & Research",
        desc: <>Search the web, browse pages, download files, conduct structured research with <span className="text-brand-400">source tracking</span> and <span className="text-blue-400">synthesis reports</span>.</>,
      },
      {
        icon: GitBranch,
        title: "DevOps & Infrastructure",
        desc: <>Manage <span className="text-blue-400">Docker</span> containers, <span className="text-green-400">SSH</span> into servers, set up <span className="text-yellow-300">systemd</span> services, configure environments, handle <span className="text-brand-400">cron jobs</span>, run <span className="text-green-400">deployment validation</span>.</>,
      },
      {
        icon: MessageSquare,
        title: "Communication",
        desc: <>Send emails with attachments, <span className="text-yellow-300">Telegram</span> messages with buttons and media, manage messaging workflows across platforms.</>,
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.features.map((feature, fi) => {
                const Icon = feature.icon
                return (
                  <div
                    key={fi}
                    className="group rounded-xl glass glass-hover p-6 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500/10 to-emerald-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-brand-400" />
                      </div>
                      <h4 className="font-semibold text-white pt-1">{feature.title}</h4>
                    </div>
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