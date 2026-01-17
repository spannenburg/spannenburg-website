import { defineField, defineType } from 'sanity'
import { TfiTruck } from 'react-icons/tfi'

// Een lijst van veelvoorkomende landen. 
// Het systeem slaat de 'value' op (NL), jij ziet de 'title' (Netherlands).
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
  // Voeg hier eventueel andere landen toe als je die mist
]

export const shippingZone = defineType({
  name: 'shippingZone',
  title: 'Shipping Zones',
  type: 'document',
  icon: TfiTruck,
  fields: [
    defineField({
      name: 'name',
      title: 'Zone Name',
      description: 'E.g. "Benelux", "EU Zone 1", "North America"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // HIER IS DE MAGIE: DE DROPDOWN
    defineField({
      name: 'countries',
      title: 'Countries in this Zone',
      description: 'Select the countries that fall under these rates. Codes are ISO 3166-1 alpha-2. Look up codes at: https://www.iso.org/obp/ui/',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: countryList, // Hier gebruiken we de lijst van hierboven
        layout: 'tags'     // Dit zorgt ervoor dat ze als mooie labeltjes verschijnen
      },
      validation: (Rule) => Rule.required().min(1)
    }),

    defineField({
      name: 'rates',
      title: 'Shipping Rates per Class',
      type: 'object',
      fields: [
        defineField({ name: 'mailbox', title: '✉️ Mailbox Rate (€)', type: 'number', initialValue: 0 }),
        defineField({ name: 'parcel_standard', title: '📦 Standard Parcel Rate (€)', type: 'number', initialValue: 15 }),
        defineField({ name: 'parcel_large', title: '📦 Large Parcel Rate (€)', type: 'number', initialValue: 45 }),
        defineField({ name: 'freight', title: '🚚 Freight / Crating Rate (€)', type: 'number', initialValue: 250 }),
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      countries: 'countries'
    },
    prepare({ title, countries }) {
      // Omdat we nu codes opslaan (NL, BE), willen we misschien even tellen hoeveel het er zijn
      const count = countries ? countries.length : 0;
      const subtitle = count > 0 ? `${count} countries assigned` : 'No countries assigned';
      
      return {
        title: title,
        subtitle: subtitle,
        media: TfiTruck
      }
    }
  }
})
