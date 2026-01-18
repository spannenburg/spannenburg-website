import Link from 'next/link'

export default function Hero({ module }: { module: any }) {
  const { title, subtitle, bgImage, link } = module

  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* 1. ACHTERGROND */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
           <img 
             src={bgImage.asset?.url} 
             alt={bgImage.alt || 'Hero background'} 
             className="w-full h-full object-cover opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
      )}

      {/* 2. INHOUD */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {subtitle && (
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 text-gray-300 animate-fade-in-up">
            {subtitle}
          </p>
        )}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide mb-10 drop-shadow-lg">
          {title}
        </h1>

        {link && (
          <Link 
            href={link.url || '/'} 
            className="inline-block border border-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            {link.label || 'Discover'}
          </Link>
        )}
      </div>
    </section>
  )
}
