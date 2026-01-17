import { defineField, defineType } from 'sanity'
import { TfiStar, TfiCup } from 'react-icons/tfi' // Cup icoon toegevoegd

export const author = defineType({
  name: 'author', 
  title: 'Represented Artists', 
  type: 'document',
  icon: TfiStar,
  groups: [
    { name: 'details', title: 'Profile Details' },
    { name: 'story', title: 'Biography & Vision' },
    { name: 'history', title: 'Education & Legacy' },
    { name: 'awards', title: 'Awards & Honors' }, // <--- NIEUWE GROEP
    { name: 'management', title: 'Representation' },
  ],
  fields: [
    // --- 1. IDENTITEIT ---
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Artist Portrait',
      type: 'image',
      group: 'details',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }]
    }),

    // --- 2. BIOGRAFIE ---
    defineField({
      name: 'shortBio',
      title: 'Short Bio (Summary)',
      type: 'text',
      group: 'story',
      rows: 3,
    }),
    defineField({
      name: 'bio',
      title: 'Full Biography',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'statement',
      title: 'Artist Statement',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),

    // --- 3. CV (Historisch) ---
    defineField({
      name: 'cv',
      title: 'Education & Historical CV',
      description: '⚠️ NOTE: Do NOT list new exhibitions here. They are automatically fetched from the "Exhibitions" module. Use this field ONLY for Education and pre-2024 exhibitions.',
      type: 'array',
      group: 'history',
      of: [{ type: 'block' }], 
    }),

    // --- 4. AWARDS (NIEUW: INGEBOUWD) ---
    defineField({
      name: 'awards',
      title: 'Awards & Honors',
      description: 'Manage the awards directly here.',
      type: 'array',
      group: 'awards',
      of: [
        {
          type: 'object',
          title: 'Award',
          icon: TfiCup,
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              initialValue: new Date().getFullYear().toString(),
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Award Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'organization',
              title: 'Organization / Institution',
              type: 'string',
            }),
            defineField({
              name: 'associatedArtwork',
              title: 'Winning Artwork (Optional)',
              type: 'reference',
              to: [{ type: 'artwork' }, { type: 'project' }]
            },),
            defineField({
              name: 'image',
              title: 'Logo / Badge (Optional)',
              type: 'image'
            })
          ],
          preview: {
            select: { title: 'title', year: 'year', org: 'organization', media: 'image' },
            prepare({ title, year, org, media }) {
              return {
                title: title,
                subtitle: `${year} | ${org || ''}`,
                media: media || TfiCup
              }
            }
          }
        }
      ]
    }),
    
    // --- 5. SOCIALS ---
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }),

    // --- 6. MANAGEMENT ---
    defineField({
      name: 'isRepresentedByUs',
      title: 'Represented by Spannenburg.Art?',
      type: 'boolean',
      group: 'management',
      initialValue: false, 
    }),
    defineField({
      name: 'representedByVenues',
      title: 'Represented by Other Galleries',
      type: 'array',
      group: 'management',
      of: [{ type: 'reference', to: [{ type: 'venue' }] }], 
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image', isUs: 'isRepresentedByUs' },
    prepare({ title, media, isUs }) {
      return {
        title: title,
        subtitle: isUs ? '✅ Represented Artist' : 'Profile only',
        media: media,
      }
    },
  },
})
