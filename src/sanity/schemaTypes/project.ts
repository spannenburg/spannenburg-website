import { defineField, defineType } from 'sanity'
import { TfiLayers } from 'react-icons/tfi'

export const project = defineType({
  name: 'project',
  title: 'Projects & Series',
  type: 'document',
  icon: TfiLayers,
  groups: [
    { name: 'general', title: '1. Setup & Hierarchy' },
    { name: 'content', title: '2. Narrative & Artworks' },
    { name: 'seo', title: '3. SEO & Metadata' },
  ],
  fields: [
    // --- INSTRUCTIONAL HEADER (Visual only in Studio) ---
    defineField({
      name: 'setupInstruction',
      title: 'READ BEFORE STARTING',
      type: 'string',
      group: 'general',
      description: 'STEP 1: Create specific series first (e.g., CUPIDO). STEP 2: Create the Parent collection (e.g., Historical Figures) and link the series to it.',
      readOnly: true,
    }),

    // --- 1. GENERAL INFO ---
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The name of the series or collection. Example: "CUPIDO" or "Historical Figures".',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'Unique URL path. Click "Generate" after typing the title.',
      type: 'slug',
      group: 'general',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hierarchy',
      title: 'Project Hierarchy',
      description: 'CRITICAL: Set to "Standalone" for a specific series like CUPIDO. Set to "Parent" for a group of series like Historical Figures.',
      type: 'string',
      group: 'general',
      initialValue: 'standalone',
      options: {
        list: [
          { title: 'Standalone Series (Contains Artworks)', value: 'standalone' },
          { title: 'Parent Collection (Contains other Series)', value: 'parent' },
        ],
        layout: 'radio',
      },
    }),

    // --- 2. CONTENT SECTION ---
    defineField({
      name: 'description',
      title: 'Project Statement / Concept',
      description: 'Describe the philosophy, inspiration, and story behind this specific work or collection.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),

    // OPTION A: For Parent Collections
    defineField({
      name: 'subProjects',
      title: 'Included Series (Sub-projects)',
      description: 'ONLY FOR PARENT COLLECTIONS: Add the series that belong here. You must choose one image to represent that series on the overview page.',
      type: 'array',
      group: 'content',
      hidden: ({ document }) => document?.hierarchy !== 'parent',
      of: [
        {
          type: 'object',
          name: 'subProjectItem',
          title: 'Linked Series',
          fields: [
            defineField({ 
              name: 'projectRef', 
              title: 'Select Series', 
              type: 'reference', 
              to: [{ type: 'project' }],
              description: 'Select an existing standalone series.'
            }),
            defineField({ 
              name: 'highlightImage', 
              title: 'Overview Highlight Image', 
              type: 'image', 
              options: { hotspot: true },
              description: 'The representative image for this series within the Parent page.' 
            }),
          ],
          preview: {
            select: { title: 'projectRef.title', media: 'highlightImage' },
            prepare({ title, media }) {
              return { title: title, media: media }
            }
          },
        },
      ],
    }),

    // OPTION B: For Standalone Series
    defineField({
      name: 'artworks',
      title: 'Artworks in this Series',
      description: 'ONLY FOR STANDALONE SERIES: Link the individual artworks that belong to this series.',
      type: 'array',
      group: 'content',
      hidden: ({ document }) => document?.hierarchy === 'parent',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
    }),

    // --- 3. SEO ---
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      description: 'Help AI and Search Engines find this project. E.g., "Queer History, Religious Iconography, Contemporary Portraiture".',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
    }),
  ],
})
