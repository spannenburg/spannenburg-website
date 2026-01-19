import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PortableText } from "next-sanity"

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // UPDATED QUERY: Matches src/sanity/schemaTypes/artwork.ts exactly
  const artwork = await client.fetch(`
    *[_type == "artwork" && slug.current == $slug][0]{
      title,
      headline,
      "artistName": artist->name,
      description,
      visualDescription,
      dateCreated,
      keywords,
      "categories": categories[]->title,
      "genres": genre,
      externalReferences,
      
      // Fetching the editions array for pricing and sizes
      editions[]{
        name,
        dimensions,
        price,
        stock
      },
      
      // Fetching material titles from references
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
        
        {/* LEFT COLUMN: THE VISUAL (7/12) */}
        <div className="lg:col-span-7 space-y-8">
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
          
          {/* Visual Description for AI Vision & SEO */}
          {artwork.visualDescription && (
            <div className="p-6 bg-gray-50 border-l-2 border-gray-200">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-bold">Visual Analysis</h4>
              <p className="text-sm text-gray-500 italic leading-relaxed">{artwork.visualDescription}</p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: THE DATA (5/12) */}
        <div className="lg:col-span-5 space-y-10">
          <header className="space-y-4">
            <div className="space-y-1">
              {artwork.artistName && (
                <p className="text-sm uppercase tracking-widest text-gray-400">{artwork.artistName}</p>
              )}
              <h1 className="text-4xl font-light tracking-tight">{artwork.title}</h1>
            </div>
            
            {artwork.headline && (
              <p className="text-lg text-gray-600 font-serif italic border-l-2 border-black pl-4 py-1">
                "{artwork.headline}"
              </p>
            )}
          </header>

          {/* PRICING & EDITIONS SECTION */}
          <section className="space-y-6 pt-6 border-t border-gray-100">
             <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">Editions & Pricing</h3>
             <div className="space-y-4">
               {artwork.editions?.map((edition: any, index: number) => (
                 <div key={index} className="flex justify-between items-end pb-4 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{edition.name || 'Standard Edition'}</p>
                      <p className="text-xs text-gray-500">{edition.dimensions}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-light text-black">€ {edition.price}</p>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400">
                        {edition.stock > 0 ? 'In Stock' : 'Upon Request'}
                      </p>
                    </div>
                 </div>
               ))}
             </div>
          </section>

          {/* EMOTIONAL DESCRIPTION (Rich Text) */}
          <section className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">The Narrative</h3>
            {artwork.description && (
              <div className="prose prose-sm prose-gray leading-relaxed max-w-none prose-p:text-gray-700">
                <PortableText value={artwork.description} />
              </div>
            )}
          </section>

          {/* TECHNICAL METADATA */}
          <section className="grid grid-cols-2 gap-y-6 pt-6 border-t border-gray-100 text-sm">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-300 mb-1">Materials</p>
              <p>{artwork.materials?.join(', ') || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-300 mb-1">Year</p>
              <p>{year || 'Unspecified'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-300 mb-1">Genres</p>
              <p className="text-xs">{artwork.genres?.join(', ')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-300 mb-1">Categories</p>
              <p className="text-xs">{artwork.categories?.join(', ')}</p>
            </div>
          </section>

          {/* ENTITY LINKING (E-E-A-T) */}
          {artwork.externalReferences && artwork.externalReferences.length > 0 && (
            <section className="space-y-4 pt-6 border-t border-gray-100">
               <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">Authority & Context</h3>
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
          <div className="pt-10">
             <Link href="/contact" className="w-full block text-center bg-black text-white px-8 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gray-800 transition-all shadow-xl">
               Inquire about this piece
             </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
