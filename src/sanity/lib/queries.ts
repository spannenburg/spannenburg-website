import { defineQuery } from 'next-sanity'
import { sanityFetch } from './live'

// 1. De functie om gewone pagina's op te halen (Home, Over ons, etc.)
export const getPage = async ({ slug }: { slug?: string[] }) => {
  // Als er geen slug is, bedoelen we de homepage ('index')
  const targetSlug = slug ? slug.join('/') : 'index'

  const query = defineQuery(`
    *[_type == "page" && metadata.slug.current == $targetSlug][0]{
      _id,
      _type,
      title,
      modules[]{
        ...,
        _type == 'hero' => {
          ...,
          image {
            ...,
            asset->
          }
        }
      },
      metadata
    }
  `)

  return await sanityFetch({ query, params: { targetSlug } })
}

// 2. De functie om blog posts op te halen (DIT MISTE JE)
export const getPost = async ({ slug }: { slug?: string[] }) => {
  const targetSlug = slug ? slug.join('/') : ''

  const query = defineQuery(`
    *[_type == "post" && metadata.slug.current == $targetSlug][0]{
      _id,
      _type,
      title,
      modules, // Hier halen we de inhoud van de blog op
      metadata,
      date,
      author->{
        name,
        image
      }
    }
  `)

  return await sanityFetch({ query, params: { targetSlug } })
}

// 3. De functie om ALLE posts op te halen (voor lijstjes)
export const getPosts = async () => {
  const query = defineQuery(`
    *[_type == "post"] | order(date desc) {
      _id,
      title,
      metadata,
      date
    }
  `)
  
  return await sanityFetch({ query, params: {} })
}
