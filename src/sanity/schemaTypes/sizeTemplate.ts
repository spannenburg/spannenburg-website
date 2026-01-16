import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const sizeTemplate = defineType({
  name: 'sizeTemplate',
  title: 'Size & Price Templates',
  type: 'document',
  icon: TfiRulerPencil,
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
      type: 'string',
      description: 'e.g., "Small Series" or "Large Series"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Standard Width (Long side)',
      type: 'number',
      description: 'In cm (e.g., 60)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'height',
      title: 'Standard Height (Short side)',
      type: 'number',
      description: 'In cm (e.g., 40)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Current Price (incl. 9% VAT)',
      type: 'number',
      description: 'Changing this will update ALL artworks using this template.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'editionSize',
        title: 'Default Edition Size',
        type: 'string',
        description: 'e.g., 8 + 2 AP',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      w: 'width',
      h: 'height',
      p: 'price'
    },
    prepare({ title, w, h, p }) {
      return {
        title: `${title} (${w}x${h} cm)`,
        subtitle: `€ ${p},-`
      }
    }
  }
})
