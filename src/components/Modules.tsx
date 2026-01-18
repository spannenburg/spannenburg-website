import Hero from './modules/Hero'
import TextModule from './modules/TextModule'
import ArtworkGrid from './modules/ArtworkGrid'
import ImageModule from './modules/ImageModule'
import VideoModule from './modules/VideoModule'
import MapModule from './modules/MapModule'

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
            return <TextModule key={module._key} module={module} />

          // --- 3. ARTWORK GRID ---
          case 'artwork-grid':
            return <ArtworkGrid key={module._key} module={module} />

          // --- 4. MAP / KAART ---
          case 'map':
            return <MapModule key={module._key} module={module} />

          // --- 5. LOSSE AFBEELDING ---
          case 'image-module':
            return <ImageModule key={module._key} module={module} />

          // --- 6. VIDEO (YOUTUBE) ---
          case 'video-module':
            return <VideoModule key={module._key} module={module} />

          // --- ONBEKEND BLOK (Error afhandeling) ---
          default:
            return (
              <div key={module._key} className="py-10 text-center bg-red-50 border border-red-200 m-4 rounded">
                <p className="text-red-600 font-mono text-sm">
                  ⚠️ Onbekende module: <strong>{module._type}</strong>
                  <br />
                  <span className="text-xs text-red-400">Controleer Modules.tsx of Sanity schema</span>
                </p>
              </div>
            )
        }
      })}
    </>
  )
}
