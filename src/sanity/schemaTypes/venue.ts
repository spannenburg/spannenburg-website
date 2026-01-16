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
    // --- 1. GENERAL INFO ---
    defineField({
      name: 'name',
      title: 'Venue Name',
      description: 'The official name of the location. Example: "Zerp Galerie" or "Stadhuis Almere".',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Venue Type',
      description: 'Select the official category. This is used for JSON-LD structured data to boost GEO-authority.',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Art Gallery', value: 'ArtGallery' },
          { title: 'International Bank / Financial Inst.', value: 'FinancialService' },
          { title: 'Store / Salespoint', value: 'Store' },
          { title: 'Local Business / Corporate Office', value: 'LocalBusiness' },
          { title: 'Museum', value: 'Museum' },
          { title: 'Government Building (e.g. City Hall)', value: 'GovernmentBuilding' },
          { title: 'Foundation / NGO', value: 'NGO' },
          { title: 'Educational Organization (Academy/Uni)', value: 'EducationalOrganization' },
          { title: 'Library', value: 'Library' },
          { title: 'Institution (General)', value: 'Organization' },
          { title: 'Art Fair', value: 'Event' },
          { title: 'Festival (Cultural Event)', value: 'Festival' },
          { title: 'Public Park / Outdoor', value: 'Park' },
          { title: 'Church / Religious Building', value: 'PlaceOfWorship' },
          { title: 'Hotel', value: 'Hotel' },
          { title: 'Private Residence / Studio', value: 'Residence' },
          { title: 'Other / General Place', value: 'Place' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      description: 'The official URL (e.g., https://www.zerp.nl). Essential for linking authority and SEO.',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'about',
      title: 'About the Venue',
      description: 'Describe the reputation, history, and focus of this venue. Example: "A leading contemporary art gallery in Rotterdam focusing on photography and mixed media." (Crucial for E-E-A-T).',
      type: 'array',
      group: 'general',
      of: [{ type: 'block' }],
    }),

    // --- 2. GEO & ADDRESS ---
    defineField({
      name: 'address',
      title: 'Full Address',
      description: 'Street name and house number. Example: "Van Oldenbarneveltstraat 120A".',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      description: 'Example: "3012 GV".',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'city',
      title: 'City',
      description: 'Example: "Rotterdam" or "New York".',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      description: 'Example: "The Netherlands".',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'mapLink',
      title: 'Google Maps Link',
      description: 'Paste the Google Maps share URL for precise GEO-tagging.',
      type: 'url',
      group: 'location',
    }),

    // --- 3. VISUALS ---
    defineField({
      name: 'logo',
      title: 'Venue Logo',
      description: 'Upload the official logo (PNG or SVG preferred). Used for seller recognition in search results.',
      type: 'image',
      group: 'media',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Example: "Logo of Zerp Galerie".',
        }
      ]
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Photo (Hero)',
      description: 'The primary shot of the exterior or best interior view.',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Example: "Interior view of the main exhibition room at Zerp Galerie".',
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Venue Photos',
      description: 'Atmosphere shots, different rooms, architectural details.',
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
