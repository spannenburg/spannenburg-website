import { defineField, defineType } from 'sanity'
import { TfiMedall } from 'react-icons/tfi'

export const award = defineType({
  name: 'award',
  title: 'Awards & Nominations',
  type: 'document',
  icon: TfiMedall,
  groups: [
    { name: 'details', title: 'Award Details' },
    { name: 'proof', title: 'Proof & Jury Report' },
  ],
  fields: [
    // --- DETAILS ---
    defineField({
      name: 'title',
      title: 'Award Title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
      description: 'E.g. "Fine Art Photography Award 2026"',
    }),
    defineField({
      name: 'organization',
      title: 'Organization / Institution',
      type: 'string',
      group: 'details',
      description: 'Who gave the award? E.g. "LensCulture" or "Sony World Photography"',
    }),
    defineField({
      name: 'year',
      title: 'Year / Date',
      type: 'date',
      group: 'details',
      options: {
        dateFormat: 'YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
            { title: 'Winner (1st Place)', value: 'winner' },
            { title: 'Runner-up / 2nd-3rd', value: 'runner_up' },
            { title: 'Shortlisted / Finalist', value: 'shortlist' },
            { title: 'Honorable Mention', value: 'mention' },
            { title: 'Nominee', value: 'nominee' },
        ],
        layout: 'radio'
      },
      initialValue: 'winner'
    }),
    
    // --- KOPPELING MET KUNSTWERK (De "Killer Feature") ---
    defineField({
        name: 'associatedArtwork',
        title: 'Winning Artwork',
        description: 'If this award was for a specific work, link it here.',
        type: 'reference',
        to: [{ type: 'artwork' }],
        group: 'details',
    }),

    // --- PROOF & CONTEXT ---
    defineField({
        name: 'juryReport',
        title: 'Jury Report / Quote',
        description: 'What did the jury say? Excellent for Authority.',
        type: 'text',
        rows: 4,
        group: 'proof',
    }),
    defineField({
        name: 'image',
        title: 'Logo / Badge / Certificate',
        type: 'image',
        options: { hotspot: true },
        group: 'proof',
    }),
    defineField({
        name: 'link',
        title: 'Link to official announcement',
        type: 'url',
        group: 'proof',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
      media: 'image',
      year: 'year'
    },
    prepare({ title, subtitle, media, year }) {
      return {
        title: title,
        subtitle: `${year ? year.split('-')[0] : ''} - ${subtitle}`,
        media: media,
      }
    },
  },
})
