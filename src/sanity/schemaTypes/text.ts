import { defineField, defineType } from 'sanity'
import { TfiText } from 'react-icons/tfi'

export const text = defineType({
  name: 'text-module', // Let op: deze technische naam wordt gezocht!
  title: 'Text Module',
  type: 'object',
  icon: TfiText,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Text Block', media: TfiText }
    }
  }
})
