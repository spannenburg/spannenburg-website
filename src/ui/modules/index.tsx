import Hero from './Hero'
import ArtworkGrid from './ArtworkGrid'
import PostList from './PostList'

// FIX: We voegen ', page' toe en definiëren het type '{ modules?: any[], page?: any }'
// Nu wordt de 'page' prop geaccepteerd en is de error weg.
export default function Modules({ modules, page }: { modules?: any[], page?: any }) {
  if (!modules) return null

  return (
    <>
      {modules.map((module) => {
        switch (module._type) {
          case 'hero':
            return <Hero key={module._key} {...module} />
          case 'artworkGrid':
            return <ArtworkGrid key={module._key} {...module} />
          case 'postList':
            return <PostList key={module._key} {...module} />
          default:
            return <div key={module._key} className="hidden" />
        }
      })}
    </>
  )
}
