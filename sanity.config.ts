import { type SchemaTypeDefinition } from 'sanity'

// --- 1. CORE CONTENT ---
import { blockContent } from './blockContent'
import { category } from './category'
import { post } from './post'
import { author } from './author'
import { artwork } from './artwork'
import { artworkEdition } from './artworkEdition'
import { project } from './project'
import { exhibition } from './exhibition'
import { venue } from './venue'
import { artist } from './artist'
import { page } from './page'
import { siteSettings } from './siteSettings'
import { priceTier } from './priceTier'
import { sizeTemplate } from './sizeTemplate'
import { material } from './material'
import { note } from './note'
import { priceGroup } from './priceGroup'

// --- 2. PAGE MODULES (HERSTELD) ---
// Deze bestanden zijn nodig voor de Page Builder
import { hero } from './hero'
import { text } from './text' // Bevat waarschijnlijk name: 'text-module'
import { artworkGrid } from './artworkGrid' // Bevat waarschijnlijk name: 'artwork-grid'
import { metadata } from './metadata'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Core
  post,
  author,
  category,
  blockContent,
  artwork,
  artworkEdition,
  project,
  exhibition,
  venue,
  artist,
  page,
  siteSettings,
  priceTier,
  sizeTemplate,
  material,
  note,
  priceGroup,
  hero,
  text,
  artworkGrid,
  metadata,
]
