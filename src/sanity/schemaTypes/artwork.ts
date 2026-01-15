import { defineField, defineType } from 'sanity'
import { TfiPalette } from 'react-icons/tfi'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  icon: TfiPalette,
  // Tabs to organize the fields
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'story', title: 'Story & Context' },
    { name: 'specs', title: 'Specifications' },
    { name: 'sales', title: 'Exhibition & Sales' },
    { name: 'seo', title: 'SEO & AI' },
  ],
  fields: [
    // --- 1. HERO / TITLE BLOCK ---
    defineField({
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'author' }], // Assuming you have an author.ts
      group: 'details',
    }),
    defineField({
      name: 'year',
      title: 'Year created',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser Text',
      description: 'Short, powerful intro (<20 words). Used for Description meta tag.',
      type: 'text',
      rows: 2,
      group: 'details',
      validation: (rule) => rule.max(160).warning('Keep it short for SEO!'),
    }),
    defineField({
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: { hotspot: true },
        group: 'details',
        fields: [
            defineField({
                name: 'alt',
                type: 'string',
                title: 'Alt Text',
                description: 'Describe the image for SEO and accessibility',
            }),
        ]
    }),

    // --- 2. STORY BLOCK ---
    defineField({
      name: 'description',
      title: 'Storytelling',
      description: 'The narrative, emotion, and theme (150-300 words).',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'themes',
      title: 'Thematic Keywords',
      description: 'E.g. Intimacy, Identity, Queer Art (For LLM & SEO)',
      type: 'array',
      group: 'story',
      of: [{ type: 'string' }],
    }),

    // --- 3. SPECIFICATIONS / TECH BLOCK ---
    defineField({
      name: 'medium',
      title: 'Medium',
      description: 'E.g. Colour Photography',
      type: 'string',
      group: 'specs',
    }),
    defineField({
      name: 'artform',
      title: 'Artform',
      description: 'E.g. Photography, Sculpture',
      type: 'string',
      group: 'specs',
    }),
    defineField({
      name: 'materials',
      title: 'Materials Used',
      description: 'E.g. Giclée print, Dibond, Museum glass',
      type: 'array',
      group: 'specs',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions (cm)',
      type: 'object',
      group: 'specs',
      fields: [
        defineField({ name: 'height', type: 'number', title: 'Height' }),
        defineField({ name: 'width', type: 'number', title: 'Width' }),
        defineField({ name: 'depth', type: 'number', title: 'Depth (optional)' }),
      ],
    }),

    // --- 4. EXHIBITION & SALES BLOCK ---
    defineField({
      name: 'edition',
      title: 'Edition Info',
      description: 'E.g. 6 + 2 AP',
      type: 'string',
      group: 'sales',
    }),
    defineField({
      name: 'price',
      title: 'Price (€)',
      type: 'number',
      group: 'sales',
    }),
    defineField({
        name: 'availability',
        title: 'Availability',
        type: 'string',
        options: {
            list: [
                { title: 'Available', value: 'available' },
                { title: 'Sold', value: 'sold' },
                { title: 'Reserved', value: 'reserved' },
                { title: 'On Loan', value: 'loan' },
            ]
        },
        group: 'sales',
    }),
    defineField({
        name: 'gallery',
        title: 'Represented by (Gallery)',
        type: 'string', // Or make this a reference to a 'venue' type if you want
        description: 'Where is this sold? E.g. Zerp Galerie',
        group: 'sales',
    }),

    // --- 5. SEO & STRUCTURED DATA (Hidden helpers) ---
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      description: 'Semantic keywords for Google and AI.',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
    }),
  ],
})
