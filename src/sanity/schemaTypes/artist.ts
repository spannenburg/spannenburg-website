import { defineField, defineType } from 'sanity'
import { TfiUser } from 'react-icons/tfi'

export const author = defineType({
  name: 'author',
  title: 'Artist Profile', // Hernoemd van Author naar Artist Profile
  type: 'document',
  icon: TfiUser,
  fields: [
    // --- 1. IDENTITEIT ---
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The URL for the artist page (e.g. /artists/arjan-spannenburg)',
      type: 'slug',
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
      rows: 3,
    }),
    defineField({
      name: 'bio',
      title: 'Full Biography',
      description: 'The complete life story and career background.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'statement',
      title: 'Artist Statement',
      description: 'The philosophy behind the work. "Why do I create?"',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // --- 3. CV & CAREER PROOF (Cruciaal voor E-E-A-T) ---
    defineField({
      name: 'cv',
      title: 'Curriculum Vitae (Exhibitions)',
      description: 'List solo and group exhibitions, education, and collections.',
      type: 'array',
      of: [{ type: 'block' }], // We gebruiken block text zodat je dit netjes kunt opmaken (lijstjes, jaartallen)
    }),
    
    // --- 4. CONTACT & SOCIALS ---
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
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
      name: 'isRepresented',
      title: 'Represented by Gallery?',
      description: 'Is this artist currently active/represented on Spannenburg.Art?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
