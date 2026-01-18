import { client } from "@/sanity/lib/client"
import Modules from "@/components/Modules"

// HIER IS DE UPDATE: De query haalt nu alle data op voor al je modules
const HOME_QUERY = `
  *[_type == "page" && (slug.current == "/" || slug.current == "home")][0]{
    title,
    modules[]{
      ...,
      
      // 1. Voor de Hero achtergrond
      bgImage{
        ...,
        asset->{
          url
        }
      },

      // 2. Voor de losse Image Module
      image{
        ...,
        asset->{
          url
        }
      },

      // 3. Voor de Artwork Grid (We halen de gelinkte kunstwerken op)
      artworks[]->{
        _id,
        title,
        "slug": slug.current,
        price,
        availability,
        "artistName": artist->name,
        "imageUrl": photos[0].asset->url
      }
    }
  }
`

export default async function HomePage() {
  const page = await client.fetch(HOME_QUERY)

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Welkom bij Spannenburg.Art</h1>
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded text-left max-w-lg">
          <p className="font-bold text-yellow-800 mb-2">Laatste stap in Sanity:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
            <li>Ga naar je Studio -> <strong>Pages</strong></li>
            <li>Maak een nieuwe pagina</li>
            <li>Titel: <strong>Home</strong></li>
            <li>Slug: <strong>/</strong> (of 'home')</li>
            <li>Voeg bij 'Page Modules' een <strong>Hero</strong>, <strong>Tekst</strong> of <strong>Kunst Grid</strong> toe</li>
            <li>Klik op <strong>Publish</strong></li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <main>
      <Modules modules={page.modules} />
    </main>
  )
}
