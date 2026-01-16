import type {StructureBuilder} from 'sanity/structure'
import {
  TfiCheckBox,
  TfiAlert,
  TfiImage,
  TfiWrite,
  TfiTarget,
  TfiPalette,
  TfiLayers,
  TfiMapAlt,
  TfiMoney,
  TfiRulerPencil,
  TfiPaintRoller,
  TfiCup,
  TfiUser,
} from 'react-icons/tfi'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content Studio')
    .items([
      // --- 1. DE TO-DO LIST (Bovenaan!) ---
      S.listItem()
        .title('🚨 To-Do / Incomplete')
        .icon(TfiAlert)
        .child(
          S.list()
            .title('Action Items')
            .items([
              // Filter 1: Kunstwerken zonder foto
              S.listItem()
                .title('Artworks missing Image')
                .icon(TfiImage)
                .child(
                  S.documentList()
                    .title('Artworks missing Image')
                    .filter('_type == "artwork" && !defined(mainImage)')
                ),
              // Filter 2: Kunstwerken zonder verhaal (Description)
              S.listItem()
                .title('Artworks missing Story')
                .icon(TfiWrite)
                .child(
                  S.documentList()
                    .title('Artworks missing Story')
                    .filter('_type == "artwork" && !defined(description)')
                ),
              // Filter 3: Kunstwerken zonder SEO Keywords
              S.listItem()
                .title('Artworks missing SEO')
                .icon(TfiTarget)
                .child(
                  S.documentList()
                    .title('Artworks missing SEO')
                    .filter('_type == "artwork" && !defined(keywords)')
                ),
               // Filter 4: Projecten zonder gekoppelde kunstwerken
              S.listItem()
                .title('Empty Projects')
                .icon(TfiLayers)
                .child(
                  S.documentList()
                    .title('Empty Projects')
                    .filter('_type == "project" && !defined(artworks)')
                ),
            ])
        ),
        
      S.divider(), // Een mooi lijntje

      // --- 2. DE BELANGRIJKSTE ITEMS ---
      S.documentTypeListItem('artwork').title('Artworks').icon(TfiPalette),
      S.documentTypeListItem('project').title('Projects / Series').icon(TfiLayers),
      S.documentTypeListItem('exhibition').title('Exhibitions').icon(TfiMapAlt),
      
      S.divider(),
      
      // --- 3. TECHNICAL & SETTINGS ---
      S.listItem()
        .title('Technical / Pricing')
        .icon(TfiMoney)
        .child(
          S.list()
            .title('Technical Settings')
            .items([
              S.documentTypeListItem('priceTier').title('Price Tiers').icon(TfiMoney),
              S.documentTypeListItem('sizeTemplate').title('Size Templates').icon(TfiRulerPencil),
              S.documentTypeListItem('material').title('Materials').icon(TfiPaintRoller),
              S.documentTypeListItem('category').title('Categories').icon(TfiCheckBox),
              S.documentTypeListItem('award').title('Awards').icon(TfiCup),
              S.documentTypeListItem('author').title('Authors').icon(TfiUser),
            ])
        ),
        
      // --- 4. OVERIGE (Fallback) ---
      // Toont alles wat we hierboven vergeten zijn, behalve de dingen die we al hebben gehad
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'artwork', 
            'project', 
            'exhibition', 
            'priceTier', 
            'sizeTemplate', 
            'material',
            'category',
            'award',
            'author',
            'media.tag', 
          ].includes(listItem.getId() as string)
      ),
    ])
