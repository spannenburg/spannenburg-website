import Hero from './Hero'
import ArtworkGrid from './ArtworkGrid'
import PostList from './PostList'

export default function Modules({ modules }: { modules?: any[] }) {
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
            // Dit zorgt dat onbekende blokken niet crashen, maar gewoon niet tonen
            return <div key={module._key} className="hidden" />
        }
      })}
    </>
  )
}
