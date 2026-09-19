import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eskai.eskaen.com'

/**
 * The landing page is a single route. The marketing anchors (#pricing,
 * #how-it-works, #apply) are fragments of the same URL and cannot be indexed
 * as separate pages, so they are intentionally not listed here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
