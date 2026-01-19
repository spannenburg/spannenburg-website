import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import Modules from '@/components/Modules'

// 1. DE GECORRIGEERDE QUERY
// Matched nu exact met je backend schema namen
const PAGE_QUERY = `
  *[_type == "page" && (slug.current == $slug || ($slug == '/' && slug.current == 'home'))][0]{
    title,
    seoTitle,
    metaDescription,
    "ogImage": socialImage.asset->url,
    modules[]{
      ...,
      
      // Fix voor Image en Hero modules
      bgImage{ ..., asset->{url} },
      image{ ..., asset->{url} },

      // Fix voor het Artwork Grid (matchen met artwork.ts schema)
      artworks[]->{
        _id,
        title,
        "slug": slug.current,
        // We halen de prijs uit de eerste editie voor het geval je die later toch wilt tonen
        "price": editions[0].price,
        availability,
        "artistName": artist->name,
        // CRUCIAAL: mainImage gebruiken in plaats van photos[0]
        "imageUrl": mainImage.asset->url
      }
    }
  }
`

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)].slug.current`
  )
  return slugs.map((slug) => ({ slug: slug.split('/') }))
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const slugString = slug ? slug.join('/') : '/'

  const page = await client.fetch(PAGE_QUERY, { slug: slugString })

  if (!page) {
    if (slugString === '/') {
       return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 font-sans text-gray-900">
          <h1 className="text-3xl font-light uppercase tracking-widest mb-4">Spannenburg.Art Setup</h1>
          <div className="bg-gray-50 p-8 border border-gray-200 text-left max-w-md">
            <p className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-400">Todo in Sanity Studio:</p>
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600">
              <li>Maak een pagina aan met de titel <strong>Home</strong>.</li>
              <li>Zorg dat de slug <strong>home</strong> is (of laat hem leeg voor /).</li>
              <li>Voeg je modules toe (Hero, Artwork Grid, etc).</li>
              <li>Vergeet niet op <strong>Publish</strong> te klikken.</li>
            </ul>
          </div>
        </div>
       )
    }
    notFound()
  }

  return <Modules modules={page?.modules} />
}

// 4. GECORRIGEERDE METADATA FUNCTIE
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  const slugString = slug ? slug.join('/') : '/'

  // We halen specifiek de SEO velden op die je in page.ts hebt gedefinieerd
  const page = await client.fetch(
    `*[_type == "page" && (slug.current == $slug || ($slug == '/' && slug.current == 'home'))][0]{ 
      title, 
      seoTitle, 
      metaDescription, 
      "ogImage": socialImage.asset->url 
    }`, 
    { slug: slugString }
  )

  if (!page) return {}

  return {
    // Gebruik seoTitle als die er is, anders de gewone paginatitel
    title: page.seoTitle || page.title || 'Spannenburg.Art',
    description: page.metaDescription,
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.metaDescription,
      images: page.ogImage ? [{ url: page.ogImage }] : [],
    },
  }
}
