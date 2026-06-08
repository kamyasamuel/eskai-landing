"use client"

import { useState } from "react"
import { Menu, X, Cpu } from "lucide-react"

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Apply", href: "#apply" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-brand-500/25 transition-all duration-300">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Eskai
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-dark-400 hover:text-brand-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#apply"
              className="text-sm px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all duration-200 glow-sm"
            >
              Get Early Access
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-all"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-dark-800/50 bg-dark-900/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm text-dark-400 hover:text-brand-400 transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#apply"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all"
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
