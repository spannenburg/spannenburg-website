import { defineField, defineType } from 'sanity'
import { TfiMapAlt } from 'react-icons/tfi'

export const exhibition = defineType({
  name: 'exhibition',
  title: 'Exhibitions',
  type: 'document',
  icon: TfiMapAlt,
  groups: [
    { name: 'details', title: 'Details & Date' },
    { name: 'curation', title: 'Artists & Artworks' }, // <--- HIER GEBEURT DE MAGIE
    { name: 'media', title: 'Media & Visuals' },
    { name: 'content', title: 'Press Release / Tekst' },
  ],
  fields: [
    // --- 1. DETAILS ---
    defineField({
      name: 'title',
      title: 'Exhibition Title',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Venue',
      description: 'Where is this taking place?',
      type: 'reference',
      group: 'details',
      to: [{ type: 'venue' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Opening Date',
      type: 'datetime',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Closing Date',
      type: 'datetime',
      group: 'details',
    }),

    // --- 2. CURATION (De automatische koppeling) ---
    defineField({
      name: 'artists',
      title: 'Participating Artists',
      description: 'Select ALL artists involved. This automatically updates their CV on the website.',
      type: 'array',
      group: 'curation',
      of: [
        { 
          type: 'reference', 
          to: [
            { type: 'author' }, // Je eigen Gallery Artists (Arjan)
            { type: 'artist' }  // De Peers / Gasten
          ] 
        }
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'featuredArtworks',
      title: 'Exhibited Artworks',
      description: 'Which specific pieces are on display? (Links to Inventory)',
      type: 'array',
      group: 'curation',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
    }),

    // --- 3. CONTENT ---
    defineField({
      name: 'description',
      title: 'Exhibition Text / Press Release',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),

    // --- 4. MEDIA ---
    defineField({
      name: 'mainImage',
      title: 'Main Poster / Flyer',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Impression (Opening Night etc.)',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      venue: 'location.name',
      date: 'startDate',
      media: 'mainImage',
    },
    prepare({ title, venue, date, media }) {
      return {
        title: title,
        subtitle: `${venue || 'Unknown Location'} | ${date ? new Date(date).toLocaleDateString() : 'TBA'}`,
        media: media,
      }
    },
  },
})
