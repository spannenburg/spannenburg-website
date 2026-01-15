import { defineArrayMember, defineField, defineType } from 'sanity'
import { CalendarIcon, UsersIcon, ImageIcon, DocumentTextIcon } from '@sanity/icons'

export const exhibition = defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'story', title: 'Story & Context', icon: DocumentTextIcon },
    { name: 'media', title: 'Media / Photos', icon: ImageIcon },
  ],
  orderings: [
    {
      title: 'Date Descending',
      name: 'dateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
  fields: [
    // --- 1. DETAILS ---
    defineField({
      name: 'title',
      title: 'Exhibition Title',
      type: 'string',
      group: 'details',
      placeholder: 'e.g. Solo Exhibition "BOUND" or PAN Amsterdam',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Exhibition Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Solo Exhibition', value: 'solo' },
          { title: 'Duo Exhibition', value: 'duo' },
          { title: 'Group Exhibition', value: 'group' },
          { title: 'Art Fair', value: 'fair' },
        ],
      },
    }),
    defineField({
      name: 'venue',
      title: 'Location (Venue)',
      type: 'reference',
      group: 'details',
      to: [{ type: 'venue' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      group: 'details',
    }),

    // --- 2. STORY & CONTEXT ---
    defineField({
      name: 'description',
      title: 'About the Exhibition',
      description: 'Describe the theme, the atmosphere, the opening event, or the curatorial statement.',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }], // Rich Text
    }),
    defineField({
      name: 'curator',
      title: 'Curator',
      type: 'string',
      group: 'story',
      placeholder: 'Name of the curator(s)',
    }),
    defineField({
        name: 'participatingArtists',
        title: 'Other Participating Artists',
        description: 'Important for Group Shows. Lists other artists for context/SEO.',
        type: 'array',
        group: 'story',
        icon: UsersIcon,
        of: [{ type: 'string' }],
        options: {
            layout: 'tags'
        }
    }),
    // HIER LEGGEN WE DE RELATIE MET JE EIGEN KUNST
    defineField({
      name: 'featuredSeries',
      title: 'Arjan\'s Series shown here',
      type
