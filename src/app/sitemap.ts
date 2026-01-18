import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.spannenburg.art'

  // 1. Haal alle slugs op uit Sanity
  const pages = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)].slug.current`
  )
  const artists = await client.fetch<string[]>(
    `*[_type == "artist" && defined(slug.current)].slug.current`
  )
  // Voeg hier later artworks/journal aan toe

  // 2. Maak de lijst
  const routes = pages.map((slug) => ({
    url: `${baseUrl}/${slug === '/' ? '' : slug}`,
    lastModified: new Date(),
  }))

  const artistRoutes = artists.map((slug) => ({
    url: `${baseUrl}/artists/${slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: baseUrl, lastModified: new Date() }, // Homepage
    ...routes,
    ...artistRoutes,
  ]
}
