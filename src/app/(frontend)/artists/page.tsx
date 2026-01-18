import { client } from "@/sanity/lib/client"
import Link from "next/link"

export const metadata = {
  title: "Artists | Spannenburg.Art",
}

export default async function ArtistsPage() {
  // We halen de artiesten op, gesorteerd op naam
  const artists = await client.fetch(`
    *[_type == "artist"]|order(name asc){
      _id,
      name,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }
  `)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest text-center">
        Represented Artists
      </h1>

      {artists.length === 0 ? (
        <p className="text-center text-gray-500">No artists found yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist: any) => (
            <Link 
              key={artist._id} 
              href={`/artists/${artist.slug}`}
              className="group block"
            >
              {/* Afbeelding (Placeholder als er geen is) */}
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative mb-4">
                {artist.imageUrl ? (
                  <img 
                    src={artist.imageUrl} 
                    alt={artist.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              
              {/* Naam */}
              <h2 className="text-xl font-medium text-center group-hover:text-gray-600 transition-colors">
                {artist.name}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
