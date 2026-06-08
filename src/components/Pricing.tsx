"use client"

import { Check, ArrowRight, Star } from "lucide-react"

const tiers = [
  {
    name: "Personal",
    desc: "Your AI brain. For freelancers and solo entrepreneurs.",
    price: 29,
    period: "/month",
    features: [
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
  },
  {
    name: "Business",
    desc: "Your AI operations manager. For small teams and startups.",
    price: 99,
    period: "/month",
    features: [
      "Everything in Personal",
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
    badge: "Most Popular",
  },
  {
    name: "Vertical",
    desc: "Industry-specific AI. Pre-loaded with domain knowledge.",
    price: 199,
    period: "/month",
    badge: "Agriculture Ready",
    features: [
      "Everything in Business",
      "Pre-loaded domain knowledge",
      "Industry-specific tooling",
      "Local language support (Luganda, Swahili)",
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
      "Everything in Vertical",
      "Self-hosted deployment",
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
            Start with what you need. Scale as you grow.
          </h2>
          <p className="text-dark-400 text-lg">
            No hidden fees. No long-term contracts. All tiers include a 14-day free trial.
            Cancel anytime.
          </p>
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
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      tier.highlighted
                        ? "bg-brand-600 text-white"
                        : "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                    }`}
                  >
                    {tier.highlighted && <Star className="w-3 h-3" />}
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <p className="text-sm text-dark-400 mt-1">{tier.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {tier.price ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">${tier.price}</span>
                    <span className="text-dark-400 text-sm">{tier.period}</span>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-white">Custom</div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feat, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-dark-300">
                    <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#apply"
                className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
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
            Annual plans available at 2 months free.{" "}
            <span className="text-brand-400">Enterprise</span> includes self-hosted
            deployment and white-label branding.
          </p>
        </div>
      </div>
    </section>
  )
}
