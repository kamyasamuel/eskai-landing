"use client"

import { useState, useRef } from "react"
import { trackEvent } from "@/lib/track"
import { Send, CheckCircle, Loader2 } from "lucide-react"

type FormData = {
  fullName: string
  email: string
  phone: string
  company: string
  role: string
  employees: string
  location: string
  plan: string
  payment: string
  interest: string[]
  useCase: string
  currentTools: string
  referral: string
  agree: boolean
}

const interestOptions = [
  "Invoices, quotes & documents",
  "Stock & sales records",
  "Marketing & social posts",
  "Customer replies & follow-ups",
  "Reports & paperwork",
  "Farming / agriculture",
  "Research & suppliers",
  "Something else",
]

const planOptions = [
  "Personal — $199",
  "Business — $599",
  "Custom / several branches",
  "Not sure yet",
]

const paymentOptions = [
  "Mobile money",
  "Card",
  "Bank transfer",
  "Pay in 3",
  "Not sure yet",
]

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  employees: "",
  location: "",
  plan: "",
  payment: "",
  interest: [],
  useCase: "",
  currentTools: "",
  referral: "",
  agree: false,
}

const fieldLabels: Record<string, string> = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone / WhatsApp",
  company: "Company / organization",
  role: "Your role",
  employees: "Team size",
  location: "Location",
  plan: "Plan interest",
  payment: "Payment preference",
  useCase: "What you want it to do",
  currentTools: "Current tools",
  referral: "How you heard about us",
  interest: "Interests",
}

function formatValidationMessage(
  headline: string,
  details: Record<string, string[]>
): string {
  const lines = Object.entries(details)
    .filter(([, messages]) => Array.isArray(messages) && messages.length > 0)
    .map(([field, messages]) => {
      const label = fieldLabels[field] || field
      const text = messages
        .map((m) =>
          m.replace(
            /^String must contain at most (\d+) character\(s\)$/,
            "must be at most $1 characters"
          )
        )
        .join(", ")
      return `\u2022 ${label}: ${text}`
    })
  if (lines.length === 0) return headline
  return `${headline}\n${lines.join("\n")}`
}

export default function ApplicationForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const startedRef = useRef(false)

  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackEvent("form_start", { step: 1 })
  }

  const update = (field: keyof FormData, value: any) => {
    markStarted()
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleInterest = (item: string) => {
    setForm((prev) => ({
      ...prev,
      interest: prev.interest.includes(item)
        ? prev.interest.filter((i) => i !== item)
        : [...prev.interest, item],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.agree) return

    setSubmitting(true)
    setError("")

    try {
      // Plan / location / payment are folded into the existing `interest` list so the
      // database schema (fixed columns, no migration runner) does not need changing.
      const tags = [
        form.plan ? `Plan: ${form.plan}` : "",
        form.location ? `Location: ${form.location}` : "",
        form.payment ? `Payment: ${form.payment}` : "",
      ].filter(Boolean)

      const payload = {
        ...form,
        interest: [...form.interest, ...tags],
      }

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const contentType = res.headers.get("content-type") || ""
        let message = "Submission failed. Please try again."
        let details: Record<string, string[]> | undefined

        if (contentType.includes("application/json")) {
          const data = await res.json().catch(() => null)
          if (data?.error) message = data.error
          if (data?.details) details = data.details
        } else {
          // Non-JSON response — almost always a Cloudflare security block (403/1010)
          message =
            "Your submission was blocked by a security check. Please try again in Chrome or Safari, or turn off your VPN / ad blocker."
        }

        trackEvent("form_submit", {
          success: false,
          reason:
            res.status === 409
              ? "duplicate"
              : res.status === 403
                ? "blocked"
                : "error",
          interests: form.interest.length,
        })

        if (details) {
          throw new Error(formatValidationMessage(message, details))
        }
        throw new Error(message)
      }

      setSubmitted(true)
      trackEvent("form_submit", {
        success: true,
        interests: form.interest.length,
        emailDomain: form.email.split("@")[1] || "",
        company: form.company ? true : false,
        referral: form.referral || "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="apply" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-brand-950/10 to-dark-950" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-2xl p-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-brand-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Got it. <span className="heading-accent">We&apos;ll be in touch.</span>
            </h2>
            <p className="text-dark-400 text-lg">
              Thank you — your details are with us. We&apos;ll get back to you within 48 hours on
              WhatsApp or email to confirm your Eskai, arrange delivery, and answer anything you
              want to ask.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-brand-950/10 to-dark-950" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="eyebrow eyebrow-centered">
            Reserve Yours
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug tracking-tight">
            Tell us what you&apos;d like <span className="heading-accent">it to do.</span>
          </h2>
          <div className="heading-underline" />
          <p className="text-dark-400 text-lg">
            We ship in small batches so every Eskai can be set up properly. Answer a few plain
            questions — no technical detail needed — and we&apos;ll come back to you within 48
            hours to arrange everything.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-10 border border-dark-700/30">
          {/* Error banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 whitespace-pre-line">
              {error}
            </div>
          )}

          {/* Progress steps */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= s
                      ? "bg-brand-600 text-white"
                      : "bg-dark-800 text-dark-500"
                  }`}
                >
                  {s}
                </div>
                <div
                  className={`h-px flex-1 transition-all duration-300 ${
                    step > s ? "bg-brand-600" : "bg-dark-700"
                  }`}
                />
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1 — Basic Info */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-xl font-semibold text-white">
                  About <span className="heading-accent">you</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      maxLength={200} placeholder="Kamya Samuel"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      maxLength={254} placeholder="kamya@eskaen.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      maxLength={50} placeholder="+256 700 000 000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Where are you? (city & country)</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      maxLength={120} placeholder="Kampala, Uganda"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Business / Organization <span className="text-dark-500">(optional)</span></label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      maxLength={200} placeholder="Eskaen Technologies"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">How many people work with you?</label>
                    <select
                      value={form.employees}
                      onChange={(e) => update("employees", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                    >
                      <option value="">Select...</option>
                      <option value="1">Just me</option>
                      <option value="2-5">2-5 people</option>
                      <option value="6-20">6-20 people</option>
                      <option value="21-50">21-50 people</option>
                      <option value="51+">51+ people</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-dark-300 font-medium">What do you do? <span className="text-dark-500">(optional)</span></label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                    maxLength={200} placeholder="I run a shop / a farm / a clinic / a consultancy…"
                  />
                </div>
              </div>
            )}

            {/* Step 2 — Interests */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-xl font-semibold text-white">
                  What do you need <span className="heading-accent">help with?</span>
                </h3>
                <p className="text-sm text-dark-400">
                  Pick everything that sounds like your week — you can change your mind later.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {interestOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item)}
                      className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm ${
                        form.interest.includes(item)
                          ? "bg-brand-600/10 border-brand-500/30 text-brand-300"
                          : "bg-dark-800 border-dark-700 text-dark-400 hover:border-dark-600"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-dark-300 font-medium">
                    Which one are you thinking about?
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {planOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => update("plan", form.plan === item ? "" : item)}
                        className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm ${
                          form.plan === item
                            ? "bg-brand-600/10 border-brand-500/30 text-brand-300"
                            : "bg-dark-800 border-dark-700 text-dark-400 hover:border-dark-600"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-dark-300 font-medium">
                    What would you like it to do? *
                  </label>
                  <textarea
                    required
                    value={form.useCase}
                    onChange={(e) => update("useCase", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                    maxLength={2000} placeholder="In your own words — e.g. 'I run a shop and spend my evenings writing invoices and chasing suppliers. I'd like it to handle that.'"
                  />
                </div>
              </div>
            )}

            {/* Step 3 — Tools & Final */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-xl font-semibold text-white">
                  <span className="heading-accent">Last bit</span> — then we&apos;re done
                </h3>

                <div className="space-y-2">
                  <label className="text-sm text-dark-300 font-medium">
                    How would you prefer to pay?
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {paymentOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => update("payment", form.payment === item ? "" : item)}
                        className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm ${
                          form.payment === item
                            ? "bg-brand-600/10 border-brand-500/30 text-brand-300"
                            : "bg-dark-800 border-dark-700 text-dark-400 hover:border-dark-600"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-dark-300 font-medium">
                    Anything you already use that it should work with? <span className="text-dark-500">(optional)</span>
                  </label>
                  <textarea
                    value={form.currentTools}
                    onChange={(e) => update("currentTools", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                    maxLength={1000} placeholder="e.g., Excel, WhatsApp, QuickBooks, a supplier portal, paper records…"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-dark-300 font-medium">
                    How did you hear about Eskai?
                  </label>
                  <input
                    type="text"
                    value={form.referral}
                    onChange={(e) => update("referral", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                    maxLength={200} placeholder="Twitter, friend, article, etc."
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => update("agree", e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-dark-600 bg-dark-800 text-brand-600 focus:ring-brand-500/20"
                  />
                  <span className="text-sm text-dark-400 group-hover:text-dark-300 transition-colors">
                    I agree to the Eskai terms and privacy policy. I understand Eskai ships
                    in small batches, and I&apos;ll share feedback to help shape it. *
                  </span>
                </label>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-dark-700/30">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm text-dark-300 hover:text-white bg-dark-800 hover:bg-dark-700 transition-all"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    markStarted()
                    setStep(step + 1)
                  }}
                  className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!form.agree || submitting}
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}