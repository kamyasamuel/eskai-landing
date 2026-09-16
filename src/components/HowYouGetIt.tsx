import { ClipboardList, MessageSquare, Package, Rocket, Settings2, Truck } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us what you need",
    desc: "A short form: what you'd like it to do, and where you are. No technical questions — describe it the way you'd explain it to a new employee.",
  },
  {
    icon: Settings2,
    title: "We build and configure it",
    desc: "We set up your device, load what it needs, test it, and pack it. If you already keep records in Excel or on paper, we'll set that up too.",
  },
  {
    icon: Truck,
    title: "It arrives ready to work",
    desc: "In Kampala we deliver it and set it up with you. Anywhere else, it arrives ready — plug it in and connect to Wi-Fi, and it's live.",
  },
  {
    icon: MessageSquare,
    title: "You just message it",
    desc: "Start with a hello on Telegram or WhatsApp. From there it learns your business, your customers and the way you like things done.",
  },
]

const promises = [
  { icon: Package, text: "Comes configured — nothing to install" },
  { icon: Rocket, text: "Working the same day it arrives" },
  { icon: Truck, text: "Delivered and set up in Kampala" },
]

export default function HowYouGetIt() {
  return (
    <section id="how-you-get-it" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 via-white to-slate-50 dark:from-dark-950 dark:via-dark-900/50 dark:to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="eyebrow eyebrow-centered">How You Get It</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
            Four steps, and <span className="heading-accent">none of them are yours to figure out.</span>
          </h2>
          <div className="heading-underline" />
          <p className="text-slate-500 dark:text-dark-400 text-lg">
            You don&apos;t buy software and hope it works. We hand you a device that&apos;s already
            set up, with someone a phone call away if you need a hand.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group rounded-xl glass glass-hover p-6 space-y-4 animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500/10 to-emerald-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 transition-all duration-300">
                  <step.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-dark-500 font-semibold">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white min-h-[56px] leading-snug">{step.title}</h3>
              <p className="text-sm text-slate-500 dark:text-dark-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Promises */}
        <div className="mt-10 max-w-4xl mx-auto glass rounded-2xl p-6 border border-slate-200 dark:border-dark-700/30">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {promises.map((promise) => (
              <span
                key={promise.text}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-dark-300"
              >
                <promise.icon className="w-4 h-4 text-brand-500" />
                {promise.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}