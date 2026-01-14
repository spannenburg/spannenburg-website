import {defineType, defineField} from 'sanity'

export const site = defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'baseUrl',
      title: 'Base URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
