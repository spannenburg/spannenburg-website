import { defineField, defineType } from 'sanity'
import { TfiBarChart } from 'react-icons/tfi'

export const priceGroup = defineType({
  name: 'priceGroup',
  title: 'Price Groups',
  type: 'document',
  icon: TfiBarChart,
  fields: [
    defineField({
      name: 'title',
      title: 'Group Name',
      description: 'E.g. "Level 1: Emerging Artist" or "Level 3: Established Master".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Internal Description',
      type: 'text',
      rows: 2,
    }),
    
    // THE MATRIX: LINKS SIZES TO PRICES
    defineField({
      name: 'priceMatrix',
      title: 'Price Matrix',
      description: 'Define the price for each size in this group.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Price Setting',
          fields: [
            defineField({
              name: 'size',
              title: 'Size Template',
              type: 'reference',
              to: [{ type: 'sizeTemplate' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tier',
              title: 'Price Tier',
              type: 'reference',
              to: [{ type: 'priceTier' }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              size: 'size.name',
              tierPrice: 'tier.price',
              tierCurr: 'tier.currency',
            },
            prepare({ size, tierPrice, tierCurr }) {
              const symbol = tierCurr === 'EUR' ? '€' : tierCurr;
              return {
                title: size || 'Select Size',
                subtitle: tierPrice ? `${symbol} ${tierPrice}` : 'Select Price',
              }
            }
          }
        }
      ],
      // This ensures you don't accidentally add "40x60" twice in the same group
      validation: (Rule) => Rule.unique(), 
    }),
  ],
})
