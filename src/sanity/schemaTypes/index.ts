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
import { sale } from './sale' // <--- NIEUW: De enige toevoeging

// --- 2. PAGE MODULES & EXTRAS ---
import { hero } from './hero'
import { text } from './text'
import { artworkGrid } from './artworkGrid' 
import { metadata } from './metadata'
import { postList } from './postList'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Core Documents
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
  sale, // <--- NIEUW: Toegevoegd aan de lijst

  // Page Builder Modules & Components
  hero,
  text,
  artworkGrid,
  metadata,
  postList,
]
