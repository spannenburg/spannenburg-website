import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
// We importeren JOUW nieuwe modules manager
import Modules from '@/components/Modules'

// 1. DE NIEUWE QUERY (AANGEPAST)
// Verschil met jouw oude code: Het stukje "|| ($slug == '/' && slug.current == 'home')"
// Dit zorgt ervoor dat de homepage werkt, ongeacht of je hem '/' of 'home' noemt in Sanity.
const PAGE_QUERY = `
  *[_type == "page" && (slug.current == $slug || ($slug == '/' && slug.current == 'home'))][0]{
    title,
    metadata,
    modules[]{
      ...,
      
      // Specifiek voor HERO & IMAGE
      bgImage{ ..., asset->{url} },
      image{ ..., asset->{url} },

      // Specifiek voor KUNST GRID (Details ophalen!)
      artworks[]->{
        _id,
        title,
        "slug": slug.current,
        price,
        availability,
        "artistName": artist->name,
        "imageUrl": photos[0].asset->url
      }
    }
  }
`

// 2. GENERATE STATIC PARAMS
// (Identiek aan jouw oude code: zorgt voor snelle pagina's)
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)].slug.current`
  )
  return slugs.map((slug) => ({ slug: slug.split('/') }))
}

// 3. DE PAGINA ZELF
export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  
  // Maak van de losse stukjes URL één string. Geen slug = Homepage ('/')
  const slugString = slug ? slug.join('/') : '/'

  // Haal de data op met de verbeterde query
  const page = await client.fetch(PAGE_QUERY, { slug: slugString })

  if (!page) {
    // Speciale hulp voor de homepage setup
    if (slugString === '/') {
       return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 font-sans">
          <h1 className="text-3xl font-bold mb-4">Spannenburg.Art Setup</h1>
          <div className="bg-blue-50 text-blue-900 p-6 rounded-lg text-left max-w-md border border-blue-200">
            <p className="font-bold mb-2">Te doen in Sanity Studio:</p>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Zorg dat je een pagina hebt met titel <strong>Home</strong>.</li>
              {/* Hier is de tekst iets aangepast om aan te geven dat 'home' nu ook mag */}
              <li>De slug mag <strong>/</strong> OF <strong>home</strong> zijn.</li>
              <li>Voeg modules toe (Hero, Artwork Grid, etc).</li>
              <li>Klik op <strong>Publish</strong>.</li>
            </ul>
          </div>
        </div>
       )
    }
    notFound()
  }

  // Hier laden we JOUW modules in
  return <Modules modules={page?.modules} />
}

// 4. METADATA (SEO)
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  const slugString = slug ? slug.join('/') : '/'

  // Ook hier de query aangepast zodat de SEO titel ook werkt als de slug 'home' is
  const page = await client.fetch(
    `*[_type == "page" && (slug.current == $slug || ($slug == '/' && slug.current == 'home'))][0]{ title, metadata }`, 
    { slug: slugString }
  )

  if (!page) return {}

  return {
    title: page.title || 'Spannenburg.Art',
    description: page.metadata?.description,
  }
}
