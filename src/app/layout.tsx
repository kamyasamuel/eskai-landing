import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Eskai — Self-Hosted AI Agent for ARM Devices",
  description:
    "Eskai is a self-hosted AI agent that runs on cheap ARM hardware — Raspberry Pi, Android tablets, and phones. Autonomous, private, and extremely affordable. No cloud compute bills, no vendor lock-in.",
  keywords: [
    "self-hosted AI", "AI agent", "ARM AI", "Raspberry Pi AI", "private AI",
    "business automation", "AI operations", "Eskai", "Eskaen Technologies",
    "autonomous agent", "edge AI", "on-device AI",
  ],
  openGraph: {
    title: "Eskai — Self-Hosted AI Agent for ARM Devices",
    description:
      "Your autonomous AI agent that runs on $35 ARM hardware. Private. Affordable. Yours.",
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