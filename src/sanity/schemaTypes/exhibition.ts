import { defineField, defineType } from 'sanity'
import { TfiMapAlt } from 'react-icons/tfi'

export const exhibition = defineType({
  name: 'exhibition',
  title: 'Exhibitions',
  type: 'document',
  icon: TfiMapAlt,
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'location', title: 'Location (Venue)' },
    { name: 'story', title: 'Story & Visuals' },
    { name: 'artworks', title: 'Artworks & Peers' }, 
    { name: 'proof', title: 'Social Proof (E-E-A-T)' },
    { name: 'seo', title: 'SEO & AI' },
  ],
  fields: [
    // --- 1. GENERAL INFO ---
    defineField({
      name: 'title',
      title: 'Exhibition Name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Exhibition Type',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Solo Exhibition', value: 'solo' },
          { title: 'Group Exhibition', value: 'group' },
          { title: 'Art Fair / Festival', value: 'fair' },
          { title: 'Museum Exhibition', value: 'museum' },
          { title: 'Hybrid / Online', value: 'hybrid' },
        ],
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      group: 'general',
    }),
