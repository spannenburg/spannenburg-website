import { type SchemaTypeDefinition } from 'sanity'

// Importeer al je bestanden
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

// Let op: 'award' is hier verwijderd omdat die nu in author zit.

export const schemaTypes: SchemaTypeDefinition[] = [
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
  priceGroup, // Hier zat de typfout, nu opgelost met een komma
]
