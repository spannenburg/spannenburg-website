import { defineField, defineType } from 'sanity'
import { TfiSettings } from 'react-icons/tfi'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: TfiSettings,
  groups: [
    { name: 'branding', title: 'Branding' },
    { name: 'seo', title: 'Global SEO' },
    { name: 'contact', title: 'Business Info' },
  ],
  fields: [
    // --- BRANDING ---
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'branding',
      initialValue: 'Arjan Spannenburg | Fine Art Photography',
    }),
    defineField({
      name: 'logo',
      title: 'Main Logo',
      type: 'image',
      group: 'branding',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      description: 'Het icoontje in het browsertabblad (32x32px).',
      type: 'image',
      group: 'branding',
    }),

    // --- GLOBAL SEO ---
    defineField({
      name: 'description',
      title: 'Global SEO Description',
      description: 'De standaard omschrijving van je site als er geen specifieke pagina-info is.',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Global Share Image',
      description: 'De afbeelding die verschijnt op Social Media bij het delen van je link.',
      type: 'image',
      group: 'seo',
    }),

    // --- BUSINESS INFO (E-E-A-T) ---
    defineField({
        name: 'email',
        title: 'Business Email',
        type: 'string',
        group: 'contact',
    }),
    defineField({
        name: 'vatNumber',
        title: 'BTW Nummer',
        type: 'string',
        group: 'contact',
    }),
    defineField({
        name: 'chamberOfCommerce',
        title: 'KVK Nummer',
        type: 'string',
        group: 'contact',
    }),
    defineField({
        name: 'footerText',
        title: 'Footer Copyright Text',
        type: 'string',
        group: 'contact',
        initialValue: '© 2026 Arjan Spannenburg. All rights reserved.',
    }),
  ],
})
