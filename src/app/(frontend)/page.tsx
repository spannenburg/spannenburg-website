import { client } from "@/sanity/lib/client"
import Modules from "@/components/Modules"

// We zoeken de pagina met slug '/' (Homepage) OF de pagina die 'Home' heet.
const HOME_QUERY = `
  *[_type == "page" && (slug.current == "/" || slug.current == "home")][0]{
    title,
    modules[]{
      ...,
      bgImage{
        ...,
        asset->{
          url
        }
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
            <li>Voeg bij 'Page Modules' een <strong>Hero</strong> toe</li>
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
