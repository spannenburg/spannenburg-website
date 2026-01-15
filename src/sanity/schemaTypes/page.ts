import { defineField, defineType } from 'sanity'

// Let op: We gebruiken hier 'const page' in plaats van 'default'
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

    // 3. Modules (De blokken)
    defineField({
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [
        // Hier verwijzen we naar je Hero module
        { type: 'hero' },
        
        // Zodra je meer modules hebt (bijv. tekst), zet je ze hier erbij:
        // { type: 'artworkGrid' },
      ],
    }),
  ],
})
