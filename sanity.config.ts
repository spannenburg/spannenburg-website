structureTool({
      structure: (S: any) =>
        S.list()
          .title('Spannenburg Studio')
          .items([
            // 1. IDENTITY & SETTINGS
            S.listItem()
              .title('Site Settings')
              .icon(TfiSettings)
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Artist Profile')
              .icon(TfiUser)
              .child(S.document().schemaType('author').documentId('author')),

            S.divider(),

            // 2. PORTFOLIO & THEMES
            S.listItem()
              .title('Artworks')
              .icon(TfiPalette)
              .child(S.documentTypeList('artwork')),
            S.listItem()
              .title('Projects / Series')
              .icon(TfiLayers)
              .child(S.documentTypeList('project')),
            S.listItem()
              .title('Thematic Hubs (Categories)')
              .icon(TfiTag) // New: TfiTag icon
              .child(S.documentTypeList('category')),

            S.divider(),

            // 3. PROFESSIONAL HISTORY (EEAT/GEO)
            S.listItem()
              .title('Exhibitions')
              .icon(TfiMapAlt)
              .child(S.documentTypeList('exhibition')),
            S.listItem()
              .title('Venues & Galleries')
              .icon(TfiLocationPin)
              .child(S.documentTypeList('venue')),
            S.listItem()
              .title('Awards & Honors')
              .icon(TfiMedall)
              .child(S.documentTypeList('award')),
            S.listItem()
              .title('Artists (Peers)')
              .icon(TfiUser) // Using TfiUser for Peers
              .child(S.documentTypeList('artist')),

            S.divider(),

            // 4. EDITORIAL & TECHNICAL
            S.listItem()
              .title('Journal / News')
              .icon(TfiWrite)
              .child(S.documentTypeList('post')),
            S.listItem()
              .title('Pages')
              .icon(TfiFiles)
              .child(S.documentTypeList('page')),
            
            S.listItem()
              .title('Pricing & Sizes')
              .icon(TfiMoney)
              .child(
                S.list()
                  .title('Commerce Data')
                  .items([
                    S.listItem()
                      .title('Price Tiers')
                      .icon(TfiMoney)
                      .child(S.documentTypeList('priceTier')),
                    S.listItem()
                      .title('Size Templates')
                      .icon(TfiRulerPencil)
                      .child(S.documentTypeList('sizeTemplate')),
                  ])
              ),

            // 5. CATCH-ALL (Filters out the above)
            ...S.documentTypeListItems().filter(
              (listItem: any) => 
                !['siteSettings', 'author', 'priceTier', 'sizeTemplate', 'venue', 'award', 'category', 'project', 'artwork', 'exhibition', 'post', 'page', 'artist', 'artworkEdition', 'metadata', 'blockContent'].includes(listItem.getId() || '')
            ),
          ]),
    }),
