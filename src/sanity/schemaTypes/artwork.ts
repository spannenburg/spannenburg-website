import { defineField, defineType } from 'sanity'
import { TfiPalette } from 'react-icons/tfi'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  icon: TfiPalette,
  groups: [
    { name: 'general', title: 'Core Data' },
    { name: 'content', title: 'Narrative & SEO' }, // Voor EEAT en LLMO
    { name: 'media', title: 'Visuals' },
    { name: 'editions', title: 'Pricing & Sizes' },
    { name: 'exhibitions', title: 'History (GEO)' }, // Voor GEO/Local SEO
    { name: 'migration', title: 'Migration' },
  ],
  fields: [
    // --- 1. CORE DATA ---
    defineField({
      name: 'title',
      title: 'Title / Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline (JSON-LD)',
      description: 'Bijv: "Indringend zwart-wit portret over kwetsbaarheid..."',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateCreated',
      title: 'Year Created',
      type: 'string',
      group: 'general',
      placeholder: '2017',
    }),

    // --- 2. NARRATIVE & SEO (Verrijking voor AI/LLM) ---
    defineField({
      name: 'description',
      title: 'Emotional Description',
      description: 'De diepere betekenis, de "waarom". Essentieel voor EEAT.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'visualDescription',
      title: 'Visual / Raw Description',
      description: 'Beschrijf wat we ZIEN (voor AI-beeldherkenning en LLMO).',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'genre',
      title: 'Genres / Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'material',
      title: 'Materials / Techniques',
      description: 'Bijv: Giclée print, Piezography, etc.',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords (SEO)',
      type: 'text',
      group: 'content',
      description: 'Komma-gescheiden lijst voor de meta-tags.'
    }),

    // --- 3. VISUALS ---
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
          title: 'Alt Text (SEO & AI)',
          description: 'Heel belangrijk voor Google Images.'
        },
      ],
    }),

    // --- 4. PRICING & EDITIONS ---
    defineField({
      name: 'editions',
      title: 'Available Editions',
      type: 'array',
      group: 'editions',
      of: [{ type: 'artworkEdition' }],
    }),

    // --- 5. EXHIBITION HISTORY (GEO/Local SEO) ---
    defineField({
      name: 'exhibitions',
      title: 'Exhibitions where this was shown',
      description: 'Verbind dit werk aan locaties voor GEO-verrijking.',
      type: 'array',
      group: 'exhibitions',
      of: [{ type: 'reference', to: [{ type: 'exhibition' }] }],
    }),

    // --- 6. MIGRATION ---
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
      date: 'dateCreated',
      media: 'mainImage',
    },
    prepare({ title, date, media }) {
      return {
        title: title || 'Untitled',
        subtitle: date || 'No date',
        media: media,
      }
    },
  },
})
