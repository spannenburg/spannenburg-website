import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const postList = defineType({
  name: 'postList',
  title: 'Latest Posts / Journal',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      placeholder: 'Journal / Inzicht',
      initialValue: 'Journal'
    }),
    defineField({
      name: 'intro',
      title: 'Intro text',
      type: 'text',
      rows: 2,
      placeholder: 'Short introduction about your writing...'
    }),
    defineField({
      name: 'limit',
      title: 'How many posts to show?',
      type: 'number',
      options: {
        list: [3, 6, 9]
      },
      initialValue: 3
    }),
    defineField({
      name: 'showButton',
      title: 'Show "Read More" button?',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      limit: 'limit',
    },
    prepare({ title, limit }) {
      return {
        title: title || 'Latest Posts',
        subtitle: `Shows the latest ${limit} blog posts automatically`,
      }
    },
  },
})
