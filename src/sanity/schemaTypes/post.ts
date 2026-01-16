import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Writing / Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),import { defineField, defineType } from 'sanity'
import { TfiWrite } from 'react-icons/tfi'

export const post = defineType({
  name: 'post',
  title: 'Journal / News',
  type: 'document',
  icon: TfiWrite,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent', // Zorg dat blockContent.ts bestaat (standaard in Sanity)
    }),
    
    // *** DE TOEVOEGING VOOR UX & SALES ***
    defineField({
        name: 'relatedArtworks',
        title: 'Mentioned Artworks',
        description: 'Show these artworks next to or below the article.',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'artwork' }] }]
    }),
    defineField({
        name: 'relatedExhibition',
        title: 'Related Exhibition',
        description: 'Is this post about a specific show?',
        type: 'reference',
        to: [{ type: 'exhibition' }]
    }),
  ],
})
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent', // Verwijst naar bestand 1
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
