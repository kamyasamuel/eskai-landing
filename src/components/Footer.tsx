"use client"

import { Cpu, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Eskai</span>
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
              . Self-aware. Autonomous. Strategic.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-dark-200 uppercase tracking-wider">Product</h4>
            <div className="space-y-2">
              {["How It Works", "Features", "Pricing", "Early Access"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-sm text-dark-400 hover:text-brand-400 transition-colors"
                >
                  {link}
                </a>
              ))}
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
                className="block text-sm text-dark-400 hover:text-brand-400 transition-colors"
              >
                BioThrive
              </a>
              <a
                href="mailto:kamyasamuel@eskaen.com"
                className="block text-sm text-dark-400 hover:text-brand-400 transition-colors"
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
