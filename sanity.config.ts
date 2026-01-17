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
  TfiNotepad,
  TfiStar,
  TfiIdBadge,
  TfiBarChart,
  TfiLayoutListThumb,
  TfiReceipt // <--- 1. NIEUW: Icoon voor Sales
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
          .title('Spannenburg Gallery')
          .items([
            // --- 0. 🚨 ACTION CENTER ---
            S.listItem()
              .title('Action Center')
              .icon(TfiAlert)
              .child(
                S.list()
                  .title('To Do / Fixes')
                  .items([
                    // 1. DE "ALLES-IN-ÉÉN" LIJST
                    S.listItem()
                      .title('⚠️ Show ALL Issues')
                      .icon(TfiLayoutListThumb)
                      .child(
                        S.documentList()
                          .title('All Items Needing Attention')
                          .filter(`
                            (_type == "artwork" && !defined(mainImage)) || 
                            (_type == "artwork" && !defined(description)) ||
                            (_type == "artwork" && !defined(keywords)) ||
                            (_type == "venue" && !defined(image)) ||
                            (_type == "author" && !defined(bio))
                          `)
                      ),
                    
                    S.divider(),

                    // 2. SPECIFIEKE CATEGORIEËN
                    S.listItem()
                      .title('Venues missing Image') 
                      .icon(TfiLocationPin)
                      .child(S.documentList().title('Venues missing Image').filter('_type == "venue" && !defined(image)')),

                    S.listItem()
                      .title('Artists missing Bio') 
                      .icon(TfiUser)
                      .child(S.documentList().title('Artists missing Bio').filter('_type == "author" && !defined(bio)')),

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

            S.divider(),
            
            // --- 1. 📝 IDEAS ---
            S.documentTypeListItem('note').title('My Ideas & Notes').icon(TfiNotepad),
            
            S.divider(),

            // --- 2. 🌟 THE GALLERY ROSTER ---
            S.documentTypeListItem('author').title('Represented Artists').icon(TfiStar),
            S.documentTypeListItem('artwork').title('Artworks Inventory').icon(TfiPalette),
            S.documentTypeListItem('project').title('Projects / Series').icon(TfiLayers),

            S.divider(),

            // --- 3. 📣 MARKETING & NEWS ---
            S.documentTypeListItem('post').title('Journal / News').icon(TfiWrite),

            S.divider(),

            // --- 4. 💼 SALES & ORDERS (NIEUW) ---
            S.documentTypeListItem('sale').title('Sales & Orders').icon(TfiReceipt),

            S.divider(),

            // --- 5. 🌍 CONTEXT & NETWORK ---
            S.documentTypeListItem('exhibition').title('Exhibitions').icon(TfiMapAlt),
            S.documentTypeListItem('venue').title('Venues / Locations').icon(TfiLocationPin),
            S.documentTypeListItem('artist').title('Referenced Artists (Peers)').icon(TfiIdBadge),

            S.divider(),

            // --- 6. 🏷️ ORGANIZATION ---
            S.documentTypeListItem('category').title('Categories / Hubs').icon(TfiCheckBox),

            S.divider(),

            // --- 7. ⚙️ TECHNICAL & COMMERCE ---
            S.listItem()
              .title('Technical / Pricing')
              .icon(TfiMoney)
              .child(
                S.list()
                  .title('Commerce & Technical')
                  .items([
                    S.documentTypeListItem('priceGroup').title('Price Groups (Levels)').icon(TfiBarChart),
                    S.documentTypeListItem('priceTier').title('Price Tiers').icon(TfiMoney),
                    S.documentTypeListItem('sizeTemplate').title('Size Templates').icon(TfiRulerPencil),
                    S.documentTypeListItem('material').title('Materials & Finishes').icon(TfiPaintRoller),
                  ])
              ),

            S.divider(),

            // --- 8. 🖥️ SITE MANAGEMENT ---
            S.documentTypeListItem('page').title('Pages').icon(TfiFiles),
            S.listItem()
              .title('Site Settings')
              .icon(TfiSettings)
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            // --- CATCH-ALL ---
            ...S.documentTypeListItems().filter(
              (listItem: any) => 
                ![
                  'siteSettings', 'author', 'priceTier', 'sizeTemplate', 'venue', 'award', 'category', 'project', 'artwork', 'exhibition', 'post', 'page', 'artist', 'material', 'artworkEdition', 'metadata', 'blockContent', 'note', 'priceGroup', 
                  'sale' // <--- 2. NIEUW: Toegevoegd aan filter zodat hij niet dubbel verschijnt
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
