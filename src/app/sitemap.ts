import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.spannenburg.art'

  // 1. Haal alle slugs op uit Sanity (Pagina's en Artiesten)
  const pages = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)].slug.current`
  )
  const artists = await client.fetch<string[]>(
    `*[_type == "artist" && defined(slug.current)].slug.current`
  )
  
  // 2. Bouw de URL lijst voor Pagina's
  const routes = pages.map((slug) => ({
    url: `${baseUrl}/${slug === '/' ? '' : slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: slug === '/' ? 1.0 : 0.8,
  }))

  // 3. Bouw de URL lijst voor Artiesten
  const artistRoutes = artists.map((slug) => ({
    url: `${baseUrl}/artists/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // 4. Combineer alles (Vergeet hardcoded routes niet als je die hebt)
  return [
    ...routes,
    ...artistRoutes,
    // Voeg hier later handmatig routes toe als ze niet in Sanity staan, bijv:
    // { url: `${baseUrl}/artworks`, lastModified: new Date() },
  ]
}
