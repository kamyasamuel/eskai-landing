"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import ThemeToggle from "./ThemeToggle"
import { useTheme } from "./ThemeProvider"

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Apply", href: "#apply" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/80 dark:border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Image
              src={theme === "dark" ? "/logo-white.svg" : "/logo.svg"}
              alt="Eskai logo"
              width={32}
              height={32}
              className="rounded-lg group-hover:shadow-lg group-hover:shadow-brand-500/25 transition-all duration-300"
            />
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              <span className="text-brand-600 dark:text-brand-400">e</span>skai
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const colors: Record<string, string> = {
                "How It Works": "hover:text-brand-700 dark:hover:text-brand-400",
                "Features": "hover:text-blue-700 dark:hover:text-blue-400",
                "Pricing": "hover:text-green-700 dark:hover:text-green-400",
                "Apply": "hover:text-yellow-700 dark:hover:text-yellow-300",
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm text-slate-500 dark:text-dark-400 ${colors[link.label] || "hover:text-brand-700 dark:hover:text-brand-400"} transition-colors duration-200`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="#apply"
              className="text-sm px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all duration-200 glow-sm"
            >
              Reserve Yours
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-slate-500 dark:text-dark-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-800 transition-all"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-slate-200/80 dark:border-dark-800/50 bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => {
              const colors: Record<string, string> = {
                "How It Works": "hover:text-brand-700 dark:hover:text-brand-400",
                "Features": "hover:text-blue-700 dark:hover:text-blue-400",
                "Pricing": "hover:text-green-700 dark:hover:text-green-400",
                "Apply": "hover:text-yellow-700 dark:hover:text-yellow-300",
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm text-slate-500 dark:text-dark-400 ${colors[link.label] || "hover:text-brand-700 dark:hover:text-brand-400"} transition-colors py-2`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="#apply"
              onClick={() => setOpen(false)}
              className="block w-fit mx-auto px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all"
            >
              Reserve Yours
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}