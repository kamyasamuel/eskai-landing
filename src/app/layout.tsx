import type { Metadata } from "next"
import "./globals.css"
import TrackingProvider from "@/components/TrackingProvider"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eskai.eskaen.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eskai — Your Own AI Assistant, Delivered Ready to Use",
  description:
    "Eskai is an AI assistant that arrives already set up on a device you own. It writes your documents and invoices, chases follow-ups, watches your systems and reports to you on Telegram — and your information never leaves your office. Buy once, no subscription.",
  keywords: [
    "AI assistant", "private AI", "on-device AI", "business automation",
    "AI for small business", "invoice automation", "document automation",
    "self-hosted AI", "buy once AI", "AI for shops and farms",
    "Eskai", "Eskaen Technologies",
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
    title: "Eskai — Your Own AI Assistant, Delivered Ready to Use",
    description:
      "It arrives set up on a device you own. It does the paperwork, remembers everything, and keeps your information in your office. Buy once — no subscription.",
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
