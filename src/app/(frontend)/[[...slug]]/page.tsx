import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPage } from '@/sanity/lib/queries'
import Modules from '@/ui/modules'
import { processMetadata } from '@/lib/processMetadata'

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
	const { slug } = await params
	const page = await getPage({ slug })

	if (!page) notFound()

	return <Modules modules={page?.modules} page={page} />
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
	const { slug } = await params
	const page = await getPage({ slug })

	if (!page) return {}

	return {
		title: page.title,
		description: page.metadata?.description,
	}
}
