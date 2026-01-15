import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // 1. PAGINA'S (Hier moet je straks zijn voor je Home)
      S.documentTypeListItem('page').title('Pages'),
      
      S.divider(),

      // 2. BLOG (Content Marketing)
      S.documentTypeListItem('post').title('Blog Posts'),
      
      S.divider(),

      // 3. ALLE ANDERE ONDERDELEN (Automatisch)
      // Dit zorgt dat je Artworks en Projects hier automatisch verschijnen
      // ZODRA je de schemas hebt aangemaakt, zonder dat de boel crasht.
      ...S.documentTypeListItems().filter(
        (item) => 
          item.getId() !== 'page' && 
          item.getId() !== 'post' && 
          item.getId() !== 'site' && // We verbergen 'site' expliciet
          item.getId() !== 'media.tag'
      ),
    ])
