import { defineField, defineType } from 'sanity'
import { TfiPalette } from 'react-icons/tfi'

// --- DEFINING THE LISTS ---
// We define them here so they are easy to edit later

const ARTFORMS = [
  { title: 'Photography', value: 'Photography' },
  { title: 'Mixed Media', value: 'Mixed Media' },
  { title: 'Promptography', value: 'Promptography' },
  { title: 'Digital Art', value: 'Digital Art' },
]

const MEDIUMS = [
  { title: 'Colour Photography', value: 'Colour Photography' },
  { title: 'Black & White Photography', value: 'Black & White Photography' },
  { title: 'Analogue Photography', value: 'Analogue Photography' },
  { title: 'Digital Composite', value: 'Digital Composite' },
]

const MATERIALS = [
  { title: 'Giclée print Ultrachrome on dibond + Matt Plexiglass', value: 'Dibond Matt Plexiglass' },
  { title: 'Giclée print Ultrachrome on dibond + Diasec-Trulife', value: 'Dibond Diasec-Trulife' },
  { title: 'Fine art print on Baryte paper + Museum Glass', value: 'Baryte Museum Glass' },
  { title: 'Fine art print on Hanemühle paper (Unframed)', value: 'Hanemühle Unframed' },
]

export const artwork = defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  icon: TfiPalette,
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'story', title: 'Story & Context' },
    { name: 'specs', title: 'Specifications' },
    { name: 'sales', title: 'Editions & Pricing' },
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
      to: [{ type: 'author' }],
      group: 'details',
    }),
    defineField({
      name: 'year',
      title: 'Year created',
      type: 'string',
      group: 'details',
    }),
    
    // --- IMAGERY ---
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
            }),
        ]
    }),
    defineField({
        name: 'contextImages',
        title: 'In Situ / Context Images',
        type: 'array',
        group: 'details',
        of: [
            {
                type: 'image',
                options: { hotspot: true },
                fields: [
                    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
                    defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
                ]
            }
        ]
    }),

    defineField({
      name: 'teaser',
      title: 'Teaser Text',
      description: 'Short intro for SEO description (<20 words).',
      type: 'text',
      rows: 2,
      group: 'details',
    }),

    // --- 2. STORY ---
    defineField({
      name: 'visualDescription',
      title: 'Visual Description',
      description: 'Literal description for AI and Accessibility.',
      type: 'text',
      rows: 4,
      group: 'story', 
    }),
    defineField({
      name: 'description',
      title: 'Storytelling / Narrative',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'themes',
      title: 'Thematic Keywords',
      type: 'array',
      group: 'story',
      of: [{ type: 'string' }],
    }),

    // --- 3. SPECIFICATIONS (Structured) ---
    defineField({
      name: 'artform',
      title: 'Artform',
      type: 'string',
      group: 'specs',
      options: {
        list: ARTFORMS, // <--- Dropdown 1
      },
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      group: 'specs',
      options: {
        list: MEDIUMS, // <--- Dropdown 2
      },
    }),

    // --- 4. EDITIONS & VARIANTS (With Material Dropdown) ---
    defineField({
      name: 'variants',
      title: 'Available Editions / Sizes',
      description: 'Define the size, material, and price for each version.',
      type: 'array',
      group: 'sales',
      of: [
        {
          type: 'object',
          title: 'Edition Variant',
          fields: [
            defineField({
              name: 'sizeLabel',
              title: 'Label',
              type: 'string',
              initialValue: 'Medium',
              description: 'E.g. Medium, Large, Museum Scale',
            }),
            defineField({
              name: 'dimensions',
              title: 'Dimensions',
              type: 'string',
              description: 'E.g. 40 x 60 cm',
            }),
            // *** NEW: MATERIAL DROPDOWN INSIDE THE VARIANT ***
            defineField({
                name: 'material',
                title: 'Material / Technique',
                type: 'string',
                options: {
                    list: MATERIALS, // <--- Dropdown 3 (Specific finish)
                }
            }),
            defineField({
              name: 'edition',
              title: 'Edition Size',
              type: 'string',
              description: 'E.g. 8 + 2 AP',
            }),
            defineField({
              name: 'price',
              title: 'Price (€)',
              type: 'number',
            }),
            defineField({
              name: 'isSoldOut',
              title: 'Sold Out?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'sizeLabel',
              dim: 'dimensions',
              price: 'price',
              mat: 'material' // Show material in list
            },
            prepare({ title, dim, price, mat }) {
              return {
                title: `${title} (${dim})`,
                subtitle: `€${price} - ${mat || 'No material selected'}`,
              }
            },
          },
        },
      ],
    }),

    defineField({
        name: 'gallery',
        title: 'Represented by (Gallery)',
        type: 'string',
        group: 'sales',
    }),

    // --- 5. SEO ---
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
    }),
  ],
})
