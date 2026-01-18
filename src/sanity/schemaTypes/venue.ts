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
      description: 'The official name of the location. Example: "Zerp Galerie", "Stadhuis Almere" or "The New York Times".',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Organization Type',
      description: 'Select the category. Crucial for E-E-A-T: distinguish between physical Exhibition locations and Media publishers (for Awards/Press).',
      type: 'string',
      group: 'general',
      options: {
        list: [
          // --- FYSIEKE LOCATIES (Exposities) ---
          { title: 'Art Gallery', value: 'ArtGallery' },
          { title: 'Museum', value: 'Museum' },
          { title: 'Art Fair', value: 'Event' },
          { title: 'Festival (Cultural Event)', value: 'Festival' },
          { title: 'Theater / Performing Arts', value: 'PerformingArtsTheater' },
          { title: 'Institution (General)', value: 'Organization' },
          { title: 'Educational Organization (Academy/Uni)', value: 'EducationalOrganization' },
          { title: 'Foundation / NGO', value: 'NGO' },
          { title: 'Government Building (e.g. City Hall)', value: 'GovernmentBuilding' },
          { title: 'Library', value: 'Library' },
          { title: 'Church / Religious Building', value: 'PlaceOfWorship' },
          { title: 'Public Park / Outdoor', value: 'Park' },
          { title: 'International Bank / Financial Inst.', value: 'FinancialService' },
          { title: 'Store / Salespoint', value: 'Store' },
          { title: 'Local Business / Corporate Office', value: 'LocalBusiness' },
          { title: 'Hotel', value: 'Hotel' },
          { title: 'Private Residence / Studio', value: 'Residence' },
          
          // --- DIVIDER ---
          { title: '-------------------------', value: '_divider' },

          // --- MEDIA & PUBLICATIES (Awards / Reviews) ---
          { title: '📰 Newspaper', value: 'Newspaper' },
          { title: '📖 Magazine / Journal', value: 'Magazine' },
          { title: '📻 Radio Station', value: 'RadioStation' },
          { title: '📺 TV Channel / Broadcaster', value: 'TelevisionStation' },
          { title: '🌐 Online Publication / Blog', value: 'WebSite' },
          
          // --- OVERIG ---
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
      title: 'About the Venue / Organization',
      description: 'Describe the reputation, history, and focus. Example: "A leading contemporary art gallery..." or "A national daily newspaper...".',
      type: 'array',
      group: 'general',
      of: [{ type: 'block' }],
    }),

    // --- 2. GEO & ADDRESS ---
    defineField({
      name: 'address',
      title: 'Full Address',
      description: 'Street name and house number. Example: "Van Oldenbarneveltstraat 120A". (Leave empty for Online-only media).',
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
      title: 'Logo',
      description: 'Upload the official logo (PNG or SVG preferred). Essential for Awards badges and Press sections.',
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
      title: 'Additional Photos',
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
      type: 'type',
      media: 'logo',
    },
    prepare({ title, subtitle, type, media }) {
      // Kleine logica om type netjes te tonen in de lijst
      const typeIcons:Record<string, string> = {
        'Newspaper': '📰',
        'Magazine': '📖',
        'RadioStation': '📻',
        'TelevisionStation': '📺',
        'WebSite': '🌐',
        'ArtGallery': '🎨',
        'Museum': '🏛️'
      };
      const icon = typeIcons[type] || '📍';

      return {
        title: title || 'Unnamed Venue',
        subtitle: `${icon} ${type || 'No Type'} | ${subtitle || 'No City'}`,
        media: media,
      }
    },
  },
})
