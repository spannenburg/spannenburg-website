import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const artworkEdition = defineType({
  name: 'artworkEdition',
  title: 'Edition',
  type: 'object', 
  icon: TfiRulerPencil,
  fields: [
    defineField({
      name: 'size',
      title: 'Select Size Template',
      description: 'The price is now automatically pulled from this template.',
      type: 'reference',
      to: [{ type: 'sizeTemplate' }],
      validation: (Rule) => Rule.required(),
    }),

    // --- NIEUW: AP of Regular ---
    defineField({
      name: 'type',
      title: 'Edition Type',
      type: 'string',
      initialValue: 'regular',
      options: {
        list: [
          { title: 'Regular Edition', value: 'regular' },
          { title: 'Artist Proof (AP) - (+25% Price)', value: 'ap' },
        ],
        layout: 'radio' // Ziet eruit als bolletjes om aan te vinken
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'limit',
      title: 'Edition Limit',
      description: 'Total copies available (e.g., 5). Leave empty for Open Edition.',
      type: 'number',
    }),
    
    defineField({
      name: 'available',
      title: 'Currently Available?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      size: 'size.name',       // Haalt naam van de maat op
      limit: 'limit',
      type: 'type',
    },
    prepare({ size, limit, type }) {
      const sizeName = size || 'Select size...';
      const isAP = type === 'ap';
      
      // Tekst opbouw: "Artist Proof" of "Limit: 5"
      const limitText = isAP ? 'Artist Proof (AP)' : (limit ? `Edition of ${limit}` : 'Open Edition');
      
      return {
        title: sizeName,
        subtitle: limitText,
        media: TfiRulerPencil
      }
    },
  },
})
