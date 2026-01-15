import { type SchemaTypeDefinition } from 'sanity'

// ---------------------------------------------
// 1. DOCUMENTEN (Je Core Data)
// ---------------------------------------------
import { page } from './page'
import { post } from './post'
import { artwork } from './artwork' // Dit is nu je nieuwe, uitgebreide bestand!
import { project } from './project'
import { venue } from './venue'
import { exhibition } from './exhibition'
import { author } from './author'
import { category } from './category'
import { blockContent } from './blockContent'
import { metadata } from './metadata'

// ---------------------------------------------
// 2. OUDE MODULES (Die los in de map staan)
// ---------------------------------------------
// We importeren ze wel, maar zetten ze misschien uit als we ze vervangen hebben.
import { postList } from './postList'
// import { artworkGrid } from './artworkGrid' // OUD: Deze zetten we even uit ten gunste van de nieuwe

// ---------------------------------------------
// 3. NIEUWE MODULES (Uit de 'modules' map)
// ---------------------------------------------
import hero from './modules/hero'
// We importeren de nieuwe grid en geven hem een unieke naam om verwarring te voorkomen
import artworkGridNew from './modules/artworkGrid' 
// import text from './modules/text' // Zet deze aan (// weghalen) als je text.ts hebt aangemaakt

// ---------------------------------------------
// 4. DE LIJST SAMENVOEGEN
// ---------------------------------------------
export const schemaTypes: SchemaTypeDefinition[] = [
  // Documenten
  page,
  post,
  artwork, // Je nieuwe structuur
  project,
  venue,
  exhibition,
  author,
  category,
  
  // Hulpstukken
  blockContent,
  metadata,

  // Modules
  hero,
  artworkGridNew, // <--- De nieuwe grid module
  postList,       // <--- De oude post lijst (bewaard voor de zekerheid)
]
