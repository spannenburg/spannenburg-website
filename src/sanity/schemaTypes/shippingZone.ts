import { defineField, defineType } from 'sanity'
import { TfiTruck } from 'react-icons/tfi'

export const shippingZone = defineType({
  name: 'shippingZone',
  title: 'Shipping Zones',
  type: 'document',
  icon: TfiTruck,
  fields: [
    defineField({
      name: 'name',
      title: 'Zone Name',
      description: 'E.g. "Netherlands", "EU Zone 1", "Worldwide"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // Welke landen vallen hieronder?
    defineField({
      name: 'countries',
      title: 'Countries',
      description: 'List of Country Codes (ISO 2-letter, e.g. NL, BE, DE, US). Important for Google Merchant.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags' // Ziet eruit als: [NL] [BE] [DE]
      }
    }),

    // De Prijzen Matrix
    defineField({
      name: 'rates',
      title: 'Shipping Rates per Class',
      type: 'object',
      fields: [
        defineField({
            name: 'mailbox',
            title: '✉️ Mailbox Rate (€)',
            type: 'number',
            initialValue: 0
        }),
        defineField({
            name: 'parcel_standard',
            title: '📦 Standard Parcel Rate (€)',
            type: 'number',
            initialValue: 15
        }),
        defineField({
            name: 'parcel_large',
            title: '📦 Large Parcel Rate (€)',
            type: 'number',
            initialValue: 45
        }),
        defineField({
            name: 'freight',
            title: '🚚 Freight / Crating Rate (€)',
            description: 'Heavy transport + crate construction',
            type: 'number',
            initialValue: 250
        }),
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      countries: 'countries'
    },
    prepare({ title, countries }) {
      const countryList = countries && countries.length > 0 ? countries.join(', ') : 'No countries assigned';
      return {
        title: title,
        subtitle: countryList,
        media: TfiTruck
      }
    }
  }
})
