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
    // --- 0. AI HELPER (Gallery Edition) ---
    defineField({
      name: 'aiInstruction',
      title: 'Copy-Paste Prompt for Gemini/ChatGPT',
      type: 'text',
      group: 'ai_helper',
      rows: 25,
      readOnly: true,
      description: 'INSTRUCTION: 1. Copy prompt. 2. Paste into AI. 3. Provide Image + ARTIST NAME. 4. Copy answers back.',
      initialValue: `
ACT AS: A senior Fine Art Curator & SEO Specialist (Gallery Level).
GOAL: Write high-authority (E-E-A-T) metadata for an artwork in the "Spannenburg.Art" collection.

INPUT REQUIRED FROM USER: 
1. The Image (URL or upload).
2. The Artist Name (e.g. "Arjan Spannenburg" or "Guest Artist").
3. The Artist's Concept/Style Notes for this specific work.

CONTEXT RULES:
- IF Artist is "Arjan Spannenburg": Use context "Male vulnerability, High-Contrast Black & White or Color (check the uploaded image), Queer identity or Mythology" if the text or image refer or have a connection to these terms.
- IF Artist is SOMEONE ELSE: Adapt tone and context strictly to the provided artist notes.

OUTPUT TASK - GENERATE THESE FIELDS:

1. TITLE: Use the EXACT title provided by the artist.
2. HEADLINE: Generate a JSON headline for an image or article that is optimized for SEO, AI/LLM understanding, and audience engagement.
 - The headline must:
  - Be a single, punchy sentence (max 160 characters)
  - Evoke emotion and clearly convey the subject or main idea
  - Include one relevant keyword naturally if appropriate
  - Be concise and compelling, avoiding fluff or generic phrases
  - Be understandable out of context, yet aligned with the content
  - Avoid marketing hyperbole unless factually supported
  - Use clear, modern language suitable for both humans and AI systems
3. SLUG: Format "artistname-title-year" (to ensure uniqueness in a multi-artist gallery).
4. DATE: Estimate exact release date (YYYY-MM-DD).
5. GENRES: Select relevant tags from: [Fine Art Photography, Portraiture, Monochrome, Abstract, Painting, Mixed Media, Sculpture, Digital Art, Queer Identity, Conceptual].
6. EMOTIONAL DESCRIPTION (The "Why"): 
   - Write for the specific Artist's persona.
   - Explain the "Soul" of the work. Why is this significant within this artist's oeuvre?
   - Priority: The Artist's Concept. This needs to be E-E-A-T, LLMO, GEO, SEO, and AI optimized, while remaining highly interesting for the international curator, art buyer, and collector.
   - Secondary: Combine this with visual analysis (light, composition, contrast). 
   - Explain the "Soul" of the work. Why is this significant? 
   - Use semantic keywords (used by the artist or found by you) naturally.
   - Length: 200-300 words.
7. VISUAL DESCRIPTION (The "What"): 
   - Literal description for AI Vision & Accessibility (include if the artworks is Black & White or Color] and if the artwork shape is a portrait / Landscape / Square.
8. EXTERNAL LINKS (E-E-A-T Strategy - Total 5 suggestions): 
   - 2x Wikipedia Links (Essential context).
   - 2x High-Authority Non-Wikipedia Links (Museums like Rijksmuseum/Tate, RKD, MoMA, or authoritative Art History definitions).
   - 1x Curator's Choice (The most relevant remaining link).
   - Explain WHY each link increases the authority of the artwork.
9. KEYWORDS: 
   - List 10-15 specific terms. 
   - Mix specific visual elements with thematic concepts.
10. Generate a high-quality alt text for an image that is optimized for accessibility, SEO, large language models, AI vision systems, and geographic relevance.
   - The alt text must:
      - Clearly and objectively describe what is visible in the image
      - Use a natural, complete sentence (no keyword lists)
      - Be concise (maximum 125 characters)
      - Avoid phrases like “image of” or “photo of”
      - Include one primary keyword naturally, only if relevant
      - Mention materials, actions, setting, and mood where visually apparent
      - Reflect the meaning or function of the image in its page context
      - Include geographic or cultural context only if it is factual and visible
      - Use neutral, descriptive language without marketing claims
      - Be understandable without surrounding text
11. FILENAME: "artist-name-title-keyword.webp" (Crucial for SEO).
TONE: Sophisticated, curated, 3rd person.
READY? Ask me for the Image and Artist Details.
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

    // --- NIEUW: ARTIST REFERENCE (GALLERY KOPPELING) ---
    defineField({
      name: 'artist',
      title: 'Artist (Creator)',
      description: 'Select the creator of this artwork. Essential for the Multi-Artist Gallery structure.',
      type: 'reference',
      group: 'general',
      to: [{ type: 'author' }], 
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'headline',
      title: 'Headline (JSON-LD)',
      description: 'A short, punchy sentence for Google results.',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The unique URL part. Suggestion: "artist-title-year".',
      type: 'slug',
      group: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'dateCreated',
      title: 'Date Created',
      description: 'Exact date is preferred for the Timeline (format yyyy-mm-dd). If the exact day is unknown, select January 1st of that year.',
      type: 'date', 
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),

    // --- 2. NARRATIVE & SEO ---
    defineField({
      name: 'categories',
      title: 'Categories', 
      description: 'Choose at least one category to which this artwork belongs.',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    
    // GENRES (Uitgebreid voor Gallery)
    defineField({
      name: 'genre',
      title: 'Genres / Tags',
      description: 'Mainly for SEO and JSON structuring.',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        list: [
          // Arjan's Core Genres
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
          // Nieuwe Gallery Genres
          { title: 'Painting', value: 'Painting' },
          { title: 'Sculpture', value: 'Sculpture' },
          { title: 'Mixed Media', value: 'Mixed Media' },
          { title: 'Abstract', value: 'Abstract' },
        ],
      },
    }),

    defineField({
      name: 'description',
      title: 'Emotional Description (The "Why")',
      description: 'ESSENTIAL FOR SALES & SEO: Paste the "Emotional Description" from the AI output here.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'visualDescription',
      title: 'Visual / Raw Description (The "What")',
      description: 'ACCESSIBILITY & AI: A literal description for visually impaired users and Google Vision.',
      type: 'text',
      group: 'content',
    }),
    
    defineField({
      name: 'externalReferences',
      title: 'External Authority Links (Entity Linking)',
      description: 'AUTHORITY BUILDER: The AI suggests 5 links. Select the best ones.',
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
      description: 'SPECIFICITY: Used for search indexing.',
      type: 'text',
      group: 'content',
    }),

    // MATERIAL (Reference)
    defineField({
      name: 'material',
      title: 'Materials & Finishes',
      description: 'PRICING: Select the standard finish.',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'material' }] }],
    }),

    // --- 3. VISUALS ---
    defineField({
      name: 'mainImage',
      title: 'Main Artwork Image',
      // Instructie aangepast voor Artist-Generic filename
      description: 'IMPORTANT: Before uploading, rename your file! Use: "artist-title-keyword.webp".',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Paste the "Alt Text" from the AI output here.',
        },
      ],
    }),

    // --- 4. PRICING & EDITIONS ---
    // NIEUW: De teller staat nu hier, in de 'editions' groep.
    defineField({
      name: 'inventoryStats',
      title: 'Inventory Stats (Auto-updated)',
      type: 'object',
      group: 'editions',
      readOnly: true, // Wordt door je systeem geüpdatet
      fields: [
        { name: 'soldCount', type: 'number', title: 'Regular Sold', initialValue: 0 },
        { name: 'apSold', type: 'number', title: 'AP Sold', initialValue: 0 },
      ]
    }),

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
      artist: 'artist.name'
    },
    prepare({ title, date, media, artist }) {
      return {
        title: title || 'Untitled',
        subtitle: `${artist || 'No Artist'} | ${date ? new Date(date).getFullYear().toString() : 'No date'}`,
        media: media,
      }
    },
  },
})
