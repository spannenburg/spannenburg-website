export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const slugString = slug ? slug.join('/') : '/'
  
  // Haal de data op
  const page = await client.fetch(PAGE_QUERY, { slug: slugString })

  // DEBUGGING: Dit laat in je terminal zien wat er binnenkomt
  console.log('Sanity Data voor:', slugString, page)

  if (!page) {
    console.error('GEEN PAGINA GEVONDEN IN SANITY VOOR SLUG:', slugString)
    notFound()
  }

  // Controleer of er modules zijn
  if (!page.modules || page.modules.length === 0) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold">Pagina gevonden, maar de 'modules' array is leeg.</h1>
        <p>Voeg modules toe in Sanity en druk op Publish.</p>
      </div>
    )
  }

  return <Modules modules={page?.modules} />
}
