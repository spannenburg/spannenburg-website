import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const sizeTemplate = defineType({
  name: 'sizeTemplate',
  title: 'Size Templates',
  type: 'document',
  icon: TfiRulerPencil,
  fields: [
    // --- 1. ORIENTATION ---
    defineField({
      name: 'orientation',
      title: 'Orientation / Shape',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape (Horizontal)', value: 'Landscape' },
          { title: 'Portrait (Vertical)', value: 'Portrait' },
          { title: 'Square', value: 'Square' },
          { title: '3D / Sculpture', value: '3D' },
        ],
        layout: 'radio'
      },
      initialValue: 'Landscape',
      validation: (Rule) => Rule.required(),
    }),

    // --- 2. DIMENSIONS ---
    defineField({
      name: 'width',
      title: 'Width (cm)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    
    defineField({
      name: 'height',
      title: 'Height (cm)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'depth',
      title: 'Depth (cm)',
      description: 'Only for 3D objects.',
      type: 'number',
      hidden: ({ document }) => document?.orientation !== '3D', // Verberg als het geen 3D is
    }),
  ],

  // --- 3. AUTO-GENERATED NAMING ---
  // Dit zorgt ervoor dat de naam overal automatisch verschijnt
  preview: {
    select: {
      orientation: 'orientation',
      width: 'width',
      height: 'height',
      depth: 'depth',
    },
    prepare({ orientation, width, height, depth }) {
      // 1. Check of data er is
      if (!width || !height) {
        return { title: 'New Size Template' }
      }

      // 2. Genereer de naam (bijv: "Landscape 120 x 80")
      let title = `${orientation || 'Shape'} ${width} x ${height}`;

      // 3. Voeg 'cm' toe
      let subtitle = 'cm';

      // 4. Als het 3D is, voeg de diepte toe
      if (orientation === '3D' && depth) {
        title += ` x ${depth}`;
      }

      return {
        title: title,
        subtitle: subtitle,
        media: TfiRulerPencil
      }
    },
  },
})
