import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://spannenburg-art.vercel.app'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Zodra je site online is, kunnen we hier automatisch je andere pagina's aan toevoegen.
    // Voor nu is dit genoeg om de error te stoppen.
  ]
}
