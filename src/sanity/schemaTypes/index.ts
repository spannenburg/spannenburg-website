import { type SchemaTypeDefinition } from 'sanity'

// ---------------------------------------------
// 1. BESTAANDE BESTANDEN (Die los in de map staan)
// ---------------------------------------------
import page from './page'
import post from './post'
import artwork from './artwork'
import project from './project'
import venue from './venue'
import exhibition from './exhibition'
import author from './author'
import category from './category'
import blockContent from './blockContent'
import metadata from './metadata'

// Oude modules die waarschijnlijk ook los staan:
import artworkGrid from './artworkGrid' 
import postList from './postList' 

// ---------------------------------------------
// 2. NIEUWE MODULES (In je nieuwe mapje)
// ---------------------------------------------
// We pakken specifiek de nieuwe versie die we net gemaakt hebben
import hero from './modules/hero' 


// ---------------------------------------------
// 3. DE LIJST SAMENVOEGEN
// ---------------------------------------------
export const schemaTypes: SchemaTypeDefinition[] = [
  // Documenten (Pagina's & Posts)
  page,
  post,
  
  // Jouw Kunst & Werk (Ja, we zetten ze gewoon aan!)
  artwork,
  project,
  venue,
  exhibition,
  
  // Taxonomie (Categorieën & Auteurs)
  category,
  author,

  // Hulpstukken
  blockContent,
  metadata,

  // Modules (Blokken voor op de pagina)
  hero,         // <--- Dit is de belangrijkste voor nu!
  artworkGrid,
  postList,
]
