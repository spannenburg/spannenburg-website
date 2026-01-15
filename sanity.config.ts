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

export default defineConfig({
  title: 'Spannenburg Art',
  icon,
  projectId,
  dataset,
  basePath: '/admin',

  plugins: [
    // Gewoon de standaard structuur
    structureTool(), 

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
    // HIER HEBBEN WE DE VERTALING PLUGIN WEGGEHAALD
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
