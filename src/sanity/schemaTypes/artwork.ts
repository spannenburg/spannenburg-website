import { defineField, defineType } from 'sanity'
import { TfiPalette } from 'react-icons/tfi'

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
        title: 'Main Image (The Artwork)',
        description: 'The pure image of the artwork itself.',
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
    
    // --- CONTEXT IMAGES ---
    defineField({
        name: 'contextImages',
        title: 'In Situ / Context Images',
        description: 'Photos of the work hanging in a room, gallery views, or mockups.',
        type: 'array',
        group: 'details',
        of: [
            {
                type: 'image',
                options: { hotspot: true },
                fields: [
                    defineField({
                        name: 'caption',
                        type: 'string',
                        title: 'Caption',
                        description: 'E.g. "Installation view at Zerp Galerie"'
                    }),
                    defineField({
                        name: 'alt',
                        type: 'string',
                        title: 'Alt Text',
                    }),
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

    // --- 2. STORY & CONTEXT BLOCK ---
    
    // *** NEW: VISUAL DESCRIPTION ***
    defineField({
      name: 'visualDescription',
      title: 'Visual Description',
      description: 'Literal description of what is seen in the image. Useful for AI and Accessibility (Alt Text).',
      type: 'text',
      rows: 4,
      group: 'story', 
    }),

    defineField({
      name: 'description',
      title: 'Storytelling / Narrative',
      description: 'The deeper meaning, emotion, and theme (150-300 words).',
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

    // --- 3. SPECIFICATIONS (Global) ---
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
      description: 'E.g. Photography',
      type: 'string',
      group: 'specs',
    }),
    defineField({
      name: 'materials',
      title: 'Materials & Technique',
      description: 'E.g. Giclée print Ultrachrome on dibond...',
      type: 'text',
      rows: 3,
      group: 'specs',
    }),

    // --- 4. EDITIONS & VARIANTS ---
    defineField({
      name: 'variants',
      title: 'Available Editions / Sizes',
      description: 'Add the different sizes and prices here.',
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
              description: 'Just the number (e.g. 1850)',
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
            },
            prepare({ title, dim, price }) {
              return {
                title: `${title} (${dim})`,
                subtitle: `€ ${price}`,
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
