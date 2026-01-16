import { defineField, defineType } from 'sanity'
import { TfiWrite } from 'react-icons/tfi'

export const post = defineType({
  name: 'post',
  title: 'Journal / News',
  type: 'document',
  icon: TfiWrite,
  groups: [
    { name: 'content', title: 'Story Content' },
    { name: 'links', title: 'Cross-Domain Linking (Bridge)' },
    { name: 'seo', title: 'SEO & AI Meta' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      description: 'Write your story here. Use headings for SEO structure.',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }, { type: 'image' }],
    }),

    // --- CROSS-DOMAIN LINKING (The Dutch Bridge) ---
    defineField({
      name: 'dutchSourceUrl',
      title: 'Original Dutch Article URL',
      description: 'Link to the original page on arjanspannenburg.nl. This helps Google connect your Dutch authority to this new English site.',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'relatedArtwork',
      title: 'Featured Artwork',
      description: 'Is this post about a specific piece or series (e.g., "Behind the scenes of CUPIDO")?',
      type: 'reference',
      to: [{ type: 'artwork' }, { type: 'project' }],
      group: 'links',
    }),
    defineField({
        name: 'relatedVenue',
        title: 'Related Venue (GEO)',
        description: 'If this post is about an opening or gallery visit, link it here for GEO-SEO.',
        type: 'reference',
        to: [{ type: 'venue' }],
        group: 'links',
      }),

    // --- SEO & AI ---
    defineField({
      name: 'excerpt',
      title: 'Excerpt (LLMO)',
      description: 'A 150-character summary for Google and AI agents.',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'tags',
      title: 'Topic Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'seo',
    }),
  ],
})
