import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Eskai — Your AI Business Operating System",
  description:
    "Eskai is the first AI Operating System for your business. It knows you, watches your operations, executes your tasks, and runs strategic planning cycles to make your business smarter over time. Built by Eskaen Technologies.",
  keywords: [
    "AI assistant", "business automation", "AI operations", "Eskai",
    "Eskaen Technologies", "AI agent", "business OS", "artificial intelligence",
  ],
  openGraph: {
    title: "Eskai — Your AI Business Operating System",
    description:
      "The first AI Operating System for your business. Self-aware. Autonomous. Strategic.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
