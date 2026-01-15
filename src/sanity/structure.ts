import { structureTool } from 'sanity/structure'
import { singleton } from './lib/builders'
import { VscFiles, VscServerProcess } from 'react-icons/vsc'

export const structure = structureTool({
	structure: (S: any) =>
		S.list()
			.title('Content')
			.items([
				// 1. SITE SETTINGS
				singleton(S, 'site', 'Site settings').icon(VscServerProcess),
				S.divider(),

				// 2. PAGINA'S
				S.documentTypeListItem('page').title('All pages').icon(VscFiles),
				S.divider(),

				// 3. JOUW KUNST (Core Business)
				S.documentTypeListItem('project').title('Artwork Series'),
				S.documentTypeListItem('artwork').title('Artworks (Individual)'),
				S.divider(),

				// 4. TRACK RECORD (Nieuw toegevoegd!)
				// Zonder deze regels zijn je exposities onzichtbaar in het menu
				S.documentTypeListItem('exhibition').title('Exhibitions'),
				S.documentTypeListItem('venue').title('Venues / Locations'),
				S.divider(),

				// 5. CONTENT MARKETING (Blog & Authors)
				S.documentTypeListItem('post').title('Writing / Blog'),
				S.documentTypeListItem('category').title('Categories'),
				S.documentTypeListItem('author').title('Authors'),
				S.divider(),

				// 6. OVERIGE (Technisch)
				S.documentTypeListItem('navigation'),
				S.documentTypeListItem('redirect').title('Redirects'),
			]),
})
