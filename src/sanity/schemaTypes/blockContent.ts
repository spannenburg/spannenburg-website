import { defineType, defineArrayMember } from 'sanity'
import { TfiYoutube, TfiImage } from 'react-icons/tfi'

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' }, // H1 bewaren we voor de paginatitel
        { title: 'Heading 3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
    
    // --- 1. VERBETERDE AFBEELDINGEN ---
    defineArrayMember({
      type: 'image',
      icon: TfiImage,
      options: { hotspot: true },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Zichtbaar onder het beeld.',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (SEO)',
          description: 'Cruciaal voor toegankelijkheid en Google.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // --- 2. VIDEO ONDERSTEUNING ---
    defineArrayMember({
      name: 'videoEmbed',
      type: 'object',
      title: 'Video Embed',
      icon: TfiYoutube,
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'YouTube or Vimeo URL',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Video Title',
        },
      ],
    }),
  ],
})
