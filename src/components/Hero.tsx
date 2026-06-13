"use client"

import { ArrowRight, Cpu, Shield, Smartphone, HardDrive } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/20 via-dark-950 to-dark-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm text-brand-300 border border-brand-800/30">
              <Cpu className="w-3.5 h-3.5" />
              <span>Self-hosted · Runs on $35 ARM hardware</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Your{" "}
              <span className="text-gradient">Self-Hosted</span>
              <br />
              <span className="text-gradient">AI Agent</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-dark-300 leading-relaxed max-w-lg">
              An autonomous AI agent that runs on your own hardware. No cloud, no data leaks, no recurring bills.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#apply"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-sm sm:text-base text-white font-semibold transition-all duration-200 glow hover:glow-sm"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-sm sm:text-base text-dark-200 font-semibold transition-all duration-200"
              >
                How It Works
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-dark-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-brand-500" />
                Your data stays on your hardware
              </span>
              <span className="flex items-center gap-1.5">
                No recurring compute costs
              </span>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="hidden lg:flex items-center justify-center animate-float">
            <div className="relative">
              {/* Logo watermark */}
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10 pointer-events-none">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={128}
                  height={128}
                  aria-hidden="true"
                />
              </div>

              {/* Main card */}
              <div className="w-[420px] rounded-2xl glass border border-dark-700/50 p-6 space-y-4">
                {/* Terminal header */}
                <div className="flex items-center gap-2 pb-3 border-b border-dark-700/30">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs text-dark-500 ml-2 font-mono">eskai@terminal:~$</span>
                </div>

                {/* Terminal lines */}
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-brand-400 shrink-0">$</span>
                    <span className="text-dark-200">eskai.whoami()</span>
                  </div>
                  <div className="pl-5 text-dark-400">
                    <span className="text-brand-300">→</span>{" "}
                    <span>"Eskai v1.2.0 — Personal AI Assistant to Kamya Samuel"</span>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <span className="text-brand-400 shrink-0">$</span>
                    <span className="text-dark-200">eskai.introspect()</span>
                  </div>
                  <div className="pl-5 space-y-1 text-dark-400">
                    <div><span className="text-brand-300">→</span> status: <span className="text-green-400">operational</span></div>
                    <div><span className="text-brand-300">→</span> memory: <span className="text-blue-400">active</span></div>
                    <div><span className="text-brand-300">→</span> sensors: <span className="text-blue-400">6/6 online</span></div>
                    <div><span className="text-brand-300">→</span> self-repair: <span className="text-blue-400">engaged</span></div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <span className="text-brand-400 shrink-0">$</span>
                    <span className="text-dark-200">eskai.analyze_operations("biothrive")</span>
                  </div>
                  <div className="pl-5 text-dark-400">
                    <span className="text-brand-300">→</span>{" "}
                    <span className="text-yellow-300">4 directives active</span> ·{" "}
                    <span className="text-green-400">87% completion</span> ·{" "}
                    <span className="text-blue-400">2 dream cycles completed</span>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <span className="text-brand-400 shrink-0">$</span>
                    <span className="text-dark-200 animate-pulse">_</span>
                  </div>
                </div>
              </div>

              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 via-emerald-500/20 to-brand-500/20 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-600">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-dark-700 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-dark-500 animate-bounce" />
        </div>
      </div>
    </section>
  )
}