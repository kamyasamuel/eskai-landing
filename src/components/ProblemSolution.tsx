"use client"

import { Bot, Zap, Search, Shield, RefreshCw, Users } from "lucide-react"

const painPoints = [
  {
    icon: Bot,
    problem: "AI gives you answers but doesn't do the work",
    solution: "Eskai executes — sends emails, edits files, runs code, queries databases, deploys infrastructure",
  },
  {
    icon: Zap,
    problem: "You juggle 15 tools that don't talk to each other",
    solution: "Eskai connects 150+ capabilities in one unified interface with persistent context",
  },
  {
    icon: Search,
    problem: "Every conversation starts from zero — no memory, no context",
    solution: "Eskai remembers everything — facts, sessions, projects, relationships, preferences",
  },
  {
    icon: Shield,
    problem: "Your business has no system for tracking what gets done",
    solution: "Eskai's Business Command Center tracks directives, actors, outcomes, and strategy",
  },
  {
    icon: RefreshCw,
    problem: "You make decisions without enough data",
    solution: "Eskai's Dream Cycle synthesizes operations into strategic insights overnight",
  },
  {
    icon: Users,
    problem: "You can't afford a full operations team",
    solution: "Eskai Business at $99/month does the work of a $3,000/month operations manager",
  },
]

export default function ProblemSolution() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-semibold">
            The Problem We Solve
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            AI that actually runs your business
          </h2>
          <p className="text-dark-400 text-lg">
            Most AI tools are passive — they wait for you to ask. Eskai is active. It watches,
            remembers, executes, and strategizes. Like hiring a COO who never sleeps.
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
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/20 transition-all duration-300">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-red-400/80 mb-1">Problem</div>
                  <p className="text-dark-200 font-medium">{item.problem}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-brand-500/20 via-brand-500/10 to-transparent" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-green-400/80 mb-1">Solution</div>
                  <p className="text-dark-300">{item.solution}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
