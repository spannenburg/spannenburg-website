import { defineField, defineType } from 'sanity'
import { TfiUser } from 'react-icons/tfi'

export const artist = defineType({
  name: 'artist',
  title: 'Artists (Peers & Collaborators)',
  type: 'document',
  icon: TfiUser,
  fields: [
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sameAs',
      title: 'Authority Link (Wikipedia/RKD/Official)',
      description: 'Link to their Wikipedia or RKD page. Essential for LLMO/Entity linking.',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      description: 'A brief description of their work and style.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Portrait / Work Example',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
