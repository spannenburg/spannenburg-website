import { type SchemaTypeDefinition } from 'sanity'

// 1. Basis blokken
import { blockContent } from './blockContent'
import { category } from './category'
import { author } from './author'
import { post } from './post'

// 2. Jouw Kunst & Track Record
import { project } from './project'
import { artwork } from './artwork'
import { venue } from './venue'
import { exhibition } from './exhibition'

// 3. De Modules voor de Homepage (Hier zat de error)
import { hero } from './hero'
import { artworkGrid } from './artworkGrid'
import { postList } from './postList'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
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
