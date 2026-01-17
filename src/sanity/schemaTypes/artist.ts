import { defineField, defineType } from 'sanity'
import { TfiIdBadge } from 'react-icons/tfi' // Ander icoontje om verwarring te voorkomen

export const artist = defineType({
  name: 'artist', // INTERNE NAAM: 'artist'
  title: 'Peer / Guest Artist', // EXTERNE TITEL: Duidelijk onderscheid
  type: 'document',
  icon: TfiIdBadge,
  fields: [
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website / Portfolio URL',
      description: 'Link to their own website (Do not link to our site).',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Portrait / Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Context',
      description: 'E.g. "Dutch Painter based in Amsterdam".',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      media: 'image',
    },
  },
})
