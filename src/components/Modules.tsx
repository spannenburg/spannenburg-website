import Hero from './modules/Hero'
// 1. NIEUWE IMPORT: Hier halen we de TextModule op
import TextModule from './modules/TextModule'

export default function Modules({ modules }: { modules: any[] }) {
  // Veiligheidscheck: zijn er wel modules?
  if (!modules) return null

  return (
    <>
      {modules.map((module) => {
        // We kijken naar de '_type' naam die we in Sanity hebben gegeven
        switch (module._type) {
          
          // --- 1. HERO ---
          case 'hero':
            return <Hero key={module._key} module={module} />

          // --- 2. TEKST ---
          case 'text-module':
            // HIER DE WIJZIGING: We gebruiken nu de echte module in plaats van de placeholder
            return <TextModule key={module._key} module={module} />

          // --- 3. ARTWORK GRID (Nog te bouwen) ---
          case 'artwork-grid':
              // return <ArtworkGrid key={module._key} module={module} />
              return <Placeholder key={module._key} title="Kunst Grid Module" />

          // --- 4. MAP / KAART (Nog te bouwen) ---
          case 'map':
              return <Placeholder key={module._key} title="Google Maps Module" />

          // --- 5. AFBEELDING (Nog te bouwen) ---
          case 'image-module':
              return <Placeholder key={module._key} title="Losse Afbeelding" />

          // --- 6. VIDEO (Nog te bouwen) ---
          case 'video-module':
              return <Placeholder key={module._key} title="Youtube Video" />

          // --- ONBEKEND BLOK ---
          default:
            return (
              <div key={module._key} className="py-10 text-center bg-gray-100 border border-red-200 m-4">
                <p className="text-red-500 font-mono text-sm">
                  Onbekend module type: <strong>{module._type}</strong>
                </p>
              </div>
            )
        }
      })}
    </>
  )
}

// Een tijdelijk hulp-componentje zodat je ziet waar blokken komen
function Placeholder({ title }: { title: string }) {
  return (
    <section className="py-20 border-b border-dashed border-gray-300 bg-gray-50 text-center">
      <h3 className="text-gray-400 font-bold uppercase tracking-widest">
        Hier komt de {title}
      </h3>
      <p className="text-xs text-gray-400 mt-2">(Component moet nog gebouwd worden)</p>
    </section>
  )
}
