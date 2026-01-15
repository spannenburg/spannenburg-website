import { defineField, defineType } from 'sanity'
import { TfiLayoutGrid3Alt } from 'react-icons/tfi'

export default defineType({
  name: 'artwork-grid',
  title: 'Artwork Grid',
  type: 'object',
  icon: TfiLayoutGrid3Alt,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title above the grid (e.g. "Selected Works")',
    }),
    defineField({
        name: 'layout',
        title: 'Grid Layout',
        type: 'string',
        options: {
            list: [
                { title: 'Masonry (Staggered)', value: 'masonry' },
                { title: 'Uniform Grid (Squares)', value: 'grid' },
                { title: 'Carousel / Slider', value: 'carousel' },
            ],
            layout: 'radio'
        },
        initialValue: 'masonry'
    }),
    defineField({
      name: 'artworks',
      title: 'Selected Artworks',
      type: 'array',
      // This is the magic part: We reference the 'artwork' documents you just made!
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
      validation: (rule) => rule.required().min(1).error('Select at least one artwork'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      count: 'artworks.length',
    },
    prepare({ title, count }) {
      return {
        title: title || 'Artwork Grid',
        subtitle: `${count || 0} artworks selected`,
      }
    },
  },
})
