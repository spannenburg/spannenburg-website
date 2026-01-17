import { defineField, defineType } from 'sanity'
import { TfiUser } from 'react-icons/tfi'

export const author = defineType({
  name: 'author', // Let op: technische naam houden we even op 'author' voor backward compatibility, in de studio heet het 'Artist'
  title: 'Artist Profile',
  type: 'document',
  icon: TfiUser,
  groups: [
    { name: 'details', title: 'Profile Details' },
    { name: 'story', title: 'Biography & CV' },
    { name: 'management', title: 'Representation' }, // Nieuwe groep voor je vraag
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
          description: 'Descriptive text for the portrait.',
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

    // --- 3. CV & CAREER PROOF ---
    defineField({
      name: 'cv',
      title: 'Curriculum Vitae (Exhibitions)',
      description: 'List solo and group exhibitions, education, and collections.',
      type: 'array',
      group: 'story',
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

    // --- 5. GALLERY MANAGEMENT (Jouw Vraag) ---
    defineField({
      name: 'isRepresentedByUs',
      title: 'Represented by Spannenburg.Art?',
      description: 'CHECK: Does this gallery actively represent/sell this artist? UNCHECK: If this artist is only mentioned for exhibitions/SEO (E-E-A-T).',
      type: 'boolean',
      group: 'management',
      initialValue: false, // Standaard uit, tenzij jij het aanvinkt
    }),

    defineField({
      name: 'representedByVenues',
      title: 'Represented by Other Galleries (Venues)',
      description: 'OPTIONAL: Select external galleries (Venues) that also represent this artist. Good for E-E-A-T (Cross-referencing).',
      type: 'array',
      group: 'management',
      of: [{ type: 'reference', to: [{ type: 'venue' }] }], // Hier koppel je aan Venues
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
        subtitle: isUs ? '✅ Represented by Us' : 'Guest / Peer',
        media: media,
      }
    },
  },
})
