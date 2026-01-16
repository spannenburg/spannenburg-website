import { defineField, defineType } from 'sanity'
import { TfiPalette } from 'react-icons/tfi'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  icon: TfiPalette,
  groups: [
    { name: 'general', title: 'Core Data' },
    { name: 'content', title: 'Narrative & SEO' }, 
    { name: 'media', title: 'Visuals' },
    { name: 'editions', title: 'Pricing & Sizes' },
    { name: 'exhibitions', title: 'History (GEO)' }, 
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
      description: 'Example: "Intense black-and-white portrait exploring vulnerability..."',
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

    // --- 2. NARRATIVE & SEO (Enrichment for AI/LLM) ---
    // NEW: Linked Categories for thematic landing pages
    defineField({
      name: 'categories',
      title: 'Thematic Categories',
      description: 'Link this work to global themes like "Fetish" or "Portraiture" for specific gallery hubs.',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'description',
      title: 'Emotional Description',
      description: 'The deeper meaning and "why". Essential for E-E-A-T.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'visualDescription',
      title: 'Visual / Raw Description',
      description: 'Describe what we SEE (for AI image recognition and LLMO).',
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
      description: 'E.g.: Giclée print, Piezography, Hahnemühle paper.',
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
      description: 'Comma-separated list for meta-tags.',
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
          description: 'Crucial for Google Images ranking.',
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
      title: 'Exhibition History',
      description: 'Connect this work to locations for GEO-enrichment.',
      type: 'array',
      group: 'exhibitions',
      of: [{ type: 'reference', to: [{ type: 'exhibition' }] }],
    }),

    // --- 6. MIGRATION ---
    defineField({
      name: 'sourceUrlDutch',
      title: 'Original Dutch Website URL',
      description: 'Reference link to the existing page on arjanspannenburg.nl.',
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
