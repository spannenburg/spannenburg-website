import { defineField, defineType } from 'sanity'
import { TfiWrite } from 'react-icons/tfi'

export const post = defineType({
  name: 'post',
  title: 'Journal / News',
  type: 'document',
  icon: TfiWrite,
  groups: [
    { name: 'content', title: 'Story Content' },
    { name: 'links', title: 'Relations & Bridge' },
    { name: 'seo', title: 'SEO & AI Meta' },
  ],
  fields: [
    // --- 1. CONTENT ---
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postType',
      title: 'Post Category',
      description: 'Select "Research & Process" if this post documents the study behind an artwork.',
      type: 'string',
      group: 'content',
      initialValue: 'news',
      options: {
        list: [
          { title: 'General News', value: 'news' },
          { title: 'Research & Process', value: 'research' },
          { title: 'Exhibition Review', value: 'review' },
          { title: 'Behind the Scenes', value: 'bts' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }, { type: 'image' }],
    }),

    // --- 2. RELATIONS (Research Logic Added Here) ---
    defineField({
      name: 'isResearchPost',
      title: 'Is this a Research post?',
      description: 'Toggle this to link the final artworks resulting from this research.',
      type: 'boolean',
      group: 'links',
      initialValue: false,
    }),
    defineField({
      name: 'researchResults',
      title: 'Resulting Artworks',
      description: 'Link the specific artworks that were born from this research project.',
      type: 'array',
      group: 'links',
      // This field ONLY shows up if the toggle above is TRUE
      hidden: ({ document }) => !document?.isResearchPost,
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
    }),
    defineField({
      name: 'dutchSourceUrl',
      title: 'Original Dutch Article URL',
      description: 'Link to arjanspannenburg.nl to build the domain bridge.',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'relatedVenue',
      title: 'Related Venue (GEO)',
      type: 'reference',
      to: [{ type: 'venue' }],
      group: 'links',
    }),

    // --- 3. SEO ---
    defineField({
      name: 'excerpt',
      title: 'Excerpt (LLMO Summary)',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
})
