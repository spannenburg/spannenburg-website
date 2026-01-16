import { defineField, defineType } from 'sanity'
import { TfiLayers } from 'react-icons/tfi'

export const project = defineType({
  name: 'project',
  title: 'Projects / Series',
  type: 'document',
  icon: TfiLayers,
  groups: [
    { name: 'general', title: 'Core Data' },
    { name: 'content', title: 'Story & Narrative' },
    { name: 'visuals', title: 'Visuals' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // --- 1. CORE DATA ---
    defineField({
      name: 'title',
      title: 'Project Title',
      description: 'Name of the series (e.g. "CUPIDO" or "ESTRANGED").',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Release Year',
      type: 'string',
      group: 'general',
      placeholder: '2020-2022',
    }),

    // --- 2. CONTENT ---
    defineField({
      name: 'description',
      title: 'Project Description',
      description: 'The overarching story/theme of this series. What binds these works together?',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    
    // De koppeling met de Artworks (De Bron van je Keywords!)
    defineField({
      name: 'artworks',
      title: 'Artworks in this Series',
      description: 'Add the artworks here. The website will automatically pull their individual keywords.',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
    }),

    // --- 3. VISUALS ---
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      description: 'The "Hero" image representing the entire series.',
      type: 'image',
      group: 'visuals',
      options: { hotspot: true },
    }),

    // --- 4. SEO ---
    defineField({
      name: 'seoKeywords',
      title: 'Extra Keywords (Collection Level)',
      description: 'ONLY add broad terms here (e.g. "Fine Art Series"). Do NOT re-type keywords from the individual artworks; the website automatically merges those.',
      type: 'text',
      group: 'seo',
    }),
  ],
})
