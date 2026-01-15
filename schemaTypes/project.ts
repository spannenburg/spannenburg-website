import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Artwork Series', // Dit is de naam die je in de Studio ziet
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Series Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Time Period',
      type: 'string',
      placeholder: 'e.g. 2018-2022',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'description',
      title: 'Series Concept / Description',
      type: 'array',
      of: [{ type: 'block' }], // Rich text
    }),
  ],
})
