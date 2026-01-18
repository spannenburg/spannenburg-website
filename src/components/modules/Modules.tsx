import Hero from './modules/Hero'

// Hier importeren we later ook je andere modules (Text, ArtworkGrid, Map, etc.)

export default function Modules({ modules }: { modules: any[] }) {
  if (!modules) return null

  return (
    <>
      {modules.map((module) => {
        // We kijken naar het '_type' veld uit Sanity om te weten wat het is
        switch (module._type) {
          
          case 'hero':
            return <Hero key={module._key} module={module} />

          // Hier voegen we later cases toe voor 'text-module', 'artwork-grid', etc.
          // case 'text-module': return <TextModule key={module._key} module={module} />

          default:
            // Handig voor tijdens het bouwen: zien welk blokje we nog missen
            return (
              <div key={module._key} className="p-10 bg-gray-100 text-center border-2 border-dashed border-gray-300 my-4">
                <p className="text-gray-500 font-mono text-sm">
                  Nog geen component voor module type: <strong>{module._type}</strong>
                </p>
              </div>
            )
        }
      })}
    </>
  )
}
