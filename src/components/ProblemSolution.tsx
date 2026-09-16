"use client"

import { Cloud, FileText, MessageSquare, RefreshCw, Shield, Target, TrendingUp, Users } from "lucide-react"

const painPoints = [
  {
    icon: FileText,
    problem: "Your evenings disappear into invoices, receipts and reports",
    solution: <>Eskai writes them — quotes, invoices, reports and letters, <span className="text-green-700 dark:text-green-400">formatted and ready to send</span>. You check and forward.</>,
  },
  {
    icon: MessageSquare,
    problem: "You run your business across WhatsApp, a notebook and three spreadsheets",
    solution: <>One <span className="text-brand-600 dark:text-brand-400">simple chat</span> handles orders, stock, reminders and customer replies — and it remembers the whole conversation.</>,
  },
  {
    icon: RefreshCw,
    problem: "You explain the same things over and over — to staff, to suppliers, to new hires",
    solution: <>Eskai <span className="text-blue-700 dark:text-blue-400">remembers everything</span> — your customers, suppliers, prices and how you like things done. Say it once, ever.</>,
  },
  {
    icon: Target,
    problem: "You don't really know what's getting done, or who's waiting on you",
    solution: <>It keeps one plain list: <span className="text-yellow-600 dark:text-yellow-300">what's finished</span>, <span className="text-red-600 dark:text-red-400">what's stuck</span>, and what it handled while you slept.</>,
  },
  {
    icon: TrendingUp,
    problem: "Decisions get made without the numbers in front of you",
    solution: <>Overnight it reads your records and hands you a <span className="text-green-700 dark:text-green-400">short, plain plan</span> each morning — sales, stock, what to do next.</>,
  },
  {
    icon: Users,
    problem: "You can't justify hiring an office admin just for the paperwork",
    solution: <><span className="text-brand-600 dark:text-brand-400">$199 once</span> — not a salary, not a monthly bill. One payment that costs less than a month of a clerk&apos;s pay.</>,
  },
  {
    icon: Cloud,
    problem: "AI tools want to bill you every month, forever",
    solution: <>Eskai is <span className="text-green-700 dark:text-green-400">bought, not rented.</span> The device is yours — the only running cost is the AI tokens it uses, and you can bring your own.</>,
  },
  {
    icon: Shield,
    problem: "Your business information sits on servers you don't control",
    solution: <><span className="text-green-700 dark:text-green-400">It stays on your device</span>, in your office. Unplug the internet and it keeps working with everything it has learned.</>,
  },
]

export default function ProblemSolution() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 via-white to-slate-50 dark:from-dark-950 dark:via-dark-900/50 dark:to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="eyebrow eyebrow-centered">
            The Problem We Solve
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
            AI that <span className="heading-accent">actually runs</span> the work
          </h2>
          <div className="heading-underline" />
          <p className="text-slate-500 dark:text-dark-400 text-lg">
            Most AI tools wait for you to ask, then hand you an answer you still have to act on.
            Eskai is different: it does the work, remembers everything, and tells you what
            happened — like an employee who never forgets and never sleeps.
          </p>
        </div>

        {/* Pain/Solution grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="group rounded-xl glass glass-hover p-6 space-y-4 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Problem — icon inline with label */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 transition-all duration-300">
                    <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-red-400/80 mb-1">Problem</div>
                    <p className="text-slate-800 dark:text-dark-200 font-medium">{item.problem}</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-brand-500/20 via-brand-500/10 to-transparent" />

                <div>
                  <div className="text-xs uppercase tracking-wider text-green-400/80 mb-1">Solution</div>
                  <p className="text-slate-600 dark:text-dark-300">{item.solution}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}