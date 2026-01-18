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
import { sale } from './sale'
import { shippingZone } from './shippingZone'

// --- 2. PAGE MODULES & EXTRAS ---
import { hero } from './hero'
import { text } from './text'
import { artworkGrid } from './artworkGrid' 
import { metadata } from './metadata'
import { postList } from './postList'
import { mapModule } from './map' // <--- NIEUW: Importeer de map module (vanuit dezelfde map)

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
  sale,
  shippingZone,

  // Page Builder Modules & Components
  hero,
  text,
  artworkGrid,
  metadata,
  postList,
  mapModule, // <--- NIEUW: Toegevoegd aan de lijst
]
