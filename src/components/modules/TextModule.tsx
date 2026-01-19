import { PortableText } from 'next-sanity'

export default function TextModule({ module }: { module: any }) {
  // We checken alle gangbare namen voor tekstvelden in jouw Sanity schema
  const content = module.content || module.text || module.body
  
  // Is er geen tekst? Toon dan niets.
  if (!content) return null

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-2xl">
        
        {/* Optionele Koptekst */}
        {module.heading && (
          <h2 className="text-2xl font-light uppercase tracking-[0.3em] mb-16 text-center text-black">
            {module.heading}
          </h2>
        )}

        {/* De 'prose' component zorgt voor de HTML vertaling.
            Ik heb 'max-w-none' toegevoegd zodat de 'container' de breedte bepaalt.
        */}
        <div className="prose prose-base sm:prose-lg prose-gray mx-auto leading-relaxed max-w-none 
                        prose-headings:font-light prose-headings:uppercase prose-headings:tracking-widest 
                        prose-a:text-black prose-a:underline underline-offset-4 hover:prose-a:text-gray-500 transition-colors">
          <PortableText value={content} />
        </div>

      </div>
    </section>
  )
}
