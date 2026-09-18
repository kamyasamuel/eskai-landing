import {
  ArrowRight,
  Clock,
  CloudOff,
  FileCheck,
  Quote,
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
  Users,
  type LucideIcon,
} from "lucide-react"

type Proof = {
  icon: LucideIcon
  value: string
  label: string
  sub: string
  color: string
}

// Every number on this page must be something we can stand behind:
// either documented first-party results (the BioThrive launch week)
// or a product guarantee. No adoption counts until they are real.
const proofs: Proof[] = [
  {
    icon: FileCheck,
    value: "20 posts + 16 scripts",
    label: "Real work, delivered",
    sub: "Produced for BioThrive — our farm-input product — in one overnight run",
    color: "text-yellow-600 dark:text-yellow-300",
  },
  {
    icon: Clock,
    value: "Under 24 hours",
    label: "From request to finished document",
    sub: "A plain-language message in, a formatted, dated Word document back",
    color: "text-brand-600 dark:text-brand-400",
  },
  {
    icon: CloudOff,
    value: "$0",
    label: "Cloud bills",
    sub: "It runs on the device we ship you — your information never lives on our servers",
    color: "text-green-700 dark:text-green-400",
  },
  {
    icon: Users,
    value: "Direct line",
    label: "To the founding team",
    sub: "Early owners don't open tickets — they message us on WhatsApp when they need a hand",
    color: "text-blue-700 dark:text-blue-400",
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

export default function AlreadyUsing() {
  return (
    <section id="already-using" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 via-white to-slate-50 dark:from-dark-950 dark:to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="eyebrow eyebrow-centered">
            <Sparkles className="w-3.5 h-3.5" />
            Proof, not promises
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
            It already runs a <span className="heading-accent">real business</span>
          </h2>
          <div className="heading-underline" />
          <p className="text-slate-500 dark:text-dark-400 text-lg">
            Eskai isn&apos;t a demo — it runs the day-to-day and all of the R&amp;D at
            Eskaen Technologies. BioThrive, our farm-input product, is what it runs in
            production. The first configured devices are going out now, and the first
            owners work directly with us.
          </p>
        </div>

        {/* Proof cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {proofs.map((p) => (
              <div
                key={p.label}
                className="group rounded-xl glass glass-hover p-6 text-center space-y-3 flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/20 transition-all duration-300 shrink-0">
                  <p.icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <div className="min-h-[4rem] flex items-center justify-center">
                  <div className={`text-2xl font-bold ${p.color} leading-tight`}>{p.value}</div>
                </div>
                <div className="font-semibold text-slate-900 dark:text-white">{p.label}</div>
                <div className="text-sm text-slate-500 dark:text-dark-400 leading-relaxed flex-1">{p.sub}</div>
              </div>
          ))}
        </div>

        {/* Real story + your story */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
          {/* Real quote */}
          <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-dark-700/30 flex flex-col">
            <Quote className="w-7 h-7 text-brand-500/30 mb-4" />
            <p className="text-slate-800 dark:text-dark-200 leading-relaxed flex-1">
              &ldquo;By the next morning Eskai had written{" "}
              <span className="text-yellow-600 dark:text-yellow-300">20 social posts</span>,{" "}
              <span className="text-yellow-600 dark:text-yellow-300">16 video scripts</span> and a{" "}
              <span className="text-blue-700 dark:text-blue-400">four-week calendar</span> — in a
              finished Word document, in my inbox.&rdquo;
            </p>
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-dark-700/30 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">The BioThrive launch week</div>
                <div className="text-sm text-slate-500 dark:text-dark-400">Run entirely by Eskai</div>
              </div>
              <a
                href="#real-story"
                className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors whitespace-nowrap"
              >
                Read the full story →
              </a>
            </div>
          </div>

          {/* Early owner slot */}
          <div className="glass rounded-2xl p-8 border border-brand-500/25 flex flex-col">
            <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 text-xs font-semibold mb-4">
              First batch
            </span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex-1">
              Your story could be the first one on this page.
            </h3>
            <p className="text-sm text-slate-500 dark:text-dark-400 leading-relaxed mb-6">
              We&apos;re configuring the first devices now. Owners in this batch get
              founder-level attention, their setup tuned to their business — and
              when the results come in, we tell that story here with their name on
              it.
            </p>
            <a
              href="#apply"
              data-track-cta
              data-track-source="already-using"
              className="inline-flex w-fit items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all duration-200 glow hover:glow-sm"
            >
              Reserve Yours
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Industries */}
        <div className="max-w-4xl mx-auto glass rounded-2xl p-8 sm:p-10 border border-slate-200 dark:border-dark-700/30 text-center">
          <p className="text-sm text-slate-500 dark:text-dark-400 mb-4">
            Built for businesses of every kind
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {industries.map((ind) => (
              <span
                key={ind.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-sm text-slate-800 dark:text-dark-200 hover:border-brand-500/30 hover:text-brand-700 dark:hover:text-brand-300 transition-all duration-200"
              >
                <ind.icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                {ind.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
