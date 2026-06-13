"use client"

import { Heart } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-white.svg"
                alt="Eskai logo"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-white">
                <span className="text-brand-400">e</span>skai
              </span>
            </div>
            <p className="text-sm text-dark-400 max-w-md leading-relaxed">
              The first AI Operating System for your business. Built by{" "}
              <a
                href="https://eskaen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 transition-colors"
              >
                Eskaen Technologies
              </a>
              . <span className="text-blue-400">Self-aware</span>.{" "}
              <span className="text-green-400">Autonomous</span>.{" "}
              <span className="text-yellow-300">Strategic</span>.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-dark-200 uppercase tracking-wider">Product</h4>
            <div className="space-y-2">
              <a
                href="#how-it-works"
                className="block text-sm text-dark-400 hover:text-brand-400 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#features"
                className="block text-sm text-dark-400 hover:text-blue-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-sm text-dark-400 hover:text-green-400 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#apply"
                className="block text-sm text-dark-400 hover:text-yellow-300 transition-colors"
              >
                Early Access
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-dark-200 uppercase tracking-wider">Company</h4>
            <div className="space-y-2">
              <a
                href="https://eskaen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-dark-400 hover:text-brand-400 transition-colors"
              >
                Eskaen Technologies
              </a>
              <a
                href="https://bio.eskaen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-dark-400 hover:text-green-400 transition-colors"
              >
                BioThrive
              </a>
              <a
                href="mailto:kamyasamuel@eskaen.com"
                className="block text-sm text-dark-400 hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-600">
            &copy; {new Date().getFullYear()} Eskaen Technologies Ltd. All rights reserved.
          </p>
          <p className="text-xs text-dark-600 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500/70" /> by a founder who needed this
          </p>
        </div>
      </div>
    </footer>
  )
}