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
      description: 'E.g., "Fetish Aesthetics" or "Queer Identity".',
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
      title: 'Category Hub Description',
      description: 'Write a deep-dive essay here (200+ words). This becomes the main text for this category’s landing page.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'featuredPost',
      title: 'Main Research/Background Post',
      description: 'Link to a Journal post that explains the research behind this entire category.',
      type: 'reference',
      to: [{ type: 'post' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Hub Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
  ],
})
