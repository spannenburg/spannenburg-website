import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PortableText } from "next-sanity"

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // 1. DE QUERY
  // We halen de data op die past bij jouw Schema (artwork.ts)
  // - mainImage: De hoofdfoto
  // - dateCreated: De datum (waar we het jaar uit halen)
  // - description: De uitgebreide tekst (Rich Text)
  // - editions: We kijken in de eerste editie voor prijs/afmeting (aanname op basis van schema)
  // - material: We halen de naam op van het gekoppelde materiaal
  const artwork = await client.fetch(`
    *[_type == "artwork" && slug.current == $slug][0]{
      title,
      "artistName": artist->name,
      description,
      dateCreated,
      
      // Data uit de 'editions' en 'material' groepen halen
      // (Als deze velden leeg blijven, checken we later of we ze anders moeten aanroepen)
      price, 
      availability, 
      medium, 
      dimensions,

      // De afbeelding fix:
      "imageUrl": mainImage.asset->url
    }
  `, { slug })

  if (!artwork) notFound()

  // 2. DATA VOORBEREIDING
  // Het jaartal uit de datum halen (bijv "2024-01-01" wordt "2024")
  const year = artwork.dateCreated ? new Date(artwork.dateCreated).getFullYear() : null

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Terug knop */}
      <Link href="/artworks" className="text-sm text-gray-500 hover:text-black mb-8 inline-block">
        ← Back to all artworks
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* KOLOM 1: AFBEELDING */}
        <div className="bg-gray-50 aspect-[4/5] relative">
          {artwork.imageUrl ? (
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image Found
            </div>
          )}
        </div>

        {/* KOLOM 2: INFORMATIE */}
        <div>
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">{artwork.title}</h1>
          
          {artwork.artistName && (
            <p className="text-xl text-gray-600 mb-6">{artwork.artistName}</p>
          )}

          {/* Details Lijst */}
          <div className="space-y-4 text-gray-800 border-t border-gray-200 pt-6">
             {/* Prijs (Alleen als niet verkocht) */}
             {artwork.price && artwork.availability !== 'sold' && (
               <p className="text-2xl font-medium">€ {artwork.price}</p>
             )}
             
             {/* Sold Badge */}
             {artwork.availability === 'sold' && (
               <p className="text-xl font-bold text-red-600 uppercase">Sold</p>
             )}

             {/* Specificaties */}
             {artwork.medium && (
               <p><span className="font-bold text-sm uppercase tracking-wide text-gray-500 w-24 inline-block">Medium:</span> {artwork.medium}</p>
             )}
             {artwork.dimensions && (
               <p><span className="font-bold text-sm uppercase tracking-wide text-gray-500 w-24 inline-block">Size:</span> {artwork.dimensions}</p>
             )}
             {year && (
               <p><span className="font-bold text-sm uppercase tracking-wide text-gray-500 w-24 inline-block">Year:</span> {year}</p>
             )}
          </div>

          {/* Beschrijving (Met PortableText voor alinea's) */}
          {artwork.description && (
            <div className="mt-8 prose prose-sm text-gray-600">
              <PortableText value={artwork.description} />
            </div>
          )}
          
          {/* Contact Knop */}
          <div className="mt-10">
             <Link href="/contact" className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">
               Inquire about this work
             </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
