import { defineField, defineType } from 'sanity'
import { TfiTruck, TfiWorld, TfiNotepad } from 'react-icons/tfi'

// Uitgebreide lijst voor de dropdown
const countryList = [
  { title: '🇦🇹 Austria', value: 'AT' },
  { title: '🇦🇺 Australia', value: 'AU' },
  { title: '🇧🇪 Belgium', value: 'BE' },
  { title: '🇧🇬 Bulgaria', value: 'BG' },
  { title: '🇨🇦 Canada', value: 'CA' },
  { title: '🇨🇭 Switzerland', value: 'CH' },
  { title: '🇨🇳 China', value: 'CN' },
  { title: '🇨🇾 Cyprus', value: 'CY' },
  { title: '🇨🇿 Czech Republic', value: 'CZ' },
  { title: '🇩🇪 Germany', value: 'DE' },
  { title: '🇩🇰 Denmark', value: 'DK' },
  { title: '🇪🇪 Estonia', value: 'EE' },
  { title: '🇪🇸 Spain', value: 'ES' },
  { title: '🇫🇮 Finland', value: 'FI' },
  { title: '🇫🇷 France', value: 'FR' },
  { title: '🇬🇧 United Kingdom', value: 'GB' },
  { title: '🇬🇷 Greece', value: 'GR' },
  { title: '🇭🇷 Croatia', value: 'HR' },
  { title: '🇭🇺 Hungary', value: 'HU' },
  { title: '🇮🇪 Ireland', value: 'IE' },
  { title: '🇮🇹 Italy', value: 'IT' },
  { title: '🇯🇵 Japan', value: 'JP' },
  { title: '🇱🇺 Luxembourg', value: 'LU' },
  { title: '🇱🇻 Latvia', value: 'LV' },
  { title: '🇲🇹 Malta', value: 'MT' },
  { title: '🇳🇱 Netherlands', value: 'NL' },
  { title: '🇳🇴 Norway', value: 'NO' },
  { title: '🇵🇱 Poland', value: 'PL' },
  { title: '🇵🇹 Portugal', value: 'PT' },
  { title: '🇷🇴 Romania', value: 'RO' },
  { title: '🇸🇪 Sweden', value: 'SE' },
  { title: '🇸🇮 Slovenia', value: 'SI' },
  { title: '🇸🇰 Slovakia', value: 'SK' },
  { title: '🇺🇸 United States', value: 'US' },
]

export const shippingZone = defineType({
  name: 'shippingZone',
  title: 'Shipping Zones',
  type: 'document',
  icon: TfiTruck,
  fields: [
    // --- 1. ZONE DEFINITIE ---
    defineField({
      name: 'name',
      title: 'Zone Name',
      description: 'E.g. "Netherlands", "EU Zone 1", "North America"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isGlobalFallback',
      title: 'Is "Rest of World" / Global Fallback?',
      description: 'Check this box to apply these rates to ALL countries NOT listed in other zones.',
      type: 'boolean',
      initialValue: false,
    }),
    
    defineField({
      name: 'countries',
      title: 'Countries in this Zone',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: countryList, 
        layout: 'tags'
      },
      hidden: ({ document }) => document?.isGlobalFallback === true,
    }),

    // --- 2. CONTRACT INFO (NIEUW: Voor jouw beheer) ---
    defineField({
        name: 'logisticsInfo',
        title: 'Internal Logistics Info',
        type: 'object',
        icon: TfiNotepad,
        options: { collapsible: true, collapsed: true }, // Standaard dichtklappen
        fields: [
            defineField({
                name: 'courier',
                title: 'Primary Courier',
                type: 'string',
                options: {
                    list: ['PostNL', 'DHL Express', 'FedEx', 'UPS', 'Art Courier', 'Other']
                }
            }),
            defineField({
                name: 'contractNote',
                title: 'Contract / Update Note',
                description: 'E.g. "Prices per Jan 2026 (DHL Contract #1234)"',
                type: 'string',
            })
        ]
    }),

    // --- 3. DE TARIEVEN (LEEG, JIJ MOET ZE INVULLEN) ---
    defineField({
      name: 'rates',
      title: 'Shipping Rates (EUR)',
      description: 'Vul hier de actuele prijzen in. Gebruik de tabel hieronder als spiekbriefje.',
      type: 'object',
      options: { collapsible: false },
      fields: [
        defineField({ 
            name: 'mailbox', 
            title: '✉️ Brievenbuspakket (≤ 3.8cm)', 
            description: 'Richtprijs: NL ~€4 | EU ~€10 | World ~€25',
            type: 'number', 
            validation: (Rule) => Rule.required().min(0)
        }),
        defineField({ 
            name: 'parcel_standard', 
            title: '📦 Standard Parcel (approx 45x60cm)', 
            description: 'Richtprijs: NL ~€15 | EU ~€30 | World ~€80',
            type: 'number', 
            validation: (Rule) => Rule.required().min(0)
        }),
        defineField({ 
            name: 'parcel_large', 
            title: '📦 Large Parcel (approx 90x120cm)', 
            description: 'Richtprijs: NL ~€40 | EU ~€90 | World ~€200',
            type: 'number', 
            validation: (Rule) => Rule.required().min(0)
        }),
        defineField({ 
            name: 'freight', 
            title: '🚚 Crated Freight (Oversized/Pallet)', 
            description: 'Richtprijs: NL ~€250 | EU ~€400 | World ~€500+',
            type: 'number', 
            validation: (Rule) => Rule.required().min(0)
        }),
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      countries: 'countries',
      isGlobal: 'isGlobalFallback',
      courier: 'logisticsInfo.courier'
    },
    prepare({ title, countries, isGlobal, courier }) {
      if (isGlobal) {
        return {
            title: `🌍 ${title} (Global Fallback)`,
            subtitle: courier ? `Via ${courier}` : 'Standard rates',
            media: TfiWorld
        }
      }

      const count = countries ? countries.length : 0;
      const subtitle = count > 0 
        ? `${count} countries (${courier || 'No courier'})` 
        : 'No countries assigned';
      
      return {
        title: title,
        subtitle: subtitle,
        media: TfiTruck
      }
    }
  }
})
