import { defineField, defineType } from 'sanity'
import { TfiMoney } from 'react-icons/tfi'

export const priceTier = defineType({
  name: 'priceTier',
  title: 'Price Tiers',
  type: 'document',
  icon: TfiMoney,
  fields: [
    // --- 1. CURRENCY & PRICE ---
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'EUR',
      options: {
        list: [
          { title: 'EUR (€)', value: 'EUR' },
          { title: 'USD ($)', value: 'USD' },
          { title: 'GBP (£)', value: 'GBP' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Consumer Price (Gross)',
      description: 'The final price displayed on the website (including VAT).',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    
    // --- 2. TAXES ---
    defineField({
      name: 'vatRate',
      title: 'VAT Rate (%)',
      description: 'Percentage tax included in the price above (e.g. 9 for Art, 21 for Goods).',
      type: 'number',
      initialValue: 9,
      validation: (Rule) => Rule.required().min(0).max(100),
    }),

    // --- 3. OPTIONAL LABEL ---
    defineField({
      name: 'tierLabel',
      title: 'Internal Label (Optional)',
      description: 'Optional: Add a code/name if you need to distinguish tiers with the same price (e.g. "Tier A" or "Sale Price").',
      type: 'string',
    }),
  ],
  
  // --- AUTOMATIC PREVIEW (De "Auto-Name" Logica) ---
  preview: {
    select: {
      price: 'price',
      currency: 'currency',
      vat: 'vatRate',
      label: 'tierLabel',
    },
    prepare({ price, currency, vat, label }) {
      // Symbolen logic
      const symbols: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' }
      const sign = symbols[currency] || currency || '€'
      
      // Titel opbouw: "€ 1200"
      const mainTitle = price ? `${sign} ${price}` : 'New Price Tier'
      
      // Subtitel opbouw: "9% VAT - Tier A"
      const vatText = vat !== undefined ? `${vat}% VAT` : 'No VAT set'
      const labelText = label ? ` | ${label}` : ''
      
      return {
        title: mainTitle,         // Dit zie je nu groot in de lijst
        subtitle: `${vatText}${labelText}`, // Dit staat er klein onder
        media: TfiMoney,
      }
    },
  },
})
