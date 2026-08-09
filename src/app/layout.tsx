import type { Metadata } from "next"
import "./globals.css"
import TrackingProvider from "@/components/TrackingProvider"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eskai.eskaen.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eskai Ops — Your business runs itself. You just watch it happen.",
  description:
    "Eskai Ops is the AI operations agent that runs your recurring business tasks, watches your systems, and reports to you on Telegram. No dashboard to babysit. No tickets. Just outcomes.",
  keywords: [
    "AI operations", "AI agent", "business automation", "Telegram automation",
    "uptime monitoring", "Eskai Ops", "Eskai", "Eskaen Technologies",
    "autonomous agent", "ops engineer", "recurring tasks automation",
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
    title: "Eskai Ops — Your business runs itself. You just watch it happen.",
    description:
      "The AI operations agent that runs your recurring business tasks, watches your systems, and reports to you on Telegram.",
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
      <body>
        <TrackingProvider>{children}</TrackingProvider>
      </body>
    </html>
  )
}
