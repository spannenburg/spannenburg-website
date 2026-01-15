import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const hero = defineType({
  name: 'hero',
  title: 'Hero (Header)',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      description: 'The most important text. Good for SEO. E.g. "Arjan Spannenburg"',
      placeholder: 'Arjan Spannenburg',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (Subtitle)',
      type: 'string',
      description: 'Context for AI. E.g. "Fine Art Photographer & Visual Artist"',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (Crucial for SEO)',
          description: 'Describe the image specifically. E.g. "Zwart-wit portretfoto uit de serie BOUND."',
          validation: (Rule) => Rule.required(),
        }
      ]
    }),
    defineField({
        name: 'display',
        title: 'Display Style',
        type: 'string',
        options: {
            list: [
                { title: 'Full Screen (Home)', value: 'fullscreen' },
                { title: 'Half Screen (Standard)', value: 'half' }
            ],
        },
        initialValue: 'fullscreen'
    })
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero',
        subtitle: 'Header Section',
        media,
      }
    },
  },
})
