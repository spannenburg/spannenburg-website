import { defineField, defineType } from 'sanity'
import {
	VscHome,
	VscQuestion,
	VscEyeClosed,
	VscSearch,
	VscEdit,
	VscMortarBoard,
} from 'react-icons/vsc'
// We behouden deze import voor de icoontjes-logica onderaan
import { BLOG_DIR } from '@/lib/env'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [{ name: 'content', default: true }, { name: 'metadata' }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		
		// HIER ZIT DE GROTE VERANDERING:
		defineField({
			name: 'modules',
			title: 'Page Content',
			type: 'array',
			group: 'content',
			of: [
				// Dit zijn jouw 3 nieuwe "meubels":
				{ type: 'hero' },
				{ type: 'artworkGrid' },
				{ type: 'postList' },
				
				// Optioneel: Gewone tekst (handig voor een 'About' pagina)
				{ type: 'blockContent' }, 
			],
		}),

		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'metadata',
		}),
		defineField({
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		}),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
			media: 'metadata.image',
			noindex: 'metadata.noIndex',
			language: 'language',
		},
		prepare: ({ title, slug, media, noindex, language }) => ({
			title,
			subtitle: [
				language && `[${language}] `,
				slug && (slug === 'index' ? '/' : `/${slug}`),
			]
				.filter(Boolean)
				.join(''),
			media:
				media ||
				(slug === 'index' && VscHome) ||
				(slug === '404' && VscQuestion) ||
				(slug === 'search' && VscSearch) ||
				(slug === BLOG_DIR && VscEdit) ||
				(slug?.startsWith('docs') && VscMortarBoard) ||
				(noindex && VscEyeClosed),
		}),
	},
})
