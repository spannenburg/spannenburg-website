import { defineField, defineType } from 'sanity'
import { TfiPalette, TfiThought } from 'react-icons/tfi'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  icon: TfiPalette,
  groups: [
    { name: 'ai_helper', title: '🤖 AI Generator', icon: TfiThought },
    { name: 'general', title: 'Core Data' },
    { name: 'content', title: 'Narrative & SEO' }, 
    { name: 'media', title: 'Visuals' },
    { name: 'editions', title: 'Pricing & Sizes' },
    { name: 'migration', title: 'Migration' },
  ],
  fields: [
    // --- 0. AI HELPER (De Verbeterde Prompt) ---
    defineField({
      name: 'aiInstruction',
      title: 'Copy-Paste Prompt for Gemini/ChatGPT',
      type: 'text',
      group: 'ai_helper',
      rows: 20,
      readOnly: true,
      description: 'INSTRUCTION: 1. Copy this prompt. 2. Paste into AI. 3. Provide the Image URL AND the Artist\'s core concept/thoughts. 4. Copy the answers back.',
      initialValue: `
ACT AS: A senior Fine Art Curator & SEO Specialist (E-E-A-T Expert).
GOAL: Create gallery-quality metadata for Arjan Spannenburg's portfolio.
CONTEXT: Arjan creates High-Contrast Black & White fine art photography. Themes: Male vulnerability, Queer identity, Mythology.

INPUT REQUIRED FROM USER: 
1. The Image (URL or upload).
2. The Artist's Title (Strict).
3. The Artist's Concept/Background story (Notes).

OUTPUT TASK - GENERATE THESE FIELDS:

1. TITLE: Use the EXACT title provided by the artist. Do not invent one.
2. HEADLINE: A punchy 1-sentence description (max 160 chars). Focus on the emotion and subject. (For JSON-LD/Google snippets).
3. SLUG: Suggest a slug based on "title-year". Why? To ensure uniqueness if titles are repeated.
4. DATE: Estimate the exact release date (YYYY-MM-DD). If unknown, use YYYY-01-01.
5. GENRES (Select strictly from this list, multiple allowed):
   [Fine Art Photography, Portraiture, Monochrome / Black & White, Male Figure / Nude, Queer Identity, Classical & Mythological, Conceptual, Documentary, Fetish & Subculture, Fashion]. 
   *If the work fits none, suggest a NEW genre.*
6. EMOTIONAL DESCRIPTION (The "Why"): 
   - Length: 200-300 words.
   - Combine the visual analysis (light, composition, contrast) with the Artist's Concept.
   - Explain the "Soul" of the work. Why is this significant?
   - Use semantic keywords naturally (e.g., "Chiaroscuro", "Vulnerability", "Contemporary Male Gaze").
7. VISUAL DESCRIPTION (The "What"): 
   - Start with: "A [Black & White / Color] [Portrait / Landscape / Square] photograph showing..."
   - Describe literally what is visible for AI Vision & Accessibility tools.
   - Length: 50-80 words.
8. EXTERNAL LINKS (E-E-A-T): 
   - Suggest 2-3 high-authority links. 
   - Do NOT only use Wikipedia. Look for: Museum collections (Rijksmuseum, Tate), Art History terms (Chiaroscuro, Contrapposto), or Mythological source material.
   - Explain WHY this link increases the authority of the artwork.
9. KEYWORDS: 
   - List 10-15 specific terms. 
   - Mix specific visual elements (e.g., "Shadow", "Profile") with thematic concepts (e.g., "Intimacy", "Dutch Fine Art").

TONE: Sophisticated, curated, 3rd person. No sales-talk.
READY? Ask me for the Image and the Artist's Notes.
      `
    }),

    // --- 1. CORE DATA ---
    defineField({
      name: 'title',
      title: 'Title / Name',
      description: 'STRICT: The official title given by the artist. Do not change this for SEO purposes.',
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
      description: 'The unique URL part. We advise "title-year" to ensure uniqueness (e.g., "cupido-2024"), as titles like "Untitled" or "Portrait" are often repeated.',
      type: 'slug',
      group: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    
    // --- AANGEPAST: Van String naar Date (Let op: oude data "2017" moet je opnieuw selecteren) ---
    defineField({
      name: 'dateCreated',
      title: 'Date Created',
      description: 'Exact date is preferred for the Timeline. If the exact day is unknown, select January 1st of that year.',
      type: 'date', 
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),

    // --- 2. NARRATIVE & SEO ---
    defineField({
      name: 'categories',
      title: 'Thematic Hubs',
      description: 'Which "Hubs" or "Collections" does this belong to on the website? (e.g. The "Queer" page).',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    
    // GENRES (Vaste Lijst)
    defineField({
      name: 'genre',
      title: 'Genres / Tags',
      description: 'Select the applicable genres. If a new genre is needed that is not in this list, ask the developer to add it.',
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
      name: 'description',
      title: 'Emotional Description (The "Why")',
      description: 'ESSENTIAL FOR SALES: Don\'t just describe what we see. Analyze the light, composition, and emotional weight. Explain the artist\'s intent. Why should a collector buy this? (Aim for 200-300 words).',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'visualDescription',
      title: 'Visual / Raw Description (The "What")',
      description: 'ACCESSIBILITY & AI: A literal description for visually impaired users and Google Vision. State if it is B&W/Color, Portrait/Landscape, and what is physically in the frame. (~50-80 words).',
      type: 'text',
      group: 'content',
    }),
    
    // EXTERNAL AUTHORITY LINKS
    defineField({
      name: 'externalReferences',
      title: 'External Authority Links (Entity Linking)',
      description: 'AUTHORITY BUILDER: Link to high-quality external sources (Museums, Art History definitions, Myths). This connects your art to the global art canon in Google\'s eyes. Try to find 2 or 3 links.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Context Name (e.g. Tate Modern: Chiaroscuro)', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }),

    defineField({
      name: 'keywords',
      title: 'SEO Keywords (Meta Tags)',
      description: 'SPECIFICITY: Don\'t just use "Art". Use specific terms like "High contrast male nude", "Rembrandt lighting", "Dutch photography". Used for search indexing.',
      type: 'text',
      group: 'content',
    }),

    // MATERIAL (Reference)
    defineField({
      name: 'material',
      title: 'Materials & Finishes',
      description: 'PRICING: Select the standard finish. The price calculation depends on this choice.',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'material' }] }],
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
          title: 'Alt Text',
          description: 'Copy the "Visual Description" here for SEO.',
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
        // Zorgt dat de datum netjes als jaar wordt getoond in de lijst
        subtitle: date ? new Date(date).getFullYear().toString() : 'No date',
        media: media,
      }
    },
  },
})
