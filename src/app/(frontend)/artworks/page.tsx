import { client } from "@/sanity/lib/client"
import Link from "next/link"

export const metadata = {
  title: "All Artworks | Spannenburg.Art",
  description: "Browse our complete collection of contemporary artworks.",
}

export default async function ArtworksPage() {
  // AANGEPAST: We halen nu 'mainImage' op (zoals in je schema staat)
  // in plaats van 'photos'.
  const artworks = await client.fetch(`
    *[_type == "artwork"]|order(_createdAt desc){
      _id,
      title,
      "slug": slug.current,
      "artistName": artist->name,
      "imageUrl": mainImage.asset->url,
      price,
      availability
    }
  `)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest text-center">
        All Artworks
      </h1>

      {artworks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No artworks currently listed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {artworks.map((work: any) => (
            <Link 
              key={work._id} 
              href={`/artworks/${work.slug}`}
              className="group block"
            >
              {/* Afbeelding Container */}
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative mb-4">
                {work.imageUrl ? (
                  <img 
                    src={work.imageUrl} 
                    alt={work.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm flex-col">
                    <span>No Image Available</span>
                  </div>
                )}
                
                {/* Label als het verkocht is */}
                {work.availability === 'sold' && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase">
                    Sold
                  </div>
                )}
              </div>
              
              {/* Tekst onder de foto */}
              <div className="text-center">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                  {work.artistName || 'Unknown Artist'}
                </h3>
                <h2 className="text-lg font-medium text-black group-hover:text-gray-600 transition-colors">
                  {work.title}
                </h2>
                {work.price && work.availability !== 'sold' && (
                  <p className="text-sm text-gray-400 mt-1">
                    € {work.price}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
