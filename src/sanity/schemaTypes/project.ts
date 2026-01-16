import { defineField, defineType } from 'sanity'
import { TfiLayers } from 'react-icons/tfi'

export const project = defineType({
  name: 'project',
  title: 'Projects / Series',
  type: 'document',
  icon: TfiLayers,
  groups: [
    { name: 'details', title: 'Project Details' },
    { name: 'story', title: 'Statement & Context' },
    { name: 'content', title: 'Content / Gallery' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    // --- 1. DETAILS ---
    defineField({
      name: 'title',
      title: 'Project Title',
      description: 'E.g. "Historical Figures"',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'details',
      initialValue: 'ongoing',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'period',
      title: 'Time Period',
      type: 'string',
      description: 'E.g. "2020 - 2024"',
      group: 'details',
    }),

    // --- 2. STORY ---
    defineField({
      name: 'intro',
      title: 'Short Introduction',
      description: 'Hook for the overview page (LLMO context).',
      type: 'text',
      rows: 3,
      group: 'story',
    }),
    defineField({
      name: 'statement',
      title: 'Project Statement',
      description: 'The philosophical backbone of the whole project.',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),

    // --- 3. THE CONTENT (Hier lossen we het op!) ---
    defineField({
      name: 'projectLayout',
      title: 'Project Structure',
      description: 'Does this project consist of loose works or sub-series?',
      type: 'array',
      group: 'content',
      of: [
        // OPTIE A: Losse kunstwerken (Voor Saint Sebastian-type situaties)
        {
          name: 'artworkReference',
          title: 'Individual Artwork',
          type: 'reference',
          to: [{ type: 'artwork' }]
        },
        // OPTIE B: Een Sub-Serie (Voor Cupido / John the Baptist situaties)
        {
          name: 'subSeries',
          title: 'Sub-Series Group',
          type: 'object',
          fields: [
            defineField({ name: 'subTitle', title: 'Sub-Series Title', type: 'string' }),
            defineField({ name: 'subDescription', title: 'Brief Context', type: 'text', rows: 2 }),
            defineField({
              name: 'subArtworks',
              title: 'Artworks in this Sub-Series',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'artwork' }] }]
            })
          ],
          preview: {
            select: { title: 'subTitle' },
            prepare({ title }) { return { title: `SERIES: ${title}` } }
          }
        }
      ]
    }),

    // --- 4. SEO ---
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
    }),
  ],
})
