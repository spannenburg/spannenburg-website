import type {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // 1. GLOBAL SETTINGS
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),

      // 2. ART PORTFOLIO
      S.listItem()
        .title('Art Portfolio')
        .child(
          S.list()
            .title('Portfolio Management')
            .items([
              S.documentTypeListItem('artwork').title('All Artworks'),
              S.documentTypeListItem('project').title('Projects & Series'),
              S.documentTypeListItem('category').title('Thematic Hubs (Categories)'),
            ])
        ),

      // 3. CURATORIAL & HISTORY (EEAT/GEO)
      S.listItem()
        .title('Exhibitions & Awards')
        .child(
          S.list()
            .title('Professional History')
            .items([
              S.documentTypeListItem('exhibition').title('Exhibitions'),
              S.documentTypeListItem('award').title('Awards & Nominations'),
              S.documentTypeListItem('venue').title('Venues & Galleries'),
              S.documentTypeListItem('artist').title('Artists (Peers)'),
            ])
        ),

      // 4. EDITORIAL
      S.listItem()
        .title('Editorial')
        .child(
          S.list()
            .title('Writing')
            .items([
              S.documentTypeListItem('post').title('Journal / Research Posts'),
              S.documentTypeListItem('page').title('Static Pages'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),
      S.divider(),

      // 5. COMMERCE & TECHNICAL (Keep these hidden/separate)
      S.listItem()
        .title('Technical / Pricing')
        .child(
          S.list()
            .title('Behind the Scenes')
            .items([
              S.documentTypeListItem('priceTier').title('Price Tiers'),
              S.documentTypeListItem('sizeTemplate').title('Size Templates'),
              S.documentTypeListItem('artworkEdition').title('Raw Editions'),
              S.documentTypeListItem('metadata').title('Site Metadata'),
            ])
        ),
      
      // Filter out types that are already handled above
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteSettings',
            'artwork',
            'project',
            'category',
            'exhibition',
            'award',
            'venue',
            'artist',
            'post',
            'page',
            'author',
            'priceTier',
            'sizeTemplate',
            'artworkEdition',
            'metadata',
            'blockContent',
          ].includes(listItem.getId() as string)
      ),
    ])
