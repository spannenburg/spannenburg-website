import { defineField, defineType } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export const text = defineType({
  name: 'text-module', // Dit is de naam die page.ts zoekt
  title: 'Text Block',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'array',
      of: [{ type: 'block' }], // Standaard rich text editor
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      blocks: 'body',
    },
    prepare({ title, blocks }) {
      return {
        title: title || 'Text Block',
        subtitle: blocks?.[0]?.children?.[0]?.text || 'No text content',
        media: BlockContentIcon,
      }
    },
  },
})
