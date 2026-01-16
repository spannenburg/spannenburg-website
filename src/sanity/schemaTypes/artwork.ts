import { defineField, defineType } from 'sanity'
import { TfiPalette } from 'react-icons/tfi'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  icon: TfiPalette,
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'media', title: 'Visuals' },
    { name: 'editions', title: 'Pricing & Sizes' },
    { name: 'migration', title: 'Migration & SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'mainImage',
        title: 'Artwork Image',
        type: 'image',
        group: 'media',
        options: { hotspot: true },
        fields: [{ name: 'alt', type: 'string', title: 'Alt Text (SEO)' }],
      }),
    defineField({
      name: 'editions',
      title: 'Available Editions',
      description: 'Add the different sizes available for this work.',
      type: 'array',
      group: 'editions',
      of: [{ type: 'artworkEdition' }],
    }),
    defineField({
      name: 'sourceUrlDutch',
      title: 'Original Dutch Website URL',
      type: 'url',
      group: 'migration',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
