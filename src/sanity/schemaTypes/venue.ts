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
    { name: 'media', title: 'Visuals & Branding' },
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
    defineField({
      name: 'description',
      title: 'About the Venue',
      description: 'Describe the reputation, history, and focus of this venue. (Great for E-E-A-T)',
      type: 'array',
      group: 'details',
      of: [{ type: 'block' }],
    }),

    // --- 2. LOCATION ---
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

    // --- 3. VISUALS & BRANDING ---
    
    // 3a. Logo
    defineField({
        name: 'logo',
        title: 'Venue Logo',
        description: 'Upload the official logo (PNG or SVG preferred).',
        type: 'image',
        group: 'media',
        fields: [
            defineField({
                name: 'alt',
                type: 'string',
                title: 'Alt Text',
                description: 'E.g. "Logo of Zerp Galerie"',
            }),
        ],
    }),

    // 3b. Main Image
    defineField({
      name: 'image',
      title: 'Main Photo (Hero)',
      description: 'The primary shot used on overview pages (Exterior or best interior view).',
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

    // 3c. Additional Photos
    defineField({
        name: 'additionalPhotos',
        title: 'Additional Venue Photos',
        description: 'Atmosphere shots, different rooms, architectural details.',
        type: 'array',
        group: 'media',
        of: [
            {
                type: 'image',
                options: { hotspot: true },
                fields: [
                    defineField({
                        name: 'caption',
                        type: 'string',
                        title: 'Caption',
                        description: 'E.g. "Main Exhibition Hall" or "Entrance View"'
                    }),
                    defineField({
                        name: 'alt',
                        type: 'string',
                        title: 'Alt Text',
                    }),
                ]
            }
        ]
    }),
  ],
})
