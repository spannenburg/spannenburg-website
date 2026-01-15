import { type SchemaTypeDefinition } from 'sanity'

import { blockContent } from './blockContent'
import { category } from './category'
import { post } from './post'
import { author } from './author'
import { project } from './project' // Dit is je "Series" type
import { artwork } from './artwork' // <-- Deze moet erbij staan!

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, category, post, author, project, artwork],
}
