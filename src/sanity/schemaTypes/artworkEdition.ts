import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const artworkEdition = defineType({
  name: 'artworkEdition',
  title: 'Edition',
  type: 'object', 
  icon: TfiRulerPencil,
  fields: [
    // --- 1. HET FORMAAT ---
    defineField({
      name: 'size',
      title: 'Select Size Template',
      description: 'Choose the physical dimensions. Pricing is calculated via the Artist Price Group.',
      type: 'reference',
      to: [{ type: 'sizeTemplate' }],
      validation: (Rule) => Rule.required(),
    }),

    // --- 2. DE PRIJS OVERRIDE ---
    defineField({
      name: 'customPriceTier',
      title: 'Override Price Tier (Optional)',
      description: '⚠️ Only use this if you want to deviate from the Artist\'s standard Price Group.',
      type: 'reference',
      to: [{ type: 'priceTier' }],
    }),

    // --- 3. TYPE & OPLAGE ---
    defineField({
      name: 'type',
      title: 'Edition Type',
      type: 'string',
      initialValue: 'regular',
      options: {
        list: [
          { title: 'Regular Edition', value: 'regular' },
          { title: 'Artist Proof (AP)', value: 'ap' },
        ],
        layout: 'radio' 
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'limit',
      title: 'Edition Limit',
      description: 'Total copies available (e.g., 5). Leave empty for Open Edition.',
      type: 'number',
    }),
    
    defineField({
      name: 'available',
      title: 'Currently Available?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      sizeName: 'size.width',       // We pakken even breedte/hoogte als fallback
      sizeHeight: 'size.height',
      sizeOrient: 'size.orientation',
      limit: 'limit',
      type: 'type',
      // We kijken alleen nog naar de Custom Price
      customPrice: 'customPriceTier.price',
      customCurrency: 'customPriceTier.currency'
    },
    prepare({ sizeName, sizeHeight, sizeOrient, limit, type, customPrice, customCurrency }) {
      // Omdat Size Template nu een slimme preview heeft, laat Sanity die vaak al zien,
      // maar hier bouwen we de string voor in het Kunstwerk-lijstje.
      
      const name = sizeName && sizeHeight 
        ? `${sizeOrient || 'Shape'} ${sizeName} x ${sizeHeight}` 
        : 'Select Size...';
        
      const isAP = type === 'ap';
      
      // LOGICA: We tonen alleen een prijs als er een OVERRIDE is.
      // De standaardprijs wordt berekend op de website, die kunnen we hier lastig tonen 
      // omdat we niet weten wie de "Artist" is vanuit dit blokje.
      let priceText = '';
      
      if (customPrice) {
        const symbol = customCurrency === 'EUR' ? '€' : customCurrency;
        priceText = ` | ⭐ Override: ${symbol} ${customPrice}`;
      } else {
        priceText = ' | 🏷️ Auto-Price';
      }
      
      const apLabel = isAP ? ' (AP)' : '';
      const limitText = limit ? ` (Ed. ${limit})` : ' (Open)';
      
      return {
        title: name + apLabel,
        subtitle: `${limitText}${priceText}`,
        media: TfiRulerPencil
      }
    },
  },
})
