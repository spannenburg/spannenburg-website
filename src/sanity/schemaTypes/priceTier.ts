import { defineField, defineType } from 'sanity'
import { TfiMoney } from 'react-icons/tfi'

export const priceTier = defineType({
  name: 'priceTier',
  title: 'Price Tiers',
  type: 'document',
  icon: TfiMoney,
  fields: [
    defineField({
      name: 'name',
      title: 'Tier Name / Code',
      description: 'E.g. "Tier A", "Medium Works", or "Code 12".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Base Price (€)',
      description: 'The standard value for this tier.',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
    },
    prepare({ title, price }) {
      return {
        title: title,
        subtitle: `€ ${price}`,
        media: TfiMoney,
      }
    },
  },
})
