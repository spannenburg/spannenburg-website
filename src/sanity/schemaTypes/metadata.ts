import { defineField, defineType } from 'sanity'

export const metadata = defineType({
  name: 'metadata',
  title: 'SEO & Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'De achterkant van de URL (bijv. /contact)',
      options: {
        source: (doc: any) => doc.title, // Genereer automatisch o.b.v. titel
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Browser Title',
      type: 'string',
      description: 'Titel in het tabblad van Google',
      validation: (Rule) => Rule.max(60).warning('Lange titels worden afgekapt'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Korte omschrijving voor in de zoekresultaten',
      validation: (Rule) => Rule.max(160).warning('Lange omschrijvingen worden afgekapt'),
    }),
    defineField({
      name: 'image',
      title: 'Social Share Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Verberg voor zoekmachines (NoIndex)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
