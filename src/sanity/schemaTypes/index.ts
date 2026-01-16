import { type SchemaTypeDefinition } from 'sanity'

import { page } from './page'
import { post } from './post'
import { artwork } from './artwork'
import { project } from './project'
import { venue } from './venue'
import { exhibition } from './exhibition'
import { author } from './author'
import { category } from './category'
import { blockContent } from './blockContent'
import { metadata } from './metadata'
import { award } from './award'
import { siteSettings } from './siteSettings'
import { priceTier } from './priceTier'
import { sizeTemplate } from './sizeTemplate'
import { artworkEdition } from './artworkEdition'
import { artist } from './artist' // <--- ADDED: Needed for Entity Linking

import { postList } from './postList'
import hero from './modules/hero'
import artworkGridNew from './modules/artworkGrid' 
import text from './modules/text'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  author,
  page,
  post,
  artwork,
  project,
  venue,
  exhibition,
  category,
  award,
  artist,           // <--- ADDED: Fixes the "Unknown type" error
  priceTier,
  sizeTemplate,    
  artworkEdition,
  blockContent,
  metadata,
  hero,
  artworkGridNew,
  text,
  postList,         
]
