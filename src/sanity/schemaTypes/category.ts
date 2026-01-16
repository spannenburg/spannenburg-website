import { defineField, defineType } from 'sanity'
import { TfiTag } from 'react-icons/tfi'

export const category = defineType({
  name: 'category',
  title: 'Artwork Categories',
  type: 'document',
  icon: TfiTag,
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      description: 'E.g., "Fetish", "Sacred Geometry", or "Portraiture".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      description: 'Explain the theme of this category. (Excellent for E-E-A-T and SEO).',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'Representative image for this category hub.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
