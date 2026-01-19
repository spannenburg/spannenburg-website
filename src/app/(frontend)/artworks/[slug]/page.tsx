import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PortableText } from "next-sanity"

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // UPDATE: We halen nu de data specifiek uit de velden van jouw schema
  const artwork = await client.fetch(`
    *[_type == "artwork" && slug.current == $slug][0]{
      title,
      "artistName": artist->name,
      description,
      dateCreated,
      availability,
      
      // We pakken de prijs en afmetingen uit de eerste editie in de lijst
      "price": editions[0].price,
      "dimensions": editions[0].dimensions,
      
      // We halen de tekst-titel van het materiaal op
      "medium": material[0]->title,

      "imageUrl": mainImage.asset->url
    }
  `, { slug })

  if (!artwork) notFound()

  const year = artwork.dateCreated ? new Date(artwork.dateCreated).getFullYear() : null

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/artworks" className="text-sm text-gray-500 hover:text-black mb-8 inline-block">
        ← Back to all artworks
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* AFBEELDING */}
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

        {/* INFORMATIE */}
        <div>
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">{artwork.title}</h1>
          
          {artwork.artistName && (
            <p className="text-xl text-gray-600 mb-6">{artwork.artistName}</p>
          )}

          <div className="space-y-4 text-gray-800 border-t border-gray-200 pt-6">
             {artwork.price && artwork.availability !== 'sold' && (
               <p className="text-2xl font-medium">€ {artwork.price}</p>
             )}
             
             {artwork.availability === 'sold' && (
               <p className="text-xl font-bold text-red-600 uppercase">Sold</p>
             )}

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

          {/* Beschrijving met PortableText voorkomt de crash */}
          {artwork.description && (
            <div className="mt-8 prose prose-sm text-gray-600 max-w-none">
              <PortableText value={artwork.description} />
            </div>
          )}
          
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
