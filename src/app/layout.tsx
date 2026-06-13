import type { Metadata } from "next"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eskai.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eskai — Self-Hosted AI Agent for ARM Devices",
  description:
    "Eskai is a self-hosted AI agent that runs on cheap ARM hardware — Raspberry Pi, Android tablets, and phones. Autonomous, private, and extremely affordable. No cloud compute bills, no vendor lock-in.",
  keywords: [
    "self-hosted AI", "AI agent", "ARM AI", "Raspberry Pi AI", "private AI",
    "business automation", "AI operations", "Eskai", "Eskaen Technologies",
    "autonomous agent", "edge AI", "on-device AI",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Eskai — Self-Hosted AI Agent for ARM Devices",
    description:
      "Your autonomous AI agent that runs on $35 ARM hardware. Private. Affordable. Yours.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Eskai logo",
      },
    ],
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