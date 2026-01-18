import { defineField, defineType } from 'sanity'
import { TfiImage } from 'react-icons/tfi'

export const imageModule = defineType({
  name: 'image-module',
  title: 'Single Image / Logo',
  type: 'object',
  icon: TfiImage,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Required for SEO and Accessibility. Describe the image.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (Optional)',
          description: 'Text displayed below the image.',
        }
      ]
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      initialValue: 'full',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Centered (Normal)', value: 'centered' },
          { title: 'Small (Logo size)', value: 'small' },
        ],
        layout: 'radio'
      }
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'image.alt',
      layout: 'layout'
    },
    prepare({ media, alt, layout }) {
      return {
        title: 'Image Module',
        subtitle: `${layout} | ${alt || 'No alt text'}`,
        media: media || TfiImage
      }
    }
  }
})
