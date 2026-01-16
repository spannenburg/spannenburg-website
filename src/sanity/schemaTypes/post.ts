import { defineField, defineType } from 'sanity'
import { TfiWrite } from 'react-icons/tfi'

export const post = defineType({
  name: 'post',
  title: 'Journal / News',
  type: 'document',
  icon: TfiWrite,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Visuals' },
    { name: 'relations', title: 'Links & Shop' },
  ],
  fields: [
    // --- 1. BASIS ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
      initialValue: (new Date()).toISOString(),
    }),

    // --- 2. DE BODY (Tekst + Beelden tussen de tekst) ---
    defineField({
      name: 'body',
      title: 'Post Content',
      description: 'Schrijf hier je verhaal. Je kunt hier ook losse beelden tussen de paragrafen voegen.',
      type: 'blockContent', 
      group: 'content',
    }),

    // --- 3. DE SERIE / GALLERY (Visuals Tab) ---
    defineField({
      name: 'mainImage',
      title: 'Main Image (Cover)',
      description: 'Het beeld dat in het overzicht verschijnt.',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Text' })
      ]
    }),
    defineField({
        name: 'imageGallery',
        title: 'Image Gallery / Series',
        description: 'Voeg hier een serie beelden toe die bij dit bericht horen (bijv. een reportage).',
        type: 'array',
        group: 'media',
        of: [
            {
                type: 'image',
                options: { hotspot: true },
                fields: [
                    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
                    defineField({ name: 'alt', type: 'string', title: 'Alt Text' })
                ]
            }
        ]
    }),

    // --- 4. RELATIES (Upselling & E-E-A-T) ---
    defineField({
        name: 'relatedArtworks',
        title: 'Mentioned Artworks',
        description: 'Link naar de kunstwerken die je in dit bericht bespreekt.',
        type: 'array',
        group: 'relations',
        of: [{ type: 'reference', to: [{ type: 'artwork' }] }]
    }),
    defineField({
        name: 'relatedExhibition',
        title: 'Related Exhibition',
        type: 'reference',
        group: 'relations',
        to: [{ type: 'exhibition' }]
    }),
  ],
})
