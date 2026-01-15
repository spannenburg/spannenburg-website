import { defineField, defineType } from 'sanity'
import { TfiAlignLeft } from 'react-icons/tfi'

export default defineType({
  name: 'text-module',
  title: 'Text Block',
  type: 'object',
  icon: TfiAlignLeft,
  fields: [
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'array',
      of: [
        { 
          type: 'block',
          // Styles allow you to choose H2, H3, Quote, etc.
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          // Lists allow bullet points and numbered lists
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          // Marks allow Bold, Italic, Links
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ], 
    }),
  ],
  preview: {
    select: {
      content: 'body',
    },
    prepare({ content }) {
      // Show a snippet of the text in the list view
      const block = (content || []).find((block: any) => block._type === 'block')
      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'Empty Text Block',
        subtitle: 'Text Module',
      }
    },
  },
})
