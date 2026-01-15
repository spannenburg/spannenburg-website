import Hero from './Hero'
import ArtworkGrid from './ArtworkGrid'
import PostList from './PostList'

// FIX: We voegen nu ook ', post' toe aan de lijst met toegestane spullen.
// Nu werkt het voor Pages én Blog Posts.
export default function Modules({ modules, page, post }: { modules?: any[], page?: any, post?: any }) {
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
