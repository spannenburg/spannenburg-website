import { defineField, defineType } from 'sanity'
import { TfiMapAlt } from 'react-icons/tfi'

export const exhibition = defineType({
  name: 'exhibition',
  title: 'Exhibitions',
  type: 'document',
  icon: TfiMapAlt,
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'location', title: 'Location (Venue)' }, // Updated Title
    { name: 'story', title: 'Story & Visuals' },
    { name: 'artworks', title: 'Artworks & Curator' },
    { name: 'proof', title: 'Social Proof (E-E-A-T)' },
    { name: 'seo', title: 'SEO & AI' },
  ],
  fields: [
    // --- 1. GENERAL INFO ---
    defineField({
      name: 'title',
      title: 'Exhibition Name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Exhibition Type',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Solo Exhibition', value: 'solo' },
          { title: 'Group Exhibition', value: 'group' },
          { title: 'Art Fair / Festival', value: 'fair' },
          { title: 'Museum Exhibition', value: 'museum' },
          { title: 'Hybrid / Online', value: 'hybrid' },
        ],
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      group: 'general',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (Teaser)',
      description: '1-2 sentences. Used for SEO descriptions and overview pages.',
      type: 'text',
      rows: 3,
      group: 'general',
    }),

    // --- 2. LOCATION (LINK TO VENUE) ---
    // REPLACED: Manual fields are gone. Now we link to the Venue document.
    defineField({
      name: 'venue',
      title: 'Venue / Location',
      description: 'Select the gallery or location where this took place.',
      type: 'reference',
      to: [{ type: 'venue' }], // Links to venue.ts
      group: 'location',
    }),
    defineField({
        name: 'locationNotes',
        title: 'Location Notes (Specific to this event)',
        description: 'E.g. "Booth 42 in Hall 3" or "First floor only"',
        type: 'string',
        group: 'location',
    }),

    // --- 3. STORY & VISUALS ---
    defineField({
      name: 'description',
      title: 'Long Description / Curatorial Text',
      description: 'The story, theme, and concept (150-300 words).',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'images',
      title: 'Exhibition Photos',
      description: 'Atmosphere shots, opening night, installation views.',
      type: 'array',
      group: 'story',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text (SEO)',
            }),
          ],
        },
      ],
    }),

    // --- 4. ARTWORKS & CURATOR ---
    defineField({
        name: 'curator',
        title: 'Curator / Organizer',
        type: 'object',
        group: 'artworks',
        fields: [
            defineField({ name: 'name', type: 'string', title: 'Name' }),
            defineField({ 
                name: 'bio', 
                type: 'text', 
                rows: 3, 
                title: 'Short Bio (Expertise)' 
            }),
        ]
    }),
    defineField({
        name: 'partners',
        title: 'Partners & Sponsors',
        type: 'array',
        group: 'artworks',
        of: [{type: 'string'}],
        description: 'List of foundations, museums or partners (Trust signals).'
    }),
    defineField({
      name: 'exhibitedArtworks',
      title: 'Artworks in this Exhibition',
      type: 'array',
      group: 'artworks',
      of: [
        {
          type: 'object',
          title: 'Artwork Entry',
          preview: {
            select: {
              title: 'artworkReference.title',
              subtitle: 'context',
            }
          },
          fields: [
            defineField({
              name: 'artworkReference',
              title: 'Select Artwork',
              type: 'reference',
              to: [{ type: 'artwork' }],
            }),
            defineField({
                name: 'context',
                title: 'Presentation / Context',
                type: 'string',
                description: 'E.g. "Hung in the main hall", "First public reveal"'
            }),
            defineField({
                name: 'availability',
                title: 'Availability during show',
                type: 'string',
                options: {
                    list: [
                        {title: 'Available', value: 'available'},
                        {title: 'Sold at event', value: 'sold'},
                        {title: 'Display only', value: 'display'},
                    ]
                }
            })
          ],
        },
      ],
    }),
    defineField({
        name: 'otherArtists',
        title: 'Other Artists Present',
        description: 'Increases Authority by association.',
        type: 'array',
        group: 'artworks',
        of: [
            {
                type: 'object',
                fields: [
                    defineField({name: 'name', type: 'string', title: 'Name'}),
                    defineField({name: 'website', type: 'url', title: 'Website'}),
                    defineField({name: 'notes', type: 'string', title: 'Notable Awards/Info'}),
                ]
            }
        ]
    }),

    // --- 5. SOCIAL PROOF & DOCUMENTS ---
    defineField({
        name: 'statistics',
        title: 'Visitors / Footfall',
        type: 'number',
        group: 'proof',
        description: 'Estimated visitors (Social Proof).',
    }),
    defineField({
        name: 'press',
        title: 'Press & Reviews',
        type: 'array',
        group: 'proof',
        of: [
            {
                type: 'object',
                title: 'Review / Article',
                fields: [
                    defineField({name: 'title', type: 'string', title: 'Article Title'}),
                    defineField({name: 'publisher', type: 'string', title: 'Publisher/Newspaper'}),
                    defineField({name: 'url', type: 'url', title: 'Link'}),
                    defineField({name: 'quote', type: 'text', rows: 2, title: 'Highlight Quote'}),
                ]
            }
        ]
    }),
    defineField({
        name: 'documentation',
        title: 'Catalog / Documentation',
        group: 'proof',
        type: 'file',
        description: 'Upload the PDF catalog or flyer (Proof of existence).',
    }),
    defineField({
        name: 'awards',
        title: 'Awards / Nominations',
        group: 'proof',
        type: 'array',
        of: [{type: 'string'}],
        description: 'Was this exhibition nominated for anything?'
    }),

    // --- 6. SEO & META ---
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords / Tags',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
    }),
  ],
})
