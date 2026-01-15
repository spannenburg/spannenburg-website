import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

export default function Hero({ title, image }: any) {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center bg-black text-white overflow-hidden">
      
      {/* 1. De Achtergrondafbeelding */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(image).width(1920).height(1080).url()}
            alt={title || 'Hero image'}
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
      )}

      {/* 2. De Tekst */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          {title}
        </h1>
      </div>

    </section>
  )
}
