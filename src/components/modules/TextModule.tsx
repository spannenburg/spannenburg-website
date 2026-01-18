import { PortableText } from 'next-sanity'

export default function TextModule({ module }: { module: any }) {
  // We kijken of het veld 'text' of 'body' heet (afhankelijk van je schema)
  const content = module.text || module.body
  
  // Is er geen tekst? Toon dan niets.
  if (!content) return null

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        
        {/* Optionele Koptekst */}
        {module.heading && (
          <h2 className="text-3xl font-bold uppercase tracking-widest mb-8 text-center text-black">
            {module.heading}
          </h2>
        )}

        {/* De 'PortableText' component zet de Sanity blokken om in HTML */}
        <div className="prose prose-lg prose-headings:font-bold prose-a:text-gray-600 hover:prose-a:text-black mx-auto text-gray-700 leading-relaxed">
          <PortableText value={content} />
        </div>

      </div>
    </section>
  )
}
