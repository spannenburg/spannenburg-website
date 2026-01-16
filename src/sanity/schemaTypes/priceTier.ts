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
      description: 'E.g. "Tier A (Small)", "Tier B (Medium)", or "Code 12".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // --- PRIJS & BELASTING ---
    defineField({
      name: 'price',
      title: 'Consumer Price (Incl. VAT) (€)',
      description: 'The final price displayed on the website.',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'vatRate',
      title: 'VAT / BTW Rate (%)',
      description: 'E.g., 9 for Art, 21 for Merchandise. Used to calculate the net price for your invoices.',
      type: 'number',
      initialValue: 9, // Standaard op 9% voor kunst
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      vat: 'vatRate',
    },
    prepare({ title, price, vat }) {
      // Berekent voor de preview even snel wat het netto bedrag is
      const net = price && vat ? (price / (1 + vat / 100)).toFixed(2) : '?'
      
      return {
        title: title,
        subtitle: `€ ${price} (incl. ${vat}% BTW) | Netto: €${net}`,
        media: TfiMoney,
      }
    },
  },
})
