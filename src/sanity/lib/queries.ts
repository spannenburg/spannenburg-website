import { defineQuery } from 'next-sanity'
import { client } from './client'

// 1. De functie om gewone pagina's op te halen
export const getPage = async ({ slug }: { slug?: string[] }) => {
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

  // HIER ZAT DE FOUT: We gebruiken nu de standaard client.fetch
  return await client.fetch(query, { targetSlug })
}

// 2. De functie om blog posts op te halen
export const getPost = async ({ slug }: { slug?: string[] }) => {
  const targetSlug = slug ? slug.join('/') : ''

  const query = defineQuery(`
    *[_type == "post" && metadata.slug.current == $targetSlug][0]{
      _id,
      _type,
      title,
      modules,
      metadata,
      date,
      author->{
        name,
        image
      }
    }
  `)

  return await client.fetch(query, { targetSlug })
}

// 3. De functie om ALLE posts op te halen
export const getPosts = async () => {
  const query = defineQuery(`
    *[_type == "post"] | order(date desc) {
      _id,
      title,
      metadata,
      date
    }
  `)
  
  return await client.fetch(query)
}
