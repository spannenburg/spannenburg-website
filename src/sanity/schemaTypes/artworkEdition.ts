import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const artworkEdition = defineType({
  name: 'artworkEdition',
  title: 'Edition',
  type: 'object', 
  icon: TfiRulerPencil,
  fields: [
    // --- 1. FORMAAT & PRIJS ---
    defineField({
      name: 'size',
      title: 'Select Size Template',
      type: 'reference',
      to: [{ type: 'sizeTemplate' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customPriceTier',
      title: 'Override Price Tier (Optional)',
      type: 'reference',
      to: [{ type: 'priceTier' }],
    }),

    // --- 2. TYPE & TOTAAL LIMIET ---
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
      title: 'Total Edition Limit',
      description: 'Maximum number of prints allowed (e.g. 6).',
      type: 'number',
    }),

    // --- 3. VOORRAAD BEHEER (NIEUW!) ---
    defineField({
      name: 'inventory',
      title: 'Inventory & Sales',
      type: 'object',
      options: { collapsible: false }, // Altijd open klappen
      fields: [
        // A. HISTORISCH / OFFLINE (Handmatig)
        defineField({
            name: 'manualSalesCount',
            title: 'Historic / Offline Sales',
            description: 'How many were sold BEFORE joining this platform or sold OFFLINE without a digital invoice? (e.g. 4 sold previously).',
            type: 'number',
            initialValue: 0,
        }),
        // B. SYSTEEM (Automatisch)
        defineField({
            name: 'systemSalesCount',
            title: 'Platform Sales (Auto)',
            description: 'Sold via Spannenburg.Art website. DO NOT EDIT MANUALLY.',
            type: 'number',
            readOnly: true, // Systeem vult dit in
            initialValue: 0,
        })
      ]
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
      sizeWidth: 'size.width',       
      sizeHeight: 'size.height',
      sizeOrient: 'size.orientation',
      limit: 'limit',
      type: 'type',
      manualSold: 'inventory.manualSalesCount',
      systemSold: 'inventory.systemSalesCount'
    },
    prepare({ sizeWidth, sizeHeight, sizeOrient, limit, type, manualSold, systemSold }) {
      const name = sizeWidth && sizeHeight 
        ? `${sizeOrient || 'Shape'} ${sizeWidth} x ${sizeHeight}` 
        : 'Select Size...';
        
      const isAP = type === 'ap';
      const apLabel = isAP ? ' (AP)' : '';
      
      // BEREKEN BESCHIKBAARHEID VOOR PREVIEW
      const totalSold = (manualSold || 0) + (systemSold || 0);
      const limitNum = limit || 0;
      const remaining = limitNum > 0 ? limitNum - totalSold : 'Open';
      
      return {
        title: name + apLabel,
        subtitle: `Limit: ${limitNum} | Sold: ${totalSold} | Available: ${remaining}`,
        media: TfiRulerPencil
      }
    },
  },
})
