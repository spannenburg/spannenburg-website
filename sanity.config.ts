'use client'

import pkg from './package.json'
import { defineConfig } from 'sanity'
import { projectId, dataset, apiVersion } from '@/sanity/lib/env'
import { structureTool } from 'sanity/structure'
import { presentation } from './src/sanity/presentation'
import { icon } from '@/sanity/ui/Icon'
import { InfoWidget } from '@/sanity/ui/InfoWidget'
import {
  dashboardTool,
  projectInfoWidget,
  projectUsersWidget,
} from '@sanity/dashboard'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './src/sanity/schemaTypes'
import resolveUrl from '@/lib/resolveUrl'

import {
  TfiSettings,
  TfiUser,
  TfiLocationPin,
  TfiMedall,
  TfiLayers,
  TfiPalette,
  TfiMapAlt,
  TfiWrite,
  TfiFiles,
  TfiMoney,
  TfiRulerPencil,
  TfiPaintRoller,
  TfiAlert,
  TfiImage,
  TfiTarget,
  TfiCup,
  TfiCheckBox,
  TfiNotepad // <--- NIEUW ICOON
} from 'react-icons/tfi'

export default defineConfig({
  title: 'Spannenburg Art',
  icon,
  projectId,
  dataset,
  basePath: '/admin',

  plugins: [
    structureTool({
      structure: (S: any) =>
        S.list()
          .title('Spannenburg Studio')
          .items([
            // --- 0. 🚨 SYSTEM TO-DO ---
            S.listItem()
              .title('🚨 System Checks')
              .icon(TfiAlert)
              .child(
                S.list()
                  .title('Action Items')
                  .items([
                    S.listItem()
                      .title('Artworks missing Image')
                      .icon(TfiImage)
                      .child(S.documentList().title('Artworks missing Image').filter('_type == "artwork" && !defined(mainImage)')),
                    S.listItem()
                      .title('Artworks missing Story')
                      .icon(TfiWrite)
                      .child(S.documentList().title('Artworks missing Story').filter('_type == "artwork" && !defined(description)')),
                    S.listItem()
                      .title('Artworks missing SEO')
                      .icon(TfiTarget)
                      .child(S.documentList().title('Artworks missing SEO').filter('_type == "artwork" && !defined(keywords)')),
                    S.listItem()
                      .title('Empty Projects')
                      .icon(TfiLayers)
                      .child(S.documentList().title('Empty Projects').filter('_type == "project" && !defined(artworks)')),
                  ])
              ),

            // --- 1. 📝 MY NOTES (NIEUW!) ---
            S.divider(),
            S.documentTypeListItem('note')
              .title('My Ideas & Notes')
              .icon(TfiNotepad),
            S.divider(),

            // --- 2. 🎨 CORE CONTENT ---
            S.documentTypeListItem('artwork').title('Artworks').icon(TfiPalette),
            S.documentTypeListItem('project').title('Projects / Series').icon(TfiLayers),
            S.documentTypeListItem('post').title('Journal / News').icon(TfiWrite),

            S.divider(),

            // --- 3. 🌍 CONTEXT & EVENTS ---
            S.documentTypeListItem('exhibition').title('Exhibitions').icon(TfiMapAlt),
            S.documentTypeListItem('venue').title('Venues / Locations').icon(TfiLocationPin),
            S.documentTypeListItem('artist').title('Artists (Peers)').icon(TfiUser),

            S.divider(),

            // --- 4. 🏷️ ORGANIZATION & PROOF ---
            S.documentTypeListItem('category').title('Categories / Hubs').icon(TfiCheckBox),
            S.documentTypeListItem('award').title('Awards & Honors').icon(TfiMedall),

            S.divider(),

            // --- 5. ⚙️ TECHNICAL & COMMERCE ---
            S.listItem()
              .title('Technical / Pricing')
              .icon(TfiMoney)
              .child(
                S.list()
                  .title('Commerce & Technical')
                  .items([
                    S.documentTypeListItem('priceTier').title('Price Tiers').icon(TfiMoney),
                    S.documentTypeListItem('sizeTemplate').title('Size Templates').icon(TfiRulerPencil),
                    S.documentTypeListItem('material').title('Materials & Finishes').icon(TfiPaintRoller),
                  ])
              ),

            S.divider(),

            // --- 6. 🖥️ WEBSITE MANAGEMENT ---
            S.documentTypeListItem('page').title('Pages').icon(TfiFiles),
            S.listItem()
              .title('Artist Profile')
              .icon(TfiUser)
              .child(S.document().schemaType('author').documentId('author')),
            S.listItem()
              .title('Site Settings')
              .icon(TfiSettings)
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            // --- 7. CATCH-ALL ---
            ...S.documentTypeListItems().filter(
              (listItem: any) => 
                ![
                  'siteSettings', 'author', 'priceTier', 'sizeTemplate', 'venue', 'award', 'category', 'project', 'artwork', 'exhibition', 'post', 'page', 'artist', 'material', 'artworkEdition', 'metadata', 'blockContent', 
                  'note' // <--- VERGEET DEZE NIET TE FILTEREN
                ].includes(listItem.getId() || '')
            ),
          ]),
    }),

    presentation,
    dashboardTool({ name: 'deployment', title: 'Deployment', widgets: [vercelWidget()] }),
    dashboardTool({
      name: 'info',
      title: 'Info',
      widgets: [projectInfoWidget(), projectUsersWidget(), InfoWidget({ version: pkg.version })],
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],

  schema: { types: schemaTypes },

  document: {
    productionUrl: async (prev, { document }) => {
      if (document._type === 'page' || document._type === 'post') {
        return resolveUrl(document as any, { base: true })
      }
      return prev
    },
  },
})
