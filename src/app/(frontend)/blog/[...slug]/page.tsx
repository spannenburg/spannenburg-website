import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost } from '@/sanity/lib/queries'
import Modules from '@/ui/modules'

export default async function BlogPostPage({ params }: { params: Promise<{ slug?: string[] }> }) {
	const { slug } = await params
	const post = await getPost({ slug })

	if (!post) notFound()

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
