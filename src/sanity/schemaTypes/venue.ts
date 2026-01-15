import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons'

export const venue = defineType({
  name: 'venue',
  title: 'Venue / Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name of Venue',
      type: 'string',
      placeholder: 'e.g. Zerp Galerie or Museum Hilversum',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'type',
      title: 'Venue Type',
      type: 'string',
      options: {
        list: [
          { title: 'Art Gallery', value: 'gallery' },
          { title: 'Museum / Institution', value: 'museum' },
          { title: 'Art Fair Location', value: 'fair' },
          { title: 'Public Space', value: 'public' },
        ],
      },
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'The Netherlands',
    }),
  ],
})
