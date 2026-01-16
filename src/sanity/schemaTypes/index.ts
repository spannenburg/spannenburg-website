import { type SchemaTypeDefinition } from 'sanity'

// ---------------------------------------------
// 1. DOCUMENTEN (Je Core Data)
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
import { award } from './award'

// ---------------------------------------------
// 2. OUDE MODULES (Die los in de map staan)
// ---------------------------------------------
import { postList } from './postList'
// import { artworkGrid } from './artworkGrid' // OUD: Uitgezet voor de zekerheid

// ---------------------------------------------
// 3. NIEUWE MODULES (Uit de 'modules' map)
// ---------------------------------------------
import hero from './modules/hero'
import artworkGridNew from './modules/artworkGrid' 
import text from './modules/text' // <--- DEZE HEB IK NU GEACTIVEERD

// ---------------------------------------------
// 4. DE LIJST SAMENVOEGEN
// ---------------------------------------------
export const schemaTypes: SchemaTypeDefinition[] = [
  // Documenten
  page,
  post,
  artwork,
  project,
  venue,
  exhibition,
  author,
  category,
  award,
  
  // Hulpstukken
  blockContent,
  metadata,

  // Modules
  hero,
  artworkGridNew,
  text,           // <--- DEZE IS TOEGEVOEGD AAN DE LIJST
  postList,       
]
