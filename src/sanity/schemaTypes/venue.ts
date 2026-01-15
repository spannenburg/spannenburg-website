import { defineField, defineType } from 'sanity'
import { TfiLocationPin } from 'react-icons/tfi'

export const venue = defineType({
  name: 'venue',
  title: 'Venues / Galleries',
  type: 'document',
  icon: TfiLocationPin,
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'location', title: 'Address & GEO' },
    { name: 'media', title: 'Photos' },
  ],
  fields: [
    // --- 1. DETAILS ---
    defineField({
      name: 'name',
      title: 'Venue Name',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'type',
        title: 'Venue Type',
        type: 'string',
        group: 'details',
        options: {
            list: [
                { title: 'Commercial Gallery', value: 'gallery' },
                { title: 'Museum / Institution', value: 'museum' },
                { title: 'Art Fair', value: 'fair' },
                { title: 'Pop-up Location', value: 'popup' },
                { title: 'Public Space', value: 'public' },
            ]
        }
    }),
    defineField({
        name: 'website',
        title: 'Website',
        type: 'url',
        group: 'details',
    }),
    
    // *** THE MISSING PIECE: DESCRIPTION ***
    defineField({
      name: 'description',
      title: 'About the Venue',
      description: 'Describe the reputation, history, and focus of this venue. (Great for E-E-A-T)',
      type: 'array', // Rich text
      group: 'details',
      of: [{ type: 'block' }],
    }),

    // --- 2. LOCATION (Structured for SEO) ---
    defineField({
        name: 'city',
        title: 'City',
        type: 'string',
        group: 'location',
    }),
    defineField({
        name: 'country',
        title: 'Country',
        type: 'string',
        group: 'location',
    }),
    defineField({
        name: 'address',
        title: 'Full Address',
        type: 'text',
        rows: 3,
        group: 'location',
    }),
    defineField({
        name: 'googleMapsUrl',
        title: 'Google Maps Link',
        type: 'url',
        group: 'location',
    }),

    // --- 3. IMAGES ---
    defineField({
      name: 'image',
      title: 'Venue Photo',
      description: 'Exterior or interior shot of the space.',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
  ],
})
