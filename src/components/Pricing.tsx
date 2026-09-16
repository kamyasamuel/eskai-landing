"use client"

import { ArrowRight, Check, Coins, Cpu, KeyRound, ShieldCheck, Star, Truck, Wallet } from "lucide-react"

const TALK_TO_US =
  "mailto:kamyasamuel@eskaen.com?subject=Eskai%20%E2%80%94%20Custom%20setup%20enquiry"

type Tier = {
  name: string
  forWho: string
  price: number | null
  priceNote?: string
  badges: string[]
  carePlan: string
  running: string
  features: string[]
  cta: string
  href: string
  highlighted: boolean
}

// PRICE BASIS (2026-09): one-time prices cover hardware + configuration + setup + delivery.
// Personal $199  — Pi-class BOM ≈ $100–130 → ~35–50% gross margin.
// Business $599  — N100 mini-PC BOM ≈ $250–320 → ~46–58% gross margin.
// Custom from $2,500 — server / fleet + on-site install, scoped per deal.
// Full assumptions, sensitivity and edit points: docs/pricing-cost-model.md
// UGX figures use ~UGX 3,700/USD (Sept 2026); update both here and in the doc if FX moves >5%.
const tiers: Tier[] = [
  {
    name: "Personal",
    forWho: "For one person — a shop, a farm, a practice or a freelance business.",
    price: 199,
    priceNote: "≈ UGX 740,000",
    badges: ["Comes ready to use"],
    carePlan: "+$9/mo · optional",
    running: "Your own AI key (no markup), or about $5–15/mo in credits",
    features: [
      "A small device, configured for you and delivered",
      "Plug it in, connect to Wi-Fi — it's live",
      "Remembers you and your business — you never explain twice",
      "Writes your documents, invoices, quotes and reports",
      "Reads and sorts your records, receipts and spreadsheets",
      "Researches suppliers, prices and buyers, with sources",
      "Reminders and follow-ups — it chases, you don't",
      "You talk to it on Telegram or WhatsApp",
      "Your information never leaves your device",
    ],
    cta: "Reserve yours",
    href: "#apply",
    highlighted: false,
  },
  {
    name: "Business",
    forWho: "For a growing business — a team that needs the work tracked.",
    price: 599,
    priceNote: "≈ UGX 2.2M",
    badges: ["Most popular"],
    carePlan: "+$29/mo · optional",
    running: "Your own AI key, or about $30–80/mo in credits",
    features: [
      "Everything in Personal",
      "A bigger device — built for a whole team",
      "Tracks what's being done across the business, and what's waiting on you",
      "Thinks overnight and leaves you a clear plan each morning",
      "Keeps an eye on your systems and warns you before things break",
      "Works with your email, spreadsheets and business tools",
      "Up to 10 people can use it",
      "Priority support when you need a hand",
    ],
    cta: "Reserve yours",
    href: "#apply",
    highlighted: true,
  },
  {
    name: "Custom",
    forWho: "For organizations, several branches, or resellers.",
    price: null,
    priceNote: "from $2,500",
    badges: ["Built to order"],
    carePlan: "included, with a support agreement",
    running: "Volume token agreement",
    features: [
      "Everything in Business",
      "One device, or a fleet across several branches",
      "Your own branding, if you want to offer it to your clients",
      "We install it on site and train your team",
      "Works with the systems you already run — connections built to order",
      "A record of everything it did, for audits and compliance",
      "Guaranteed response times, in writing",
    ],
    cta: "Talk to us",
    href: TALK_TO_US,
    highlighted: false,
  },
]

const costParts = [
  {
    icon: Truck,
    title: "1. The device — pay once",
    desc: "Your Eskai arrives configured. That one-time price covers the hardware, the setup work and delivery. No subscription, no lock-in — the device is yours to keep.",
  },
  {
    icon: KeyRound,
    title: "2. AI tokens — only what it uses",
    desc: "Thinking costs tokens. Plug in your own OpenAI or Anthropic key and pay them directly at zero markup, or buy prepaid credits from us ($10 / $25 / $50) that are used as it works.",
  },
  {
    icon: ShieldCheck,
    title: "3. Care Plan — optional",
    desc: "Updates, encrypted backup of everything it has learned, and remote help when you want it. Cancel any time — your Eskai keeps working without it.",
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-slate-50/60 dark:bg-dark-900/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="eyebrow eyebrow-centered">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
            Buy it once. <span className="heading-accent">Keep it forever.</span>
          </h2>
          <div className="heading-underline" />
          <p className="text-slate-500 dark:text-dark-400 text-lg">
            Every Eskai is shipped on a device we configure for you — it arrives ready to work.
            There is no monthly subscription. After the one-time price, you only pay for the AI
            tokens it actually uses.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${
                tier.highlighted
                  ? "glass border-brand-500/30 ring-1 ring-brand-500/40 shadow-lg shadow-brand-500/5"
                  : "glass border-slate-200 dark:border-dark-700/30"
              }`}
            >
              {/* Badges — inline so every card's top edge lines up */}
              <div className="flex flex-wrap gap-2 mb-5 min-h-[26px]">
                {tier.badges.map((badge, bi) => (
                  <span
                    key={bi}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      tier.highlighted && bi === tier.badges.length - 1
                        ? "bg-brand-600 text-white"
                        : "bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20"
                    }`}
                  >
                    {tier.highlighted && bi === tier.badges.length - 1 ? (
                      <Star className="w-3 h-3" />
                    ) : (
                      <Cpu className="w-3 h-3" />
                    )}
                    {badge}
                  </span>
                ))}
              </div>

              {/* Header — fixed height so price rows align across cards */}
              <div className="mb-4 min-h-[72px]">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{tier.name}</h3>
                <p className="text-sm text-slate-500 dark:text-dark-400 mt-1">{tier.forWho}</p>
              </div>

              {/* Price — fixed height so feature lists start at the same y */}
              <div className="mb-6 min-h-[52px] flex items-center">
                {tier.price ? (
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">
                      <span className="text-brand-600 dark:text-brand-400">$</span>
                      {tier.price}
                    </span>
                    <span className="text-slate-500 dark:text-dark-400 text-sm">one-time</span>
                    {tier.priceNote && (
                      <span className="text-slate-400 dark:text-dark-500 text-xs w-full">{tier.priceNote}</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      <span className="text-brand-600 dark:text-brand-400">Custom</span>
                    </span>
                    {tier.priceNote && (
                      <span className="text-slate-500 dark:text-dark-400 text-sm">{tier.priceNote}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-1">
                {tier.features.map((feat, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-slate-600 dark:text-dark-300">
                    <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Running costs */}
              <div className="space-y-2 mb-6 pt-5 border-t border-slate-200 dark:border-dark-700/30">
                <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-dark-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="text-slate-600 dark:text-dark-300">Care Plan</span> {tier.carePlan}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-dark-400">
                  <Coins className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                  <span>{tier.running}</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={tier.href}
                className={`inline-flex items-center justify-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  tier.highlighted
                    ? "bg-brand-600 hover:bg-brand-500 text-white glow-sm"
                    : "glass glass-hover text-slate-800 dark:text-dark-200"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
{/* How the cost works */}
        <div className="mt-10 glass rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-dark-700/30">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-8">
            What you actually pay
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {costParts.map((part) => (
              <div key={part.title} className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500/10 to-emerald-500/10 border border-brand-500/20 flex items-center justify-center">
                  <part.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{part.title}</h4>
                <p className="text-sm text-slate-500 dark:text-dark-400 leading-relaxed">{part.desc}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-dark-700 to-transparent my-8" />

          <div className="flex items-start gap-3 max-w-3xl mx-auto">
            <Wallet className="w-4 h-4 text-brand-500 shrink-0 mt-1" />
            <p className="text-sm text-slate-500 dark:text-dark-400">
              Stop topping up whenever you like. Your device, your information and everything it
              has learned stay yours — it keeps working offline, with no subscription and nothing
              to cancel. If you ever want help, we&apos;re on WhatsApp.
            </p>
          </div>
        </div>

        {/* Affordability */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-400 dark:text-dark-500">
            Pay with mobile money, card or bank transfer · Pay in 3 available · 14-day money-back
            · In Kampala we deliver and set it up with you, and we ship worldwide.
          </p>
          <p className="text-xs text-slate-400 dark:text-dark-600 mt-2">
            The one-time price covers the device, configuration, setup and delivery — no licence
            fees, no hidden extras.
          </p>
        </div>
      </div>
    </section>
  )
}