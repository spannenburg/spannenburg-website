import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const sizeTemplate = defineType({
  name: 'sizeTemplate',
  title: 'Size Templates',
  type: 'document',
  icon: TfiRulerPencil,
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
      description: 'E.g. "Medium Portrait", "Large Square", or "A4 Landscape".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // --- DIMENSIONS ---
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
      description: 'Optional. Only use for 3D works, boxes, or sculptures.',
      type: 'number',
    }),

    // --- OPTIONAL: BASE PRICE ---
    // Useful if you want a default price for this size, 
    // though you can override it in the specific artwork.
    defineField({
      name: 'basePrice',
      title: 'Base Price (EUR)',
      description: 'Default price for this size (can be overridden per artwork).',
      type: 'number',
    }),
  ],
  
  // --- THE MAGIC PREVIEW ---
  // This ensures you see "Medium | 40W x 60H cm" in the list
  preview: {
    select: {
      title: 'name',
      width: 'width',
      height: 'height',
      depth: 'depth',
    },
    prepare({ title, width, height, depth }) {
      // Logic: If depth exists, add it. If not, ignore it.
      const d = depth ? ` x ${depth}D` : ''
      const dimensions = `${width}W x ${height}H${d} cm`
      
      return {
        title: title,
        subtitle: dimensions, // This solves your confusion
        media: TfiRulerPencil,
      }
    },
  },
})
