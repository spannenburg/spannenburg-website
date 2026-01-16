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
    }),
    defineField({
      name: 'modules',
      title: 'Page Modules',
      description: 'The building blocks of your page (Hero, Text, Grid, etc.)',
      type: 'array',
      group: 'content',
      of: [
        { type: 'hero' },
        { type: 'text-module' },
        { type: 'artwork-grid' },
      ],
    }),

    // --- SEO & AI GROUP ---
    defineField({
      name: 'metadata',
      title: 'Page SEO Settings',
      type: 'metadata', // References your metadata.ts object
      group: 'seo',
    }),
    defineField({
      name: 'indexing',
      title: 'Search Engine Indexing',
      type: 'string',
      group: 'seo',
      initialValue: 'index',
      options: {
        list: [
          { title: 'Allow Indexing (Default)', value: 'index' },
          { title: 'Hide from Search Engines (NoIndex)', value: 'noindex' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      description: 'Only fill this in if this page is a duplicate of another page.',
      type: 'url',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled',
        subtitle: slug ? `/${slug}` : 'No link',
      }
    },
  },
})
