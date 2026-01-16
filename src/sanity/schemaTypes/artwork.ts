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
    { name: 'dimensions', title: 'Physical Specs' }, // New Group
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

    // --- 3. PHYSICAL SPECS (Structured Dimensions) ---
    defineField({
      name: 'size',
      title: 'Dimensions',
      type: 'object',
      group: 'dimensions',
      description: 'Enter the exact physical measurements.',
      fieldsets: [{ name: 'measurements', title: 'Measurements', options: { columns: 3 } }],
      fields: [
        defineField({
          name: 'height',
          title: 'Height',
          type: 'number',
          fieldset: 'measurements',
          validation: (rule) => rule.required().positive(),
        }),
        defineField({
          name: 'width',
          title: 'Width',
          type: 'number',
          fieldset: 'measurements',
          validation: (rule) => rule.required().positive(),
        }),
        defineField({
          name: 'depth',
          title: 'Depth',
          type: 'number',
          fieldset: 'measurements',
          description: 'Leave 0 for flat prints/photos.',
        }),
        defineField({
          name: 'unit',
          title: 'Unit',
          type: 'string',
          initialValue: 'cm',
          options: {
            list: [
              { title: 'Centimeters (cm)', value: 'cm' },
              { title: 'Inches (in)', value: 'in' },
            ],
            layout: 'radio',
          },
        }),
      ],
    }),

    // --- 4. INVENTORY & PRICING ---
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

    // --- 5. MIGRATION & SEO ---
    defineField({
      name: 'sourceUrlDutch',
      title: 'Original Dutch Website URL',
      description: 'Link to the corresponding page on arjanspannenburg.nl.',
      type: 'url',
      group: 'migration',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      h: 'size.height',
      w: 'size.width',
      u: 'size.unit',
      media: 'mainImage',
    },
    prepare({ title, h, w, u, media }) {
      return {
        title,
        subtitle: h && w ? `${h} x ${w} ${u}` : 'Size not set',
        media,
      }
    },
  },
})
