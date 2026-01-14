import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'site',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'baseUrl',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
