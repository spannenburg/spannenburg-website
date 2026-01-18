import { defineField, defineType } from 'sanity'
import { TfiFiles } from 'react-icons/tfi'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: TfiFiles,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO & Social Media' },
  ],
  fields: [
    // --- CONTENT GROUP ---
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modules',
      title: 'Page Modules',
      description: 'The building blocks of your page (Hero, Text, Grid, etc.)',
      type: 'array',
      group: 'content',
      of: [
        { type: 'hero' },
        { type: 'text-module' }, // Let op: zorg dat in text.ts de name 'text-module' is
        { type: 'artwork-grid' },
      ],
    }),

    // --- SEO & SOCIAL MEDIA GROUP (Gedetailleerd) ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Browser Tab)',
      description: 'The title that appears in Google search results and browser tabs. Ideal length: 50-60 characters.',
      type: 'string',
      group: 'seo',
      validation: (Rule) => 
        Rule.max(60).warning('Titles longer than 60 characters are often truncated by Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      description: 'Summary for search engines. Focus on keywords and click-through appeal. Ideal length: 150-160 characters.',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => 
        Rule.max(160).warning('Descriptions longer than 160 characters are truncated.')
            .min(100).warning('A bit short. Try to use at least 100 characters for better SEO.'),
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Share Image (Open Graph)',
      description: 'The image shown when sharing this page on Facebook, LinkedIn, WhatsApp, etc. ⚠️ RECOMMENDED SIZE: 1200 x 630 pixels.',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Essential for accessibility (e.g. screen readers). Describe what is in the image.',
          validation: (Rule) => Rule.warning('Please add alt text for better accessibility.'),
        }
      ]
    }),
    
    // --- INDEXING & CANONICAL ---
    defineField({
      name: 'indexing',
      title: 'Search Engine Indexing',
      type: 'string',
      group: 'seo',
      initialValue: 'index',
      options: {
        list: [
          { title: '✅ Allow Indexing (Default)', value: 'index' },
          { title: '🚫 Hide from Search Engines (NoIndex)', value: 'noindex' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      description: 'Only fill this in if this page is a duplicate of another page to prevent "duplicate content" penalties.',
      type: 'url',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'socialImage' // Leuke toevoeging: toon de social image in de preview als die er is
    },
    prepare({ title, slug, media }) {
      return {
        title: title || 'Untitled',
        subtitle: slug ? `/${slug}` : 'No link',
        media: media || TfiFiles,
      }
    },
  },
})
