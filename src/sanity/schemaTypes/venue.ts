import { defineField, defineType } from 'sanity'
import { TfiLocationPin } from 'react-icons/tfi'

export const venue = defineType({
  name: 'venue',
  title: 'Venues & Galleries',
  type: 'document',
  icon: TfiLocationPin,
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'location', title: 'GEO & Address' },
    { name: 'media', title: 'Visuals' },
  ],
  fields: [
    // --- GENERAL INFO ---
    defineField({
      name: 'name',
      title: 'Venue Name',
      description: 'The official name of the gallery, museum, or space.',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Venue Type',
      description: 'Categorizing the venue helps AI and Search Engines understand the context of the location.',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Art Gallery', value: 'ArtGallery' },
          { title: 'Salespoint', value: 'Salespoint' },
          { title: 'Art Fair', value: 'ArtFair' },
          { title: 'Exhibition Space', value: 'ExhibitionSpace' },
          { title: 'Museum', value: 'Museum' },
          { title: 'Public Space (Outdoor)', value: 'PublicSpace' },
          { title: 'Institution', value: 'Institution' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      description: 'The official URL (e.g., https://www.zerp.nl). Essential for linking authority.',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'about',
      title: 'About the Venue',
      description: 'Describe the reputation, history, and focus of this venue. (Crucial for E-E-A-T: helps verify the quality of where your work is shown).',
      type: 'array',
      group: 'general',
      of: [{ type: 'block' }],
    }),

    // --- GEO & ADDRESS ---
    defineField({
      name: 'address',
      title: 'Full Address',
      description: 'The complete address including house number (e.g., Van Oldenbarneveltstraat 120A).',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      description: 'e.g., 3012 GV',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'city',
      title: 'City',
      description: 'e.g., Rotterdam',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      description: 'e.g., The Netherlands',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'mapLink',
      title: 'Google Maps Link',
      description: 'Paste the Google Maps share URL here for GEO-tagging accuracy.',
      type: 'url',
      group: 'location',
    }),

    // --- VISUALS ---
    defineField({
      name: 'logo',
      title: 'Venue Logo',
      description: 'Upload the official logo (PNG or SVG preferred). Used for seller recognition.',
      type: 'image',
      group: 'media',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'E.g., "Logo of Zerp Galerie"',
        }
      ]
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Photo (Hero)',
      description: 'The primary shot used on overview pages (Exterior or best interior view).',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'E.g., "Interior view of Zerp Galerie Rotterdam"',
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Venue Photos',
      description: 'Atmosphere shots, different rooms, or architectural details.',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' }
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unnamed Venue',
        subtitle: subtitle || 'Location unknown',
        media: media,
      }
    },
  },
})
