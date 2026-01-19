import Link from 'next/link'

export default function ArtworkGrid({ module }: { module: any }) {
  // Als er geen kunstwerken zijn geselecteerd, tonen we niets
  if (!module.artworks || module.artworks.length === 0) return null

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        
        {/* Titel van het blok (optioneel) */}
        {module.title && (
          <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-12">
            {module.title}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {module.artworks.map((art: any) => (
            <Link key={art._id} href={`/artworks/${art.slug}`} className="group block">
              <div className="aspect-[3/4] overflow-hidden bg-gray-200 relative mb-4">
                {art.imageUrl ? (
                  <img 
                    src={art.imageUrl} 
                    alt={art.title} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
                {/* Sold label */}
                {art.availability === 'sold' && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase">
                    Sold
                  </div>
                )}
              </div>
              
              {/* Alleen de titel, met de originele styling */}
              <h3 className="text-lg font-medium text-center group-hover:text-gray-600 transition-colors duration-700">
                {art.title}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
