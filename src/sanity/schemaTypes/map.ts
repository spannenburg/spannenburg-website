import { defineField, defineType } from 'sanity'
import { TfiMapAlt } from 'react-icons/tfi'

export const mapModule = defineType({
  name: 'map', // Dit is de 'key' die we straks in page.ts gebruiken
  title: 'Google Map',
  type: 'object',
  icon: TfiMapAlt,
  fields: [
    defineField({
      name: 'title',
      title: 'Map Title (Optional)',
      description: 'E.g. "Visit our Studio" or "Exhibition Location"',
      type: 'string',
    }),
    
    // Optie A: Koppel een bestaande Venue (Handig voor exposities!)
    defineField({
      name: 'useVenueLocation',
      title: 'Use Location from Venue?',
      description: 'If selected, we automatically show the map of that venue.',
      type: 'reference',
      to: [{ type: 'venue' }],
    }),

    // Optie B: Handmatige locatie (Handig voor unieke plekken)
    defineField({
      name: 'customLocation',
      title: 'Custom Location',
      description: 'Use this ONLY if you did not select a Venue above.',
      type: 'geopoint',
      hidden: ({ parent }) => !!parent?.useVenueLocation, // Verberg als er al een venue is gekozen
    }),

    defineField({
      name: 'zoom',
      title: 'Zoom Level',
      type: 'number',
      initialValue: 15,
      validation: (Rule) => Rule.min(1).max(20),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      venueName: 'useVenueLocation.name',
    },
    prepare({ title, venueName }) {
      return {
        title: title || (venueName ? `Map: ${venueName}` : 'Google Map'),
        subtitle: venueName ? 'Linked to Venue' : 'Custom Coordinates',
        media: TfiMapAlt,
      }
    },
  },
})
