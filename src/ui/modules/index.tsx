import Hero from '@/ui/modules/Hero'
// Als je meer modules hebt (zoals Text, Image), importeer ze hier:
// import Text from '@/ui/modules/Text'

export default function Modules({ modules, page }: { modules?: any[], page?: any }) {
  // VEILIGHEIDSCHECK: Als er geen modules zijn, doe niks.
  if (!modules || !Array.isArray(modules)) {
    return null
  }

  return (
    <>
      {modules.map((module) => {
        switch (module._type) {
          case 'hero':
            return <Hero key={module._key} {...module} />
          
          // Voeg hier later andere modules toe:
          // case 'text':
          //   return <Text key={module._key} {...module} />

          default:
            return <div key={module._key} data-type={module._type} className="hidden" />
        }
      })}
    </>
  )
}
