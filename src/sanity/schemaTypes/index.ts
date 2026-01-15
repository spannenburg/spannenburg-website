import { type SchemaTypeDefinition } from 'sanity'

// 1. Basis Blokken
import { blockContent } from './blockContent'
import { category } from './category'
import { author } from './author'
import { post } from './post'

// 2. Art Portfolio Core
import { project } from './project'
import { artwork } from './artwork'
import { venue } from './venue'
import { exhibition } from './exhibition'

// 3. Homepage Modules
import { hero } from './hero'
import { artworkGrid } from './artworkGrid'
import { postList } from './postList'

// 4. Page
import { page } from './page'

// Dit exporteert jouw lijst met types naar Sanity
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Basis
    blockContent,
    category,
    author,
    post,

    // Art
    project,
    artwork,
    venue,
    exhibition,

    // Modules
    hero,
    artworkGrid,
    postList,

    // Page
    page,
  ],
}
