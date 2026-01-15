import { defineArrayMember, defineField, defineType } from 'sanity'
import { TscIcon, TagIcon, BasketIcon, ImageIcon } from '@sanity/icons'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork (Individual)',
  type: 'document',
  icon: ImageIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'specs', title: 'Technical Specs' },
    { name: 'commercial', title: 'Editions & Sales', icon: BasketIcon },
    { name: 'seo', title: 'SEO & AI Context', icon: TscIcon },
  ],
  fields: [
    // --- 1. CONTENT ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Artwork Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
        metadata: ['lqip', 'palette', 'exif'],
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text (AI Description)',
          description: 'Describe the image for blind users and AI (e.g., "Black and white portrait of a man looking down...")',
          type: 'text',
          rows: 2,
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentSeries',
      title: 'Part of Series',
      type: 'reference',
      group: 'content',
      to: [{ type: 'project' }], // Verwijst naar jouw Series (projecten)
    }),
    defineField({
      name: 'description',
      title: 'Description / Story',
      type: 'array', 
      group: 'content',
      of: [{ type: 'block' }], // Rich text voor het verhaal achter het werk
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video / Behind the Scenes (YouTube URL)',
      type: 'url',
      group: 'content',
      description: 'Link to a YouTube video about this work (schema.org/video)',
    }),

    // --- 2. TECHNICAL SPECS ---
    defineField({
      name: 'dateCreated',
      title: 'Date Created / Year',
      type: 'string',
      group: 'specs',
      placeholder: '2025 or 2018-2022',
    }),
    defineField({
      name: 'medium',
      title: 'Art Medium (Broad)',
      type: 'string',
      group: 'specs',
      options: {
        list: [
          { title: 'Fine Art Photography', value: 'Photography' },
          { title: 'Textile Art', value: 'Textile' },
          { title: 'Mixed Media', value: 'Mixed Media' },
          { title: 'Sculpture', value: 'Sculpture' },
        ],
      },
    }),
    defineField({
      name: 'materials',
      title: 'Materials (Specific)',
      description: 'E.g. Giclée print, Dibond, Museum glass, Polyamide',
      type: 'array',
      group: 'specs',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // --- 3. COMMERCIAL (EDITIONS) ---
    defineField({
      name: 'editions',
      title: 'Editions & Pricing',
      description: 'Define the different sizes/variants available for this work',
      type: 'array',
      group: 'commercial',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'variant',
          title: 'Edition Variant',
          icon: BasketIcon,
          fields: [
            defineField({
              name: 'name',
              title: 'Edition Name',
              type: 'string',
              placeholder: 'Edition KLEIN (40x60)',
            }),
            defineField({
              name: 'sku',
              title: 'SKU',
              type: 'string',
            }),
            defineField({
              name: 'width',
              title: 'Width (cm)',
              type: 'number',
            }),
            defineField({
              name: 'height',
              title: 'Height (cm)',
              type: 'number',
            }),
            defineField({
              name: 'price',
              title: 'Price (EUR)',
              type: 'number',
            }),
            defineField({
              name: 'availability',
              title: 'Availability',
              type: 'string',
              options: {
                list: [
                  { title: 'In Stock / Available', value: 'https://schema.org/InStock' },
                  { title: 'Limited Availability', value: 'https://schema.org/LimitedAvailability' },
                  { title: 'Sold Out', value: 'https://schema.org/SoldOut' },
                  { title: 'PreOrder', value: 'https://schema.org/PreOrder' },
                ],
              },
              initialValue: 'https://schema.org/InStock',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              price: 'price',
              sku: 'sku',
            },
            prepare({ title, price, sku }) {
              return {
                title: title,
                subtitle: `€${price} - SKU: ${sku}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
        name: 'seller',
        title: 'Represented by / Seller',
        type: 'string',
        group: 'commercial',
        placeholder: 'e.g. Zerp Galerie',
        initialValue: 'Zerp Galerie'
    }),
    defineField({
        name: 'sellerUrl',
        title: 'Seller Website',
        type: 'url',
        group: 'commercial',
        initialValue: 'https://www.zerp.nl'
    }),

    // --- 4. SEO & AI CONTEXT ---
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Simple keywords: e.g. "Black and white", "Ballet", "Vrijheid"',
    }),
    defineField({
      name: 'semanticConcepts',
      title: 'Semantic Concepts (The "About" field)',
      description: 'Connect this artwork to Wikipedia entities for AI understanding.',
      type: 'array',
      group: 'seo',
      of: [
        defineArrayMember({
          type: 'object',
          icon: TagIcon,
          fields: [
            defineField({
              name: 'name',
              title: 'Concept Name',
              type: 'string',
              placeholder: 'e.g. Social Alienation',
            }),
            defineField({
              name: 'url',
              title: 'Wikipedia/Wikidata URL',
              type: 'url',
              placeholder: 'https://en.wikipedia.org/wiki/Social_alienation',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      series: 'parentSeries.title',
      year: 'dateCreated'
    },
    prepare({ title, media, series, year }) {
      return {
        title,
        subtitle: `${series ? series : 'No Series'} | ${year ? year : ''}`,
        media,
      }
    },
  },
})
