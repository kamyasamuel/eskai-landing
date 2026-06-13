"use client"

import { Check, ArrowRight, Star, HardDrive, Cpu, Shield } from "lucide-react"

const tiers = [
  {
    name: "Personal",
    desc: "Your AI agent. For freelancers and solo entrepreneurs.",
    price: 10,
    period: "/month",
    features: [
      "Self-hosted on your own ARM device",
      "Self-awareness & memory",
      "File operations (CSV, Excel, PDF, DOCX)",
      "Web search & research synthesis",
      "Code execution (Python, shell)",
      "Project & task management",
      "Audio transcription & image analysis",
      "Email integration",
    ],
    cta: "Get Early Access",
    highlighted: false,
    badges: ["Self-Hosted"],
  },
  {
    name: "Business",
    desc: "Your AI operations manager. For small teams and startups.",
    price: 35,
    period: "/month",
    features: [
      "Everything in Personal — all self-hosted",
      "Business Command Center",
      "Dream Cycle engine — strategic planning",
      "Operations analysis & reporting",
      "Up to 5 businesses",
      "Up to 10 team actors",
      "Telegram bot interface",
      "Sensory Cortex monitoring",
      "Directive & workflow management",
    ],
    cta: "Get Early Access",
    highlighted: true,
    badges: ["Self-Hosted", "Most Popular"],
  },
  {
    name: "Vertical",
    desc: "Industry-specific AI. Pre-loaded with domain knowledge.",
    price: 75,
    period: "/month",
    badges: ["Self-Hosted", "Agriculture Ready"],
    features: [
      "Everything in Business — all self-hosted",
      "Pre-loaded domain knowledge",
      "Industry-specific tooling",
      "Custom reporting templates",
      "Priority support",
    ],
    cta: "Get Early Access",
    highlighted: false,
  },
  {
    name: "Enterprise",
    desc: "Your AI department. For organizations at scale.",
    price: null,
    period: "",
    features: [
      "Everything in Vertical — all self-hosted",
      "Dedicated ARM server deployment",
      "White-label branding",
      "Unlimited businesses & actors",
      "Custom API integrations",
      "Dedicated infrastructure",
      "Audit logging & compliance",
      "24-hour support SLA",
      "Custom training & onboarding",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
]

const planFeatures: Record<string, Array<{ label: string; accent: "brand" | "blue" | "green" | "yellow" | "none" }>> = {
  "Personal": [
    { label: "Self-hosted on your own ARM device", accent: "brand" },
    { label: "Self-awareness & memory", accent: "blue" },
    { label: "File operations (CSV, Excel, PDF, DOCX)", accent: "green" },
    { label: "Web search & research synthesis", accent: "blue" },
    { label: "Code execution (Python, shell)", accent: "green" },
    { label: "Project & task management", accent: "none" },
    { label: "Audio transcription & image analysis", accent: "yellow" },
    { label: "Email integration", accent: "none" },
  ],
  "Business": [
    { label: "Everything in Personal — all self-hosted", accent: "brand" },
    { label: "Business Command Center", accent: "yellow" },
    { label: "Dream Cycle engine — strategic planning", accent: "blue" },
    { label: "Operations analysis & reporting", accent: "green" },
    { label: "Up to 5 businesses", accent: "none" },
    { label: "Up to 10 team actors", accent: "none" },
    { label: "Telegram bot interface", accent: "yellow" },
    { label: "Sensory Cortex monitoring", accent: "blue" },
    { label: "Directive & workflow management", accent: "brand" },
  ],
  "Vertical": [
    { label: "Everything in Business — all self-hosted", accent: "brand" },
    { label: "Pre-loaded domain knowledge", accent: "blue" },
    { label: "Industry-specific tooling", accent: "green" },
    { label: "Custom reporting templates", accent: "yellow" },
    { label: "Priority support", accent: "brand" },
  ],
  "Enterprise": [
    { label: "Everything in Vertical — all self-hosted", accent: "brand" },
    { label: "Dedicated ARM server deployment", accent: "blue" },
    { label: "White-label branding", accent: "green" },
    { label: "Unlimited businesses & actors", accent: "none" },
    { label: "Custom API integrations", accent: "yellow" },
    { label: "Dedicated infrastructure", accent: "blue" },
    { label: "Audit logging & compliance", accent: "green" },
    { label: "24-hour support SLA", accent: "brand" },
    { label: "Custom training & onboarding", accent: "none" },
  ],
}

const accentColors: Record<string, string> = {
  brand: "text-brand-400",
  blue: "text-blue-400",
  green: "text-green-400",
  yellow: "text-yellow-300",
  none: "",
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-dark-900/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-semibold">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Intelligence shouldn't be a luxury.
          </h2>
          <p className="text-dark-400 text-lg">
            Every tier is self-hosted. No cloud compute fees, no data egress costs,
            no vendor lock-in. Your agent runs on the device you already own, for less
            than the price of a coffee per day.
          </p>
        </div>

        {/* Self-hosting highlight banner */}
        <div className="max-w-3xl mx-auto mb-10 glass rounded-xl p-4 border border-brand-800/30 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-dark-300">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-brand-400" />
              Runs on Raspberry Pi 4/5, Android tablets, phones
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-brand-400" />
              Data never leaves your device
            </span>
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-brand-400" />
              No cloud GPU bills
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${
                tier.highlighted
                  ? "glass border-brand-500/30 shadow-lg shadow-brand-500/5"
                  : "glass border-dark-700/30"
              }`}
            >
              {/* Badges */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-2">
                {tier.badges?.map((badge, bi) => (
                  <span
                    key={bi}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      tier.highlighted && bi === (tier.badges!.length - 1)
                        ? "bg-brand-600 text-white"
                        : "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                    }`}
                  >
                    {bi === 0 && <Cpu className="w-3 h-3" />}
                    {tier.highlighted && bi === (tier.badges!.length - 1) && <Star className="w-3 h-3" />}
                    {badge}
                  </span>
                ))}
              </div>

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <p className="text-sm text-dark-400 mt-1">{tier.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {tier.price ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      <span className="text-brand-400">$</span>{tier.price}
                    </span>
                    <span className="text-dark-400 text-sm">{tier.period}</span>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-white">
                    <span className="text-brand-400">Custom</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {(planFeatures[tier.name] || []).map((feat, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-dark-300">
                    <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span className={feat.accent !== "none" ? accentColors[feat.accent] : ""}>{feat.label}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#apply"
                className={`inline-flex items-center justify-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  tier.highlighted
                    ? "bg-brand-600 hover:bg-brand-500 text-white glow-sm"
                    : "glass glass-hover text-dark-200"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Annual note */}
        <div className="text-center mt-8">
          <p className="text-sm text-dark-500">
            Annual plans available at 2 months free. All tiers are{" "}
            <span className="text-brand-400">self-hosted</span> —
            bring your own Raspberry Pi, tablet, or phone.
          </p>
        </div>
      </div>
    </section>
  )
}