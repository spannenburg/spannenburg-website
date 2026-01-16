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
    { name: 'editions', title: 'Pricing & Editions' },
    { name: 'migration', title: 'Migration & SEO' },
  ],
  fields: [
    // --- 1. GENERAL INFO ---
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year Created',
      type: 'string',
      group: 'general',
      initialValue: () => new Date().getFullYear().toString(),
    }),
    defineField({
      name: 'medium',
      title: 'Medium / Technique',
      type: 'string',
      group: 'general',
      description: 'e.g., Fine Art Print on Hahnemühle Paper',
    }),
    defineField({
      name: 'description',
      title: 'Description / Story',
      description: 'The background story or artistic motivation for this work.',
      type: 'array',
      group: 'general',
      of: [{ type: 'block' }],
    }),

    // --- 2. VISUALS ---
    defineField({
      name: 'mainImage',
      title: 'Artwork Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (SEO)',
          description: 'Describe the image for search engines and accessibility.',
          validation: (rule) => rule.required(),
        },
      ],
    }),

    // --- 3. PRICING & EDITIONS ---
    // This connects to the artworkEdition.ts object we created
    defineField({
      name: 'editions',
      title: 'Available Editions',
      description: 'Add the different sizes and price tiers for this work.',
      type: 'array',
      group: 'editions',
      of: [{ type: 'artworkEdition' }],
    }),

    // --- 4. MIGRATION & SEO ---
    defineField({
      name: 'sourceUrlDutch',
      title: 'Original Dutch Website URL',
      description: 'Link to the corresponding page on arjanspannenburg.nl for migration reference.',
      type: 'url',
      group: 'migration',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Artwork',
        subtitle: subtitle || 'Year unknown',
        media: media,
      }
    },
  },
})
