import { type SchemaTypeDefinition } from 'sanity'

// Basis types
import { blockContent } from './blockContent'
import { category } from './category'
import { author } from './author'
import { post } from './post'

// Jouw Kunst & Track Record
import { project } from './project'
import { artwork } from './artwork'
import { venue } from './venue'
import { exhibition } from './exhibition'

// Page Modules (De "Meubels" voor je homepage)
import { hero } from './hero'
import { artworkGrid } from './artworkGrid'
import { postList } from './postList'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Basis
    blockContent,
    category,
    author,
    post,
    
    // Kunst
    project,
    artwork,
    venue,
    exhibition,
    
    // Modules
    hero,
    artworkGrid,
    postList, // <--- NIEUW
  ],
}
