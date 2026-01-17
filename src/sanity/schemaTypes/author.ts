import { defineField, defineType } from 'sanity'
import { TfiStar } from 'react-icons/tfi' // Aangepast naar Ster voor "Main Artist"

export const author = defineType({
  name: 'author', // INTERNE NAAM: Blijft 'author' (Data behoud)
  title: 'Represented Artists', // EXTERNE TITEL: Aangepast voor duidelijkheid
  type: 'document',
  icon: TfiStar,
  groups: [
    { name: 'details', title: 'Profile Details' },
    { name: 'story', title: 'Biography & Vision' },
    { name: 'history', title: 'Education & Legacy' }, // NIEUWE GROEP voor CV/Opleiding
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
      description: 'The URL for the artist page (e.g. /artists/arjan-spannenburg)',
      type: 'slug',
      group: 'details',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Artist Portrait',
      type: 'image',
      group: 'details',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }
      ]
    }),

    // --- 2. BIOGRAFIE & STATEMENT ---
    defineField({
      name: 'shortBio',
      title: 'Short Bio (Summary)',
      description: 'Used for cards and previews. Max 3 sentences.',
      type: 'text',
      group: 'story',
      rows: 3,
    }),
    defineField({
      name: 'bio',
      title: 'Full Biography',
      description: 'The complete life story and career background.',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'statement',
      title: 'Artist Statement',
      description: 'The philosophy behind the work. "Why do I create?"',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),

    // --- 3. CV & EDUCATION (Aangepast voor Single Source of Truth) ---
    defineField({
      name: 'cv', // NAAM BLIJFT 'cv' -> Je verliest GEEN data!
      title: 'Education & Historical CV', // Titel aangepast
      description: '⚠️ NOTE: Do NOT list new exhibitions here. They are automatically fetched from the "Exhibitions" module. Use this field ONLY for Education, Awards, and old exhibitions (pre-2024).',
      type: 'array',
      group: 'history', // Verplaatst naar history groep
      of: [{ type: 'block' }], 
    }),
    
    // --- 4. CONTACT & SOCIALS ---
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform (e.g. Instagram)', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }),

    // --- 5. GALLERY MANAGEMENT ---
    defineField({
      name: 'isRepresentedByUs',
      title: 'Represented by Spannenburg.Art?',
      description: 'CHECK: If we sell this artist. UNCHECK: If strictly for SEO/Context.',
      type: 'boolean',
      group: 'management',
      initialValue: false, 
    }),

    defineField({
      name: 'representedByVenues',
      title: 'Represented by Other Galleries (Venues)',
      description: 'Which external galleries represent this artist? (Good for Authority building).',
      type: 'array',
      group: 'management',
      of: [{ type: 'reference', to: [{ type: 'venue' }] }], 
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      isUs: 'isRepresentedByUs'
    },
    prepare({ title, media, isUs }) {
      return {
        title: title,
        subtitle: isUs ? '✅ Represented Artist' : 'Profile only',
        media: media,
      }
    },
  },
})
