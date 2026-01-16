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

// Importeer de Icons voor de menustructuur
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
  TfiTag
} from 'react-icons/tfi'

export default defineConfig({
  title: 'Spannenburg Art',
  icon,
  projectId,
  dataset,
  basePath: '/admin',

  plugins: [
    // Aangepaste Desk Structuur voor een betere Workflow
    structureTool({
      structure: (S) =>
        S.list()
          .title('Spannenburg Studio')
          .items([
            // 1. DE BASIS (Singletons)
            S.listItem()
              .title('Site Settings')
              .icon(TfiSettings)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Global Settings')
              ),
            S.listItem()
              .title('Artist Profile')
              .icon(TfiUser)
              .child(
                S.document()
                  .schemaType('author')
                  .documentId('author')
                  .title('Arjan Spannenburg')
              ),

            S.divider(),

            // 2. STAMDATA (Eerst invullen)
            S.listItem()
              .title('Venues & Galleries')
              .icon(TfiLocationPin)
              .child(S.documentTypeList('venue')),
            S.listItem()
              .title('Awards & Honors')
              .icon(TfiMedall)
              .child(S.documentTypeList('award')),
            S.listItem()
              .title('Categories')
              .icon(TfiTag)
              .child(S.documentTypeList('category')),

            S.divider(),

            // 3. CORE CONTENT
            S.listItem()
              .title('Projects / Series')
              .icon(TfiLayers)
              .child(S.documentTypeList('project')),
            S.listItem()
              .title('Artworks')
              .icon(TfiPalette)
              .child(S.documentTypeList('artwork')),

            S.divider(),

            // 4. ACTUALITEIT
            S.listItem()
              .title('Exhibitions')
              .icon(TfiMapAlt)
              .child(S.documentTypeList('exhibition')),
            S.listItem()
              .title('Journal / News')
              .icon(TfiWrite)
              .child(S.documentTypeList('post')),

            S.divider(),

            // 5. WEBSITE PAGES
            S.listItem()
              .title('Pages')
              .icon(TfiFiles)
              .child(S.documentTypeList('page')),

            // Voorkom dubbele weergave van handmatige items
            ...S.documentTypeListItems().filter(
              (listItem) => 
                !['siteSettings', 'author', 'venue', 'award', 'category', 'project', 'artwork', 'exhibition', 'post', 'page'].includes(listItem.getId() || '')
            ),
          ]),
    }),

    presentation,
    dashboardTool({
      name: 'deployment',
      title: 'Deployment',
      widgets: [vercelWidget()],
    }),
    dashboardTool({
      name: 'info',
      title: 'Info',
      widgets: [
        projectInfoWidget(),
        projectUsersWidget(),
        InfoWidget({ version: pkg.version }),
      ],
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    productionUrl: async (prev, { document }) => {
      if (document._type === 'page' || document._type === 'post') {
        return resolveUrl(document as any, { base: true })
      }
      return prev
    },
  },
})
