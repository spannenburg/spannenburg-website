import { type SchemaTypeDefinition } from 'sanity'

import { blockContent } from './blockContent'
import { category } from './category'
import { author } from './author'
import { project } from './project'
import { artwork } from './artwork'
import { post } from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    category,
    author,
    project,
    artwork,
    post,
  ],
}
