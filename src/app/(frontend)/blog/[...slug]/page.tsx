import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost } from '@/sanity/lib/queries' // <--- HIER zat de fout (was getPage)
import Modules from '@/ui/modules'
import { processMetadata } from '@/lib/processMetadata'

export default async function BlogPostPage({ params }: { params: Promise<{ slug?: string[] }> }) {
	const { slug } = await params
	
	// We halen hier een POST op, geen PAGE
	const post = await getPost({ slug })

	if (!post) notFound()

	// We geven de post data mee aan de modules (dat hebben we eerder al mogelijk gemaakt)
	return <Modules modules={post?.modules} post={post} />
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
	const { slug } = await params
	const post = await getPost({ slug })

	if (!post) return {}

	return {
		title: post.title,
		description: post.metadata?.description,
	}
}
