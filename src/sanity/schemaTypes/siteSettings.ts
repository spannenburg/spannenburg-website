import { defineField, defineType } from 'sanity'
import { TfiSettings } from 'react-icons/tfi'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: TfiSettings,
  fields: [
    // --- PRESERVED FIELDS ---
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description (SEO)',
      description: 'The main meta-description for the homepage (150-160 characters).',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description: 'The image shown when you share the website link on social media.',
      type: 'image',
      options: { hotspot: true }, // Added hotspot for better social cropping
    }),
    defineField({
      name: 'keywords',
      title: 'Global Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    // --- STRATEGIC ADDITIONS FOR E-E-A-T & THE BRIDGE ---
    defineField({
      name: 'legacyDomain',
      title: 'Legacy Dutch Domain',
      description: 'Reference for arjanspannenburg.nl. This tells Google you are the owner of both sites, transferring 10+ years of authority.',
      type: 'url',
      initialValue: 'https://www.arjanspannenburg.nl',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social & Identity Profiles',
      description: 'Links to Instagram, LinkedIn, RKD, or Wikipedia. Crucial for AI (LLMO) to verify your identity as an established artist.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
    defineField({
        name: 'copyrightHolder',
        title: 'Copyright Holder',
        type: 'string',
        initialValue: 'Arjan Spannenburg',
        description: 'Used for the JSON-LD schema copyright section.',
    }),
  ],
})
