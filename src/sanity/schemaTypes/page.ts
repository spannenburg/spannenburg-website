import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    // 1. Titel
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    // 2. Slug (URL)
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),

    // 3. Modules (Content)
    defineField({
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'text-module' }, // (If you added this earlier)
        { type: 'artwork-grid' },
      ],
    }),

    // 4. Metadata (SEO) - HIERMEE LOSSEN WE DE FOUTMELDING OP
    defineField({
      name: 'metadata',
      title: 'SEO & Metadata',
      type: 'metadata', // Dit verwijst naar jouw bestand metadata.ts
    }),
  ],
  
  // Dit zorgt dat je in de lijstweergave de juiste titel ziet
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
