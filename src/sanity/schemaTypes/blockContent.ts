import { defineType, defineArrayMember } from 'sanity'
import { TfiYoutube, TfiImage } from 'react-icons/tfi'

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  
  // --- NIEUW: De Instructie voor de gebruiker ---
  description: 'Write your content here. 💡 Tip: Use "Heading 2" for main sections and "Heading 3" for sub-sections. Do NOT use "Heading 1" (this is reserved for the main page title).',

  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' }, // H1 is bewust weggelaten
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
          { title: 'Underline', value: 'underline' }, // Heb ik toegevoegd, handig voor links
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
    
    // --- 1. VERBETERDE AFBEELDINGEN (Jouw code) ---
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

    // --- 2. VIDEO ONDERSTEUNING (Jouw code) ---
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
