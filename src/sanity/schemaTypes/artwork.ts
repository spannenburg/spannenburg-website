import { defineField, defineType } from 'sanity'
import { TfiPalette, TfiThought } from 'react-icons/tfi' // TfiThought toegevoegd voor het AI tabblad

export const artwork = defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  icon: TfiPalette,
  groups: [
    { name: 'ai_helper', title: '🤖 AI Generator', icon: TfiThought }, // NIEUW: Eerste tabblad
    { name: 'general', title: 'Core Data' },
    { name: 'content', title: 'Narrative & SEO' }, 
    { name: 'media', title: 'Visuals' },
    { name: 'editions', title: 'Pricing & Sizes' },
    { name: 'migration', title: 'Migration' },
  ],
  fields: [
    // --- 0. AI HELPER (De Prompt) ---
    defineField({
      name: 'aiInstruction',
      title: 'Copy-Paste Prompt for Gemini/ChatGPT',
      type: 'text',
      group: 'ai_helper',
      rows: 15,
      readOnly: true,
      description: 'STEP 1: Copy this text. STEP 2: Paste into AI. STEP 3: Add your photo/URL. STEP 4: Copy the answers back here.',
      initialValue: `
ACT AS: A senior Fine Art Curator & SEO Specialist for Arjan Spannenburg.
GOAL: Write high-authority (E-E-A-T), seductive metadata for a new artwork.
TONE: 3rd person. Sophisticated, emotional, tailored for international collectors and curators.
CONTEXT: Arjan creates Black & White, high-contrast fine art photography focusing on male vulnerability, queer identity, and classical mythology.

INPUT: I will provide a photo or a URL.

OUTPUT TASK: Generate the following data fields strictly.

1. TITLE: A compelling English title.
2. HEADLINE: A punchy 1-sentence description (for JSON-LD).
3. SLUG suggestion: format "title-year" (lowercase, hyphens).
4. CATEGORIES: Choose 1-3 from: [Portraiture, Nude, Queer Identity, Classical Myth, Conceptual].
5. EMOTIONAL DESCRIPTION (The "Why"): 150 words. Analyze the light, composition, and emotional weight. Why should a collector buy this? Use semantic keywords naturally.
6. VISUAL DESCRIPTION (The "What"): Literal description for AI Vision (Blind/Accessibility). "A black and white photo of..."
7. EXTERNAL LINKS: Suggest 1 Wikipedia/RKD link relevant to the theme (e.g., St. Sebastian, Cupid, Chiaroscuro).
8. KEYWORDS: 15 comma-separated SEO terms (mix of broad "Fine Art" and niche "Gay Art").
9. FILE NAME: Create the optimal filename for the webp image (e.g., "arjan-spannenburg-[slug].webp").

REQUIREMENT:
- Write for "Entity Linking" (connect the art to broader concepts).
- Use "Semantic SEO" (related terms, not just keywords).
- Ensure the tone is "Gallery Quality" (no salesy language, but value-driven).

READY? Please ask me for the image or URL.
      `
    }),

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

    // --- 2. NARRATIVE & SEO ---
    defineField({
      name: 'categories',
      title: 'Thematic Categories (Landing Pages)',
      description: 'STRATEGY: Select the broad themes. Automatically places artwork in "Hubs".',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'description',
      title: 'Emotional Description (The "Why")',
      description: 'EEAT & STORYTELLING: Copy the "Emotional Description" from the AI output here.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'visualDescription',
      title: 'Visual / Raw Description (The "What")',
      description: 'AI VISION: Copy the "Visual Description" here.',
      type: 'text',
      group: 'content',
    }),
    
    // EXTERNAL AUTHORITY LINKS
    defineField({
      name: 'externalReferences',
      title: 'External Authority Links (Entity Linking)',
      description: 'SEMANTIC SEO: Link to Wikipedia or RKD entries suggested by the AI.',
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

    // GENRES (Fixed List)
    defineField({
      name: 'genre',
      title: 'Genres / Tags (Grouping)',
      description: 'Select the genres identified by the AI.',
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

    // MATERIAL (Reference)
    defineField({
      name: 'material',
      title: 'Materials & Finishes',
      description: 'Select the standard finish.',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'material' }] }],
    }),

    defineField({
      name: 'keywords',
      title: 'SEO Keywords (Meta Tags)',
      description: 'Paste the comma-separated list from the AI here.',
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
          description: 'Paste the "Visual Description" or a summary here.',
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
