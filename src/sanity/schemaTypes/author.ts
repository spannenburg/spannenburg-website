import { defineField, defineType } from 'sanity'
import { TfiUser } from 'react-icons/tfi'

export const author = defineType({
  name: 'author',
  title: 'Artist / Author',
  type: 'document',
  icon: TfiUser,
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'story', title: 'Biography & Philosophy' },
    { name: 'authority', title: 'Credentials (E-E-A-T)' },
    { name: 'contact', title: 'Contact & Socials' },
    { name: 'seo', title: 'SEO & AI' },
  ],
  fields: [
    // --- 1. GENERAL INFO ---
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
      description: 'Official artist name (e.g. Arjan Spannenburg).',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption / Credit',
          description: 'E.g. "Self-portrait, 2026"',
        }),
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'E.g. "Portrait of fine art photographer Arjan Spannenburg"',
        }),
      ],
    }),
    defineField({
        name: 'birthInfo',
        title: 'Birth Information',
        description: 'Important for Knowledge Graph & Museum archives.',
        type: 'object',
        group: 'general',
        fields: [
            defineField({name: 'birthDate', type: 'date', title: 'Date of Birth', initialValue: '1978-05-04'}),
            defineField({name: 'birthPlace', type: 'string', title: 'Place of Birth', initialValue: 'Texel, NL'}),
        ]
    }),
    defineField({
        name: 'location',
        title: 'Studio Location',
        type: 'string',
        group: 'general',
        description: 'City, Country (e.g. "Utrecht, The Netherlands"). Crucial for Local SEO.',
    }),
    // Representatie (Sponsor/Galerie)
    defineField({
        name: 'representedBy',
        title: 'Represented By (Gallery)',
        type: 'reference',
        to: [{ type: 'venue' }],
        group: 'general',
        description: 'Primary gallery representation (e.g. Zerp Galerie).',
    }),

    // --- 2. STORY & PHILOSOPHY (LLMO Goldmine) ---
    defineField({
      name: 'shortBio',
      title: 'Short Bio (Elevator Pitch)',
      description: 'Used for social media, footers, and meta descriptions (< 50 words).',
      type: 'text',
      rows: 3,
      group: 'story',
    }),
    defineField({
      name: 'biography',
      title: 'Full Biography',
      description: 'The life story, journey (Afghanistan -> Art), and background.',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({
        name: 'artistStatement',
        title: 'Artist Statement / Philosophy',
        description: 'The "Why". Your artistic vision. AI uses this to understand your themes (Vulnerability, Identity).',
        type: 'array',
        group: 'story',
        of: [{ type: 'block' }],
    }),
    defineField({
        name: 'topics',
        title: 'Artistic Themes (KnowsAbout)',
        description: 'Specific themes for Knowledge Graph (e.g. Male Vulnerability, LGBTQ+ Identity).',
        type: 'array',
        group: 'story',
        of: [{ type: 'string' }],
        options: {
            list: [
                { title: 'Fine Art Photography', value: 'Fine Art Photography' },
                { title: 'Black and White Photography', value: 'Black and White Photography' },
                { title: 'Male Nude Art', value: 'Male Nude Art' },
                { title: 'LGBTQ+ Identity', value: 'LGBTQ+ Identity' },
                { title: 'Clair-obscur', value: 'Clair-obscur' },
                { title: 'Male Vulnerability', value: 'Male Vulnerability' },
                { title: 'Identity Formation', value: 'Identity Formation' },
            ]
        }
    }),

    // --- 3. AUTHORITY & CREDENTIALS (E-E-A-T) ---
    defineField({
        name: 'cv',
        title: 'Downloadable CV (PDF)',
        type: 'file',
        group: 'authority',
    }),
    
    // *** AANGEPAST: NU GEKOPPELD AAN HET 'AWARD' DOCUMENT ***
    defineField({
        name: 'awards',
        title: 'Awards & Honors',
        description: 'Select awards from your database.',
        type: 'array',
        group: 'authority',
        of: [
            {
                type: 'reference', // <--- Verwijst nu naar je award bestand
                to: [{ type: 'award' }]
            }
        ]
    }),

    defineField({
        name: 'education',
        title: 'Education (AlumniOf)',
        type: 'array',
        group: 'authority',
        of: [
            {
                type: 'object',
                fields: [
                    defineField({name: 'period', type: 'string', title: 'Year(s)'}),
                    defineField({name: 'institution', type: 'string', title: 'School / Institution'}),
                    defineField({name: 'degree', type: 'string', title: 'Degree / Course'}),
                ]
            }
        ]
    }),

    // --- 4. CONTACT & SOCIALS (Trust Graph) ---
    defineField({
        name: 'email',
        title: 'Contact Email',
        type: 'string',
        group: 'contact',
    }),
    defineField({
        name: 'socials',
        title: 'Social Media & Profiles (SameAs)',
        description: 'Add Links to WikiData, Instagram, LinkedIn, etc.',
        type: 'array',
        group: 'contact',
        of: [
            {
                type: 'object',
                fields: [
                    defineField({
                        name: 'platform', 
                        type: 'string', 
                        title: 'Platform',
                        options: {
                            list: ['Instagram', 'LinkedIn', 'Facebook', 'Artsy', 'LensCulture', 'Wikipedia/Commons', 'WikiData', 'Vogue', 'Other']
                        }
                    }),
                    defineField({name: 'url', type: 'url', title: 'Profile URL'}),
                ],
                preview: {
                    select: { title: 'platform', subtitle: 'url' }
                }
            }
        ]
    }),

    // --- 5. SEO ---
    defineField({
      name: 'seoKeywords',
      title: 'Personal SEO Keywords',
      description: 'E.g. "Dutch Fine Art Photographer", "Queer Artist Holland".',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
