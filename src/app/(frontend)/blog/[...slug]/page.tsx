import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPage } from '@/sanity/lib/queries'
import Modules from '@/ui/modules'
import { processMetadata } from '@/lib/processMetadata' // Waarschijnlijk bestaat deze nog, maar we gebruiken hem veilig

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
	// 1. Haal de parameters op (in Next.js 15+ is params een Promise)
	const { slug } = await params

	// 2. Haal de pagina data op uit Sanity
	const page = await getPage({ slug })

	// 3. Bestaat de pagina niet? -> 404
	if (!page) notFound()

	// 4. Toon de modules (en geef de hele page data mee voor de zekerheid)
	return <Modules modules={page?.modules} page={page} />
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
	const { slug } = await params
	const page = await getPage({ slug })

	if (!page) return {}

	// Simpele Metadata (Titel & Omschrijving)
	return {
		title: page.metadata?.title || page.title || 'Spannenburg Art',
		description: page.metadata?.description,
		// Als je later afbeeldingen wilt toevoegen aan SEO, kan dat hier simpel
	}
}
