import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // De CMS login hoeft niet op Google
    },
    sitemap: 'https://www.spannenburg.art/sitemap.xml',
  }
}
