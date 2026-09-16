"use client"

import {
  Activity, Brain, Database, Eye, FileText, GitBranch, Globe, HardDrive,
  Lock, MessageSquare, Terminal, Wrench,
} from "lucide-react"

const featureGroups = [
  {
    title: "What Eskai Does For You",
    features: [
      {
        icon: Brain,
        title: "It remembers you",
        desc: <>Your customers, suppliers, prices and the way you like things done stay in its head. You <span className="text-blue-700 dark:text-blue-400">never explain the same thing twice</span> — and it gets <span className="text-green-700 dark:text-green-400">more useful every week</span>.</>,
      },
      {
        icon: Activity,
        title: "It works while you sleep",
        desc: <>Overnight it goes through what happened in your business and leaves you a <span className="text-green-700 dark:text-green-400">short, plain plan</span> each morning — what sold, what&apos;s running low, what to do next.</>,
      },
      {
        icon: Eye,
        title: "It keeps an eye on things",
        desc: <>Your stock, your records and your systems are watched <span className="text-blue-700 dark:text-blue-400">around the clock</span>. When something breaks or runs low you hear about it <span className="text-yellow-600 dark:text-yellow-300">early</span> — not from a customer.</>,
      },
      {
        icon: Wrench,
        title: "It fixes itself",
        desc: <>If something goes wrong it <span className="text-green-700 dark:text-green-400">recovers on its own</span>, picks up where it left off, and tells you what happened — instead of stopping and waiting for a technician.</>,
      },
      {
        icon: HardDrive,
        title: "It comes ready to use",
        desc: <>We ship it on a <span className="text-brand-600 dark:text-brand-400">small device we configure for you</span>. Plug it in, connect to Wi-Fi, and it&apos;s live — no installation, no server room, no IT person.</>,
      },
      {
        icon: Lock,
        title: "Your information stays with you",
        desc: <>Nothing is uploaded to us. Your records, conversations and documents live <span className="text-green-700 dark:text-green-400">on your device, in your office</span> — and it keeps working with the internet unplugged.</>,
      },
    ],
  },
  {
    title: "What It Can Do",
    features: [
      {
        icon: FileText,
        title: "Documents & records",
        desc: <>Invoices, quotes, reports, letters and spreadsheets — written, <span className="text-green-700 dark:text-green-400">properly formatted</span> and ready to send, in Word, Excel or PDF.</>,
      },
      {
        icon: MessageSquare,
        title: "Messages & follow-ups",
        desc: <>It writes your replies, <span className="text-yellow-600 dark:text-yellow-300">chases unpaid invoices</span>, reminds customers and staff, and sends on email or Telegram — so nothing sits waiting on you.</>,
      },
      {
        icon: Globe,
        title: "Research",
        desc: <>Suppliers, prices, competitors and buyers — researched with the <span className="text-brand-600 dark:text-brand-400">sources attached</span>, so you can check it yourself instead of taking its word.</>,
      },
      {
        icon: Database,
        title: "Your numbers",
        desc: <>It reads your spreadsheets and records, adds things up, spots what&apos;s missing, and shows you the <span className="text-blue-700 dark:text-blue-400">totals that actually matter</span>.</>,
      },
      {
        icon: Terminal,
        title: "Technical work",
        desc: <>For the technical folk: it writes and runs <span className="text-brand-600 dark:text-brand-400">scripts</span>, manages servers and Git, and builds small tools on request.</>,
      },
      {
        icon: GitBranch,
        title: "Works with your tools",
        desc: <>Email, Telegram, Slack, Notion, GitHub, databases — <span className="text-green-700 dark:text-green-400">connected</span>, so you don&apos;t have to change the way you already work.</>,
      },
    ],
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-slate-50/60 dark:bg-dark-900/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="eyebrow eyebrow-centered">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
            You just type a message. <span className="heading-accent">It does the rest.</span>
          </h2>
          <div className="heading-underline" />
          <p className="text-slate-500 dark:text-dark-400 text-lg">
            &ldquo;Send the invoice reminder.&rdquo; &ldquo;Write last week&apos;s report.&rdquo;
            &ldquo;Check my stock.&rdquo; That&apos;s the whole interface. Behind it there are more
            than 150 tools working for you — you only ever have to use the chat.
          </p>
        </div>

        {featureGroups.map((group, gi) => (
          <div key={gi} className="mb-16 last:mb-0">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-dark-200 mb-8 text-center lg:text-left flex items-center justify-center lg:justify-start gap-3">
              <span className="hidden lg:inline-block h-px w-10 bg-gradient-to-r from-brand-500 to-transparent" />
              {group.title}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.features.map((feature, fi) => {
                const Icon = feature.icon
                return (
                    <div
                      key={fi}
                      className="group rounded-xl glass glass-hover p-6 space-y-3 flex flex-col"
                    >
                      <div className="flex items-center gap-3 min-h-[40px]">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500/10 to-emerald-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white leading-snug">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-dark-400 leading-relaxed">{feature.desc}</p>
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