import { defineField, defineType } from 'sanity'
import {
  VscHome,
  VscQuestion,
  VscEyeClosed,
  VscSearch,
  VscEdit,
  VscMortarBoard,
} from 'react-icons/vsc'
import { BLOG_DIR } from '@/lib/env'

export const page = defineType({
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
    
    // De Modules
    defineField({
      name: 'modules',
      title: 'Page Content',
      type: 'array',
      group: 'content',
      of: [
        { type: 'hero' },
        { type: 'artworkGrid' },
        { type: 'postList' },
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
