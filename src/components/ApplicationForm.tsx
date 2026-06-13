"use client"

import { useState } from "react"
import { Send, CheckCircle, Loader2 } from "lucide-react"

type FormData = {
  fullName: string
  email: string
  phone: string
  company: string
  role: string
  employees: string
  interest: string[]
  useCase: string
  currentTools: string
  referral: string
  agree: boolean
}

const interestOptions = [
  "AI Personal Assistant",
  "Business Operations Automation",
  "Marketing & Content Creation",
  "Software Development",
  "Data Analysis & Research",
  "Agriculture / Agritech",
  "Customer Support",
  "Other",
]

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  employees: "",
  interest: [],
  useCase: "",
  currentTools: "",
  referral: "",
  agree: false,
}

export default function ApplicationForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const update = (field: keyof FormData, value: any) => {
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
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Submission failed")
      }

      setSubmitted(true)
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
            <h2 className="text-2xl font-bold text-white">Application Received!</h2>
            <p className="text-dark-400 text-lg">
              Thank you for your interest in Eskai. We'll review your application and
              get back to you within 48 hours with next steps for early access.
            </p>
            <div className="text-sm text-dark-500">
              In the meantime, check your inbox for a confirmation email.
            </div>
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
          <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-semibold">
            Early Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Apply for early access
          </h2>
          <p className="text-dark-400 text-lg">
            Eskai is currently in private beta. We're accepting a limited number of
            founders and teams who want to be the first to run their business with an AI
            Operating System.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-10 border border-dark-700/30">
          {/* Error banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
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
                <h3 className="text-xl font-semibold text-white">Tell us about yourself</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      placeholder="Kamya Samuel"
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
                      placeholder="kamya@eskaen.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      placeholder="+256 700 000 000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Company / Organization</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      placeholder="Eskaen Technologies"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Your Role *</label>
                    <input
                      type="text"
                      required
                      value={form.role}
                      onChange={(e) => update("role", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      placeholder="Founder & CEO"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-dark-300 font-medium">Team Size</label>
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
              </div>
            )}

            {/* Step 2 — Interests */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-xl font-semibold text-white">What interests you?</h3>
                <p className="text-sm text-dark-400">
                  Select all the ways you'd use Eskai.
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
                    Describe your use case *
                  </label>
                  <textarea
                    required
                    value={form.useCase}
                    onChange={(e) => update("useCase", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                    placeholder="Tell us how you envision using Eskai in your business. What problems do you want it to solve? What would make it invaluable to you?"
                  />
                </div>
              </div>
            )}

            {/* Step 3 — Tools & Final */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-xl font-semibold text-white">Almost there</h3>

                <div className="space-y-2">
                  <label className="text-sm text-dark-300 font-medium">
                    What tools do you currently use?
                  </label>
                  <textarea
                    value={form.currentTools}
                    onChange={(e) => update("currentTools", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                    placeholder="e.g., ChatGPT, Zapier, Notion, Asana, Google Docs, Telegram, email..."
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
                    placeholder="Twitter, friend, article, etc."
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
                    I agree to the Eskai early access terms and privacy policy. I understand
                    this is a private beta and I'll provide feedback to help shape the product. *
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
                  onClick={() => setStep(step + 1)}
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