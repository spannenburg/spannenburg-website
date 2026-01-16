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
      title: 'Tier Name',
      type: 'string',
      description: 'E.g., "Standard Small Series" or "Premium Large"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (incl. 9% VAT)',
      type: 'number',
      description: 'The current price for this tier.',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'vatPercentage',
        title: 'VAT Percentage',
        type: 'number',
        initialValue: 9,
    }),
  ],
})
