import Link from 'next/link'

export default function Hero({ module }: { module: any }) {
  // We halen de data uit de module prop
  const { title, subtitle, bgImage, link } = module

  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
      
      {/* 1. ACHTERGROND AFBEELDING */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
           {/* We gebruiken hier even een simpele img tag, later kunnen we Next/Image optimaliseren */}
           <img 
             src={bgImage.asset?.url} 
             alt={bgImage.alt || 'Hero background'} 
             className="w-full h-full object-cover opacity-90"
           />
           {/* Een donkere overlay zodat tekst leesbaar blijft */}
           <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* 2. TEKST INHOUD */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {subtitle && (
          <p className="text-sm md:text-base uppercase tracking-[0.2em] mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide mb-8">
          {title}
        </h1>

        {/* 3. KNOP (Optioneel) */}
        {link && (
          <Link 
            href={link.url || '/'} 
            className="inline-block border border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            {link.label || 'View More'}
          </Link>
        )}
      </div>
    </section>
  )
}
