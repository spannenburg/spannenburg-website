import { type SchemaTypeDefinition } from 'sanity'

// 1. Basis blokken (stonden er al een uur)
import { blockContent } from './blockContent'
import { category } from './category'
import { author } from './author'
import { post } from './post'

// 2. Jouw Core Business (Kunst & Track Record)
import { project } from './project'
import { artwork } from './artwork'
import { venue } from './venue'
import { exhibition } from './exhibition'

// 3. De Nieuwe Modules (Die de error veroorzaakten)
import { hero } from './hero'
import { artworkGrid } from './artworkGrid'
import { postList } from './postList'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // We voegen ze allemaal toe aan de lijst:
    blockContent,
    category,
    author,
    post,
    project,
    artwork,
    venue,
    exhibition,
    hero,
    artworkGrid,
    postList,
  ],
}
