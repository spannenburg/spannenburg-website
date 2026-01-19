import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PortableText } from "next-sanity"

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const artwork = await client.fetch(`
    *[_type == "artwork" && slug.current == $slug][0]{
      title,
      headline,
      "artistName": artist->name,
      description,
      visualDescription,
      dateCreated,
      "categories": categories[]->title,
      "genres": genre,
      externalReferences,
      editions[]{
        name,
        dimensions,
        price,
        stock,
        // We checken of de naam 'AP' bevat voor de juiste labeling
        "isAP": name match "*AP*"
      },
      "materials": material[]->title,
      "imageUrl": mainImage.asset->url,
      "altText": mainImage.alt
    }
  `, { slug })

  if (!artwork) notFound()

  const year = artwork.dateCreated ? new Date(artwork.dateCreated).getFullYear() : null

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl font-sans text-gray-900">
      <Link href="/artworks" className="text-xs uppercase tracking-widest text-gray-400 hover:text-black mb-12 inline-block transition-colors">
        ← Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* LINKER KOLOM: VISUALS & NARRATIVE & EDITIONS */}
        <div className="lg:col-span-7 space-y-12">
          {/* De Afbeelding */}
          <div className="bg-white shadow-sm overflow-hidden border border-gray-100">
            {artwork.imageUrl ? (
              <img 
                src={artwork.imageUrl} 
                alt={artwork.altText || artwork.title} 
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="aspect-square flex items-center justify-center bg-gray-50 text-gray-300">No Image</div>
            )}
          </div>

          {/* THE NARRATIVE (Nu direct onder de afbeelding) */}
          <section className="space-y-4 pt-8 border-t border-gray-100">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-300 italic">The Narrative</h3>
            {artwork.description && (
              <div className="prose prose-sm prose-gray leading-relaxed max-w-none">
                <PortableText value={artwork.description} />
              </div>
            )}
          </section>

          {/* EDITIONS & PRICING (Nu onder de Narrative) */}
          <section className="space-y-6 pt-12 border-t border-gray-100">
             <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-300 italic">Editions & Pricing</h3>
             <div className="grid grid-cols-1 gap-4">
               {artwork.editions?.map((edition: any, index: number) => (
                 <div key={index} className="flex justify-between items-center p-5 bg-gray-50/50 border border-gray-100">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-wider">
                        {edition.dimensions} 
                        <span className="text-gray-400 ml-2 font-normal">
                           — {edition.name || (edition.isAP ? 'Artist Proof' : 'Limited Edition')}
                        </span>
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase mt-1">
                        Availability: {edition.stock > 0 ? `${edition.stock} remaining` : 'Contact for status'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-light text-black">
                        {edition.price ? `€ ${edition.price}` : 'Price upon request'}
                      </p>
                    </div>
                 </div>
               ))}
             </div>
             {artwork.materials && artwork.materials.length > 0 && (
                <div className="pt-4 border-t border-gray-100/50">
                  <p className="text-[10px] text-gray-300 uppercase font-bold mb-1">Selectable Materials</p>
                  <p className="text-xs text-gray-500 tracking-wide">{artwork.materials.join(' / ')}</p>
                </div>
             )}
          </section>
        </div>

        {/* RECHTER KOLOM: TITELS, ANALYSIS & META */}
        <div className="lg:col-span-5 space-y-12">
          <header className="space-y-4">
            <div className="space-y-1">
              {artwork.artistName && (
                <p className="text-sm uppercase tracking-widest text-gray-400">{artwork.artistName}</p>
              )}
              <h1 className="text-4xl font-light tracking-tight leading-tight">{artwork.title}</h1>
            </div>
            
            {artwork.headline && (
              <p className="text-lg text-gray-600 font-serif italic border-l-2 border-black pl-4 py-1 leading-snug">
                "{artwork.headline}"
              </p>
            )}
          </header>

          {/* VISUAL ANALYSIS (Nu in de rechterkolom onder de titels) */}
          {artwork.visualDescription && (
            <section className="space-y-4 pt-8 border-t border-gray-100">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Visual Analysis</h4>
              <p className="text-sm text-gray-500 italic leading-relaxed">{artwork.visualDescription}</p>
            </section>
          )}

          {/* TECHNICAL METADATA */}
          <section className="grid grid-cols-2 gap-y-8 pt-8 border-t border-gray-100 text-sm">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-300 mb-1">Year</p>
              <p>{year || '2025'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-300 mb-1">Categories</p>
              <p className="text-xs">{artwork.categories?.join(', ')}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] uppercase font-bold text-gray-300 mb-1">Genres</p>
              <p className="text-xs leading-relaxed">{artwork.genres?.join(', ')}</p>
            </div>
          </section>

          {/* AUTHORITY LINKS */}
          {artwork.externalReferences && artwork.externalReferences.length > 0 && (
            <section className="pt-8 border-t border-gray-100">
               <div className="flex flex-wrap gap-2">
                 {artwork.externalReferences.map((ref: any, i: number) => (
                   <a 
                     key={i} 
                     href={ref.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-[10px] uppercase tracking-widest border border-gray-200 px-3 py-2 hover:bg-black hover:text-white transition-all"
                   >
                     {ref.label} ↗
                   </a>
                 ))}
               </div>
            </section>
          )}

          {/* CALL TO ACTION */}
          <div className="pt-8">
             <Link href="/contact" className="w-full block text-center bg-black text-white px-8 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gray-800 transition-all shadow-xl">
               Inquire about this piece
             </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
