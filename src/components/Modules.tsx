import Hero from './modules/Hero'

export default function Modules({ modules }: { modules: any[] }) {
  if (!modules) return null

  return (
    <>
      {modules.map((module) => {
        switch (module._type) {
          
          case 'hero':
            return <Hero key={module._key} module={module} />

          // Hier komen later je andere modules bij (Text, Grid, etc.)
          
          default:
            return null // Verberg blokken die we nog niet gebouwd hebben
        }
      })}
    </>
  )
}
