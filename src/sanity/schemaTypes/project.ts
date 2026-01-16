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
    { name: 'gallery', title: 'The Artworks' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // --- 1. DETAILS ---
    defineField({
      name: 'title',
      title: 'Project / Series Title',
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
        name: 'status',
        title: 'Status',
        type: 'string',
        group: 'details',
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
      description: 'E.g. "2020 - Present" or "2012"',
      group: 'details',
    }),
    defineField({
        name: 'coverImage',
        title: 'Cover Image (Representative Work)',
        type: 'image',
        options: { hotspot: true },
        group: 'details',
    }),

    // --- 2. STORY (The Concept) ---
    defineField({
      name: 'intro',
      title: 'Short Introduction',
      description: 'Appears on the overview page. Hook the reader.',
      type: 'text',
      rows: 3,
      group: 'story',
    }),
    defineField({
      name: 'statement',
      title: 'Project Statement / Concept',
      description: 'Deep dive into the philosophy of this specific series. (LLMO/AI context).',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),

    // --- 3. THE ARTWORKS (UX: The Gallery) ---
    defineField({
        name: 'artworks',
        title: 'Artworks in this Series',
        description: 'Select the artworks that belong to this project. Drag to reorder.',
        type: 'array',
        group: 'gallery',
        of: [
            {
                type: 'reference',
                to: [{ type: 'artwork' }]
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
