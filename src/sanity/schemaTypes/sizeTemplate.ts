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
      description: 'E.g. "Medium Portrait", "Large Square".',
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
      description: 'Optional. Only for 3D works.',
      type: 'number',
    }),

    // --- DE KOPPELING (Hier kies je de Prijsgroep) ---
    defineField({
      name: 'priceTier',
      title: 'Price Tier',
      description: 'Select the pricing category for this size.',
      type: 'reference',
      to: [{ type: 'priceTier' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      width: 'width',
      height: 'height',
      // We halen de naam van de gekoppelde prijsgroep op
      tier: 'priceTier.name', 
      price: 'priceTier.price' // En de prijs om te tonen
    },
    prepare({ title, width, height, tier, price }) {
      const tierInfo = tier ? ` | ${tier}` : '';
      const priceInfo = price ? ` (€${price})` : '';
      
      return {
        title: title,
        subtitle: `${width}x${height} cm${tierInfo}${priceInfo}`,
        media: TfiRulerPencil,
      }
    },
  },
})
