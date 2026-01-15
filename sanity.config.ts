'use client'

import pkg from './package.json'
import { defineConfig } from 'sanity'
import { projectId, dataset, apiVersion } from '@/sanity/lib/env'
// FIX 1: We importeren de officiële tool, in plaats van jouw eigen bestand
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
import { supportedLanguages } from '@/lib/i18n'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './src/sanity/schemaTypes'
import resolveUrl from '@/lib/resolveUrl'

const singletonTypes: string[] = []

export default defineConfig({
  title: 'Spannenburg Art',
  icon,
  projectId,
  dataset,
  basePath: '/admin',

  plugins: [
    // FIX 2: We gebruiken de standaard structuur tool.
    // Dit negeert eventuele fouten in jouw mappen en toont gewoon alles wat er is.
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
    documentInternationalization({
      supportedLanguages,
      schemaTypes: ['page', 'post'],
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.includes(schemaType),
      ),
  },

  document: {
    productionUrl: async (prev, { document }) => {
      if (document._type === 'page' || document._type === 'post') {
        return resolveUrl(document as any, { base: true })
      }
      return prev
    },
    actions: (input, { schemaType }) => {
      if (singletonTypes.includes(schemaType)) {
        return input.filter((item) => 
          item.action && ['publish', 'discardChanges', 'restore'].includes(item.action)
        )
      }
      return input
    },
  },
})
