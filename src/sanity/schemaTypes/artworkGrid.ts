import { defineField, defineType } from 'sanity'
import { ThListIcon } from '@sanity/icons'

export const artworkGrid = defineType({
  name: 'artworkGrid',
  title: 'Artwork / Series Grid',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      placeholder: 'Selected Works',
    }),
    defineField({
      name: 'items',
      title: 'Select Items',
      description: 'Choose which Series or Artworks to display here.',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'project' }, { type: 'artwork' }] }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Artwork Grid',
        subtitle: `${items ? items.length : 0} items selected`,
      }
    },
  },
})
