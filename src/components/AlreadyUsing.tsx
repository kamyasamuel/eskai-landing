import {
  Users,
  Globe,
  Zap,
  CloudOff,
  ArrowRight,
  Sparkles,
  Bot,
  Building2,
  GraduationCap,
  ShoppingCart,
  Stethoscope,
  Truck,
  Newspaper,
  Sprout,
  Cpu,
  type LucideIcon,
} from "lucide-react"
import UserCounter from "./UserCounter"

type Stat = {
  icon: LucideIcon
  value?: string
  end?: number
  suffix?: string
  label: string
  sub: string
  color: string
}

const stats: Stat[] = [
  {
    icon: Users,
    end: 1500,
    suffix: "+",
    label: "Early adopters",
    sub: "Founders, teams and businesses already using Eskai",
    color: "text-brand-400",
  },
  {
    icon: Globe,
    value: "40+",
    label: "Countries",
    sub: "From Kampala to Berlin to São Paulo — everywhere",
    color: "text-blue-400",
  },
  {
    icon: Zap,
    value: "250k+",
    label: "Tasks automated",
    sub: "Emails, reports, code, research and operations",
    color: "text-yellow-300",
  },
  {
    icon: CloudOff,
    value: "$0",
    label: "Cloud compute bills",
    sub: "Everything runs on hardware you already own",
    color: "text-green-400",
  },
]

const industries = [
  { icon: Sprout, label: "Agritech" },
  { icon: Building2, label: "SMBs" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Stethoscope, label: "Health" },
  { icon: GraduationCap, label: "Education" },
  { icon: Truck, label: "Logistics" },
  { icon: Newspaper, label: "Media" },
  { icon: Cpu, label: "SaaS" },
  { icon: Bot, label: "AI Startups" },
]

const avatars = [
  { initials: "KS", gradient: "from-brand-500 to-emerald-600" },
  { initials: "AM", gradient: "from-blue-500 to-cyan-600" },
  { initials: "JT", gradient: "from-purple-500 to-pink-600" },
  { initials: "NO", gradient: "from-amber-500 to-orange-600" },
  { initials: "DW", gradient: "from-rose-500 to-red-600" },
  { initials: "LP", gradient: "from-teal-500 to-green-600" },
]

export default function AlreadyUsing() {
  return (
    <section id="already-using" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-brand-950/10 to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-500 font-semibold">
            <Sparkles className="w-4 h-4" />
            Already Using Eskai
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Join <span className="text-gradient">1,500+</span> founders and teams
            running their business on Eskai
          </h2>
          <p className="text-dark-400 text-lg">
            From solo makers to growing companies across the world — people are
            replacing costly SaaS stacks with one persistent, self-hosted agent
            that never sleeps.
          </p>
        </div>

        {/* Big stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group rounded-xl glass glass-hover p-6 text-center space-y-3"
            >
              <div className="w-12 h-12 mx-auto rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/20 transition-all duration-300">
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div className={`text-3xl font-bold ${s.color}`}>
                {s.end ? <UserCounter end={s.end} suffix={s.suffix ?? ""} /> : s.value}
              </div>
              <div className="font-semibold text-white">{s.label}</div>
              <div className="text-sm text-dark-400 leading-relaxed">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Avatars + industries */}
        <div className="max-w-4xl mx-auto glass rounded-2xl p-8 sm:p-10 border border-dark-700/30 text-center space-y-8">
          <div className="flex items-center justify-center -space-x-3">
            {avatars.map((a) => (
              <div
                key={a.initials}
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${a.gradient} flex items-center justify-center text-white text-sm font-bold ring-4 ring-dark-950`}
              >
                {a.initials}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-xs font-bold text-dark-300 ring-4 ring-dark-950">
              +1.5k
            </div>
          </div>

          <div>
            <p className="text-sm text-dark-400 mb-4">
              Trusted by builders across industries
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {industries.map((ind) => (
                <span
                  key={ind.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 border border-dark-700 text-sm text-dark-200 hover:border-brand-500/30 hover:text-brand-300 transition-all duration-200"
                >
                  <ind.icon className="w-4 h-4 text-brand-400" />
                  {ind.label}
                </span>
              ))}
            </div>
          </div>

          <a
            href="#apply"
            data-track-cta
            data-track-source="already-using"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all duration-200 glow hover:glow-sm"
          >
            Get Early Access
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
