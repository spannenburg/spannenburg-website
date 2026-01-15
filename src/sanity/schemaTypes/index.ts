import { type SchemaTypeDefinition } from 'sanity'

// ---------------------------------------------
// 1. BESTAANDE BESTANDEN (Met accolades { })
// ---------------------------------------------
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
import { artworkGrid } from './artworkGrid'
import { postList } from './postList'

// ---------------------------------------------
// 2. NIEUWE MODULES (Zonder accolades, want export default)
// ---------------------------------------------
import hero from './modules/hero'

// ---------------------------------------------
// 3. DE LIJST SAMENVOEGEN
// ---------------------------------------------
export const schemaTypes: SchemaTypeDefinition[] = [
  // Documenten
  page,
  post,

  // Kunst & Projecten
  artwork,
  project,
  venue,
  exhibition,

  // Overige
  author,
  category,
  blockContent,
  metadata,

  // Modules
  hero,
  artworkGrid,
  postList,
]
