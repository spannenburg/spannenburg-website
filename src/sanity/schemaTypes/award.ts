import { defineField, defineType } from 'sanity'
import { TfiMedall } from 'react-icons/tfi'

export const award = defineType({
  name: 'award',
  title: 'Awards & Nominations',
  type: 'document',
  icon: TfiMedall,
  groups: [
    { name: 'general', title: 'Award Details' },
    { name: 'content', title: 'Context & Jury' },
    { name: 'media', title: 'Visual Proof' },
  ],
  fields: [
    // --- 1. GENERAL INFO ---
    defineField({
      name: 'title',
      title: 'Award Title',
      description: 'The official name of the award. E.g., "Fine Art Photography Award 2026"',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Organization / Institution',
      description: 'Who gave the award? E.g., "LensCulture", "Sony World Photography", or link to a Venue.',
      type: 'string', // You can change this to a reference to 'venue' if it's a gallery/museum
      group: 'general',
    }),
    defineField({
      name: 'date',
      title: 'Year / Date',
      type: 'date',
      options: { dateFormat: 'YYYY' },
      group: 'general',
    }),
    defineField({
      name: 'type',
      title: 'Result / Placement',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Winner (1st Place)', value: 'winner' },
          { title: 'Runner-up / 2nd-3rd', value: 'runner_up' },
          { title: 'Shortlisted / Finalist', value: 'finalist' },
          { title: 'Honorable Mention', value: 'honorable_mention' },
          { title: 'Merit', value: 'merit' },
          { title: 'Nominee', value: 'nominee' },
        ],
      },
    }),

    // --- 2. CONTEXT & JURY ---
    defineField({
      name: 'winningArtwork',
      title: 'Winning Artwork',
      description: 'If this award was for a specific work, link it here.',
      type: 'reference',
      to: [{ type: 'artwork' }],
      group: 'content',
    }),
    defineField({
      name: 'juryReport',
      title: 'Jury Report / Quote',
      description: 'What did the jury say? Quotes from experts are excellent for Authority (E-E-A-T).',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
        name: 'officialUrl',
        title: 'Link to official announcement',
        type: 'url',
        group: 'content',
      }),

    // --- 3. VISUALS ---
    defineField({
      name: 'image',
      title: 'Logo / Badge / Certificate',
      description: 'Upload the official badge or a photo of the certificate.',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'E.g., "Winner badge for LensCulture Art Photography Awards"',
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      inst: 'institution',
      date: 'date',
      type: 'type',
      media: 'image',
    },
    prepare({ title, inst, date, type, media }) {
      const year = date ? date.split('-')[0] : ''
      const typeLabel = type ? type.replace('_', ' ').toUpperCase() : ''
      return {
        title: title || 'Untitled Award',
        subtitle: `${year} | ${typeLabel} | ${inst || 'Independent'}`,
        media: media,
      }
    },
  },
})
