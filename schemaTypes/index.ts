import { type SchemaTypeDefinition } from 'sanity'

// 1. Basis
import { blockContent } from './blockContent'
import { category } from './category'
import { author } from './author'
import { post } from './post'

// 2. Core Business
import { project } from './project'
import { artwork } from './artwork'
import { venue } from './venue'
import { exhibition } from './exhibition'

// 3. Modules
import { hero } from './hero'
import { artworkGrid } from './artworkGrid'
import { postList } from './postList'

// 4. Page
// HIER ZAT DE FOUT: Hij zocht in '../documents/page', maar hij staat nu hier!
import { page } from './page'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Basis
    blockContent,
    category,
    author,
    post,

    // Core
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
