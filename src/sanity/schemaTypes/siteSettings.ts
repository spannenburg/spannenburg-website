import { defineField, defineType } from 'sanity'
import { TfiSettings } from 'react-icons/tfi'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: TfiSettings,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description (SEO)',
      description: 'The main meta-description for the homepage.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description: 'The image shown when you share the website link on social media.',
      type: 'image',
    }),
    defineField({
      name: 'keywords',
      title: 'Global Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
})
