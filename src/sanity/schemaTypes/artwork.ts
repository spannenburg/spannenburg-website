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
      description: 'A short, punchy sentence for Google results. Example: "Intense black-and-white portrait exploring vulnerability."',
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
    defineField({
      name: 'categories',
      title: 'Thematic Categories (Landing Pages)',
      description: 'STRATEGY: Select the broad themes (e.g., Fetish, Portraiture). This automatically adds this artwork to those specific "Hub" pages on your site.',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'description',
      title: 'Emotional Description (The "Why")',
      description: 'EEAT & STORYTELLING: Describe the concept, inspiration, and emotional depth. This tells Google you are an "Authority" with artistic intent.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'visualDescription',
      title: 'Visual / Raw Description (The "What")',
      description: 'AI VISION: Describe literally what is seen (e.g., "A muscular man in shadow, holding a golden bow"). Essential for AI image recognition.',
      type: 'text',
      group: 'content',
    }),
    
    // EXTERNAL AUTHORITY LINKS (Semantic SEO)
    defineField({
      name: 'externalReferences',
      title: 'External Authority Links (Entity Linking)',
      description: 'SEMANTIC SEO: Link to Wikipedia or RKD entries for the subject (e.g., the myth of Cupid). This "anchors" your work to established global knowledge.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Context Name (e.g. Wikipedia: Saint Sebastian)', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }),

    // --- AANGEPAST VELD: Vaste keuzelijst voor consistentie ---
    defineField({
      name: 'genre',
      title: 'Genres / Tags (Grouping)',
      description: 'LLMO CLUSTERING: Select broadly applicable terms. These help AI agents place your work in the right art market context.',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Fine Art Photography', value: 'Fine Art Photography' },
          { title: 'Portraiture', value: 'Portraiture' },
          { title: 'Monochrome / Black & White', value: 'Monochrome' },
          { title: 'Male Figure / Nude', value: 'Male Figure' },
          { title: 'Queer Identity', value: 'Queer Identity' },
          { title: 'Classical & Mythological', value: 'Classical & Mythological' },
          { title: 'Conceptual', value: 'Conceptual' },
          { title: 'Documentary', value: 'Documentary' },
          { title: 'Fetish & Subculture', value: 'Fetish & Subculture' },
          { title: 'Fashion', value: 'Fashion' },
        ],
      },
    }),

    defineField({
      name: 'material',
      title: 'Materials & Finishes',
      description: 'TECHNICAL SPECS: Select the finish used for this specific artwork. Add new materials in the "Technical / Pricing" menu.',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'material' }] }],
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords (Meta Tags)',
      description: 'SEARCH INDEXING: Comma-separated terms users type in Google (e.g., "gay art amsterdam, buy art online"). Purely for search engines.',
      type: 'text',
      group: 'content',
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
          title: 'Alt Text (SEO)',
          description: 'Crucial description for visually impaired users and Google Images ranking.',
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
      description: 'GEO-AUTHORITY: Connect this work to specific locations/venues to boost local ranking.',
      type: 'array',
      group: 'exhibitions',
      of: [{ type: 'reference', to: [{ type: 'exhibition' }] }],
    }),

    // --- 6. MIGRATION ---
    defineField({
      name: 'sourceUrlDutch',
      title: 'Original Dutch Website URL',
      description: 'THE BRIDGE: Link to the original page on arjanspannenburg.nl to transfer authority.',
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
