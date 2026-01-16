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

// NIEUW: We importeren de structuur (met To-Do lijst) uit het aparte bestand
// Zorg dat src/sanity/structure.ts bestaat!
import { structure } from './src/sanity/structure'

export default defineConfig({
  title: 'Spannenburg Art',
  icon,
  projectId,
  dataset,
  basePath: '/admin',

  plugins: [
    // 1. STRUCTURE TOOL (Nu gekoppeld aan je nieuwe menu met To-Do lijst)
    structureTool({
      structure: structure, 
    }),

    // 2. PRESENTATION (Visual Editing)
    presentation,

    // 3. DASHBOARD (Widgets)
    dashboardTool({ 
      name: 'deployment', 
      title: 'Deployment', 
      widgets: [vercelWidget()] 
    }),
    dashboardTool({
      name: 'info',
      title: 'Info',
      widgets: [
        projectInfoWidget(), 
        projectUsersWidget(), 
        InfoWidget({ version: pkg.version })
      ],
    }),

    // 4. DEV TOOLS
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],

  schema: { 
    types: schemaTypes 
  },

  document: {
    productionUrl: async (prev, { document }) => {
      // Zorgt dat de "Open Preview" knop werkt voor pagina's en nieuwsberichten
      if (document._type === 'page' || document._type === 'post') {
        return resolveUrl(document as any, { base: true })
      }
      return prev
    },
  },
})
