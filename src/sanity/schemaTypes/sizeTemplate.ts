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

    // --- 2. DIMENSIONS (MET SLIMME VALIDATIE) ---
    defineField({
      name: 'width',
      title: 'Width (cm)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).custom((width, context) => {
        // We halen de andere waardes op uit het document
        const doc = context.document as any
        const height = doc?.height
        const orient = doc?.orientation

        // Als data nog niet compleet is, klagen we nog niet
        if (!width || !height || !orient) return true

        // REGEL 1: Landscape moet breder zijn
        if (orient === 'Landscape' && width <= height) {
          return '⚠️ Logic Error: For Landscape, Width must be greater than Height.'
        }
        // REGEL 2: Portrait moet smaller zijn
        if (orient === 'Portrait' && width >= height) {
          return '⚠️ Logic Error: For Portrait, Width must be smaller than Height.'
        }
        // REGEL 3: Square moet gelijk zijn
        if (orient === 'Square' && width !== height) {
          return '⚠️ Logic Error: For Square, Width and Height must be exactly the same.'
        }

        return true
      }),
    }),
    
    defineField({
      name: 'height',
      title: 'Height (cm)',
      type: 'number',
      // We doen hier dezelfde check, zodat de foutmelding bij beide velden verschijnt
      validation: (Rule) => Rule.required().min(1).custom((height, context) => {
        const doc = context.document as any
        const width = doc?.width
        const orient = doc?.orientation

        if (!width || !height || !orient) return true

        if (orient === 'Landscape' && height >= width) {
          return '⚠️ Landscape must be wider than it is tall.'
        }
        if (orient === 'Portrait' && height <= width) {
          return '⚠️ Portrait must be taller than it is wide.'
        }
        if (orient === 'Square' && height !== width) {
          return '⚠️ Square must have equal dimensions.'
        }

        return true
      }),
    }),

    defineField({
      name: 'depth',
      title: 'Depth (cm)',
      description: 'Only for 3D objects.',
      type: 'number',
      hidden: ({ document }) => document?.orientation !== '3D', 
    }),

    // --- 3. LOGISTICS ---
    defineField({
      name: 'weight',
      title: 'Estimated Weight (kg)',
      description: 'Include packaging buffer (e.g. Artwork 2kg + Crate 3kg = 5kg). Important for shipping costs.',
      type: 'number',
      validation: (Rule) => Rule.required().min(0.1),
    }),

    defineField({
      name: 'shippingClass',
      title: 'Shipping Logistics Class',
      description: 'Used to determine which shipping rate applies.',
      type: 'string',
      options: {
        list: [
          { title: '✉️ Mailbox (Fits in envelope)', value: 'mailbox' },
          { title: '📦 Standard Parcel (PostNL/DHL)', value: 'parcel_standard' },
          { title: '📦 Large Parcel (Special handling)', value: 'parcel_large' },
          { title: '🚚 Freight / Crating (Wooden box)', value: 'freight' },
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required(), 
    }),
  ],

  // --- 4. AUTO-GENERATED NAMING ---
  preview: {
    select: {
      orientation: 'orientation',
      width: 'width',
      height: 'height',
      depth: 'depth',
      weight: 'weight'
    },
    prepare({ orientation, width, height, depth, weight }) {
      if (!width || !height) {
        return { title: 'New Size Template' }
      }

      let title = `${orientation || 'Shape'} ${width} x ${height}`;
      let subtitle = 'cm';

      if (orientation === '3D' && depth) {
        title += ` x ${depth}`;
      }

      if (weight) {
        subtitle += ` | ⚖️ ${weight}kg`;
      }

      return {
        title: title,
        subtitle: subtitle,
        media: TfiRulerPencil
      }
    },
  },
})
