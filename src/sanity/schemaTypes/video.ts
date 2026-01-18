import { defineField, defineType } from 'sanity'
import { TfiYoutube } from 'react-icons/tfi'

export const videoModule = defineType({
  name: 'video-module',
  title: 'Video Embed',
  type: 'object',
  icon: TfiYoutube,
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube / Vimeo URL',
      description: 'Paste the full link (e.g. https://www.youtube.com/watch?v=...)',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'title',
      title: 'Video Title (Optional)',
      description: 'Used for accessibility labeling.',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url'
    },
    prepare({ title, url }) {
      return {
        title: title || 'Video Module',
        subtitle: url,
        media: TfiYoutube
      }
    }
  }
})
