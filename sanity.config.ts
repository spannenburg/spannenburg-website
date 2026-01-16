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

// We importeren alle iconen die we nodig hebben direct hier
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
  TfiTag,
  TfiMoney,
  TfiRulerPencil,
  TfiPaintRoller,
  TfiAlert,   // Voor To-Do
  TfiImage,   // Voor To-Do
  TfiTarget,  // Voor To-Do
  TfiCup,     // Voor Awards
  TfiCheckBox // Voor Categories
} from 'react-icons/tfi'

export default defineConfig({
  title: 'Spannenburg Art',
  icon,
  projectId,
  dataset,
  basePath: '/admin',

  plugins: [
    structureTool({
      // HIER zit de logica direct in het bestand (geen import nodig)
      structure: (S: any) =>
        S.list()
          .title('Spannenburg Studio')
          .items([
            // --- 0. 🚨 TO-DO LIST ---
            S.listItem()
              .title('🚨 To-Do / Incomplete')
              .icon(TfiAlert)
              .child(
                S.list()
                  .title('Action Items')
                  .items([
                    S.listItem()
                      .title('Artworks missing Image')
                      .icon(TfiImage)
                      .child(
                        S.documentList()
                          .title('Artworks missing Image')
                          .filter('_type == "artwork" && !defined(mainImage)')
                      ),
                    S.listItem()
                      .title('Artworks missing Story')
                      .icon(TfiWrite)
                      .child(
                        S.documentList()
                          .title('Artworks missing Story')
                          .filter('_type == "artwork" && !defined(description)')
                      ),
                    S.listItem()
                      .title('Artworks missing SEO')
                      .icon(TfiTarget)
                      .child(
                        S.documentList()
                          .title('Artworks missing SEO')
                          .filter('_type == "artwork" && !defined(keywords)')
                      ),
                    S.listItem()
                      .title('Empty Projects')
                      .icon(TfiLayers)
                      .child(
                        S.documentList()
                          .title('Empty Projects')
                          .filter('_type == "project" && !defined(artworks)')
                      ),
                  ])
              ),

            S.divider(),

            // --- 1. SETTINGS & PROFILE ---
            S.listItem()
              .title('Site Settings')
              .icon(TfiSettings)
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Artist Profile')
              .icon(TfiUser)
              .child(S.document().schemaType('author').documentId('author')),

            S.divider(),

            // --- 2. SUPPORTIVE DATA ---
            S.listItem()
              .title('Technical / Pricing')
              .icon(TfiMoney)
              .child(
                S.list()
                  .title('Commerce & Technical')
                  .items([
                    S.listItem()
                      .title('Materials & Finishes')
                      .icon(TfiPaintRoller)
                      .child(S.documentTypeList('material')),
                    S.listItem()
                      .title('Price Tiers')
                      .icon(TfiMoney)
                      .child(S.documentTypeList('priceTier')),
                    S.listItem()
                      .title('Size Templates')
                      .icon(TfiRulerPencil)
                      .child(S.documentTypeList('sizeTemplate')),
                    S.listItem()
                      .title('Categories')
                      .icon(TfiCheckBox)
                      .child(S.documentTypeList('category')),
                  ])
              ),
            S.listItem()
              .title('Venues & Galleries')
              .icon(TfiLocationPin)
              .child(S.documentTypeList('venue')),
            S.listItem()
              .title('Awards & Honors')
              .icon(TfiMedall)
              .child(S.documentTypeList('award')),
            S.listItem()
              .title('Artists (Peers)')
              .icon(TfiUser)
              .child(S.documentTypeList('artist')),

            S.divider(),

            // --- 3. ART PORTFOLIO ---
            S.listItem()
              .title('Projects / Series')
              .icon(TfiLayers)
              .child(S.documentTypeList('project')),
            S.listItem()
              .title('Artworks')
              .icon(TfiPalette)
              .child(S.documentTypeList('artwork')),

            S.divider(),

            // --- 4. EXHIBITIONS & NEWS ---
            S.listItem()
              .title('Exhibitions')
              .icon(TfiMapAlt)
              .child(S.documentTypeList('exhibition')),
            S.listItem()
              .title('Journal / News')
              .icon(TfiWrite)
              .child(S.documentTypeList('post')),

            S.divider(),

            // --- 5. PAGES ---
            S.listItem()
              .title('Pages')
              .icon(TfiFiles)
              .child(S.documentTypeList('page')),

            // --- 6. CATCH-ALL (Voor alles wat we vergeten zijn) ---
            ...S.documentTypeListItems().filter(
              (listItem: any) => 
                ![
                  'siteSettings', 
                  'author', 
                  'priceTier', 
                  'sizeTemplate', 
                  'venue', 
                  'award', 
                  'category', 
                  'project', 
                  'artwork', 
                  'exhibition', 
                  'post', 
                  'page', 
                  'artist', 
                  'material',
                  'artworkEdition', 
                  'metadata', 
                  'blockContent'
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
