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
    { name: 'inventory', title: 'Inventory & Pricing' },
    { name: 'migration', title: 'Migration & SEO' },
  ],
  fields: [
    // --- 1. GENERAL INFO ---
    defineField({
      name: 'title',
      title: 'Title',
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
    }),
    defineField({
      name: 'medium',
      title: 'Medium / Technique',
      type: 'string',
      group: 'general',
      description: 'E.g. Fine Art Print on Hahnemühle Paper',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      group: 'general',
      description: 'E.g. 100 x 150 cm',
    }),
    defineField({
      name: 'description',
      title: 'Description / Story',
      type: 'array',
      group: 'general',
      of: [{ type: 'block' }],
    }),

    // --- 2. VISUALS ---
    defineField({
      name: 'mainImage',
      title: 'Main Artwork Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),

    // --- 3. INVENTORY & PRICING ---
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'inventory',
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      group: 'inventory',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Sold', value: 'sold' },
        ],
      },
    }),

    // --- 4. MIGRATION & SEO (The "Dutch Bridge") ---
    defineField({
      name: 'sourceUrlDutch',
      title: 'Original Dutch Website URL',
      description: 'Link to the corresponding page on arjanspannenburg.nl. Used for migration and SEO mapping.',
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
  },
})
