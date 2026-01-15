import type { StructureResolver } from 'sanity/structure'
import { singleton } from './lib/builders'
import { VscFiles, VscServerProcess } from 'react-icons/vsc'

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			// 1. SITE SETTINGS
			singleton(S, 'site', 'Site settings').icon(VscServerProcess),
			S.divider(),

			// 2. PAGINA'S
			S.documentTypeListItem('page').title('All pages').icon(VscFiles),
			S.divider(),

			// 3. JOUW KUNST
			S.documentTypeListItem('project').title('Artwork Series'),
			S.documentTypeListItem('artwork').title('Artworks (Individual)'),
			S.divider(),

			// 4. TRACK RECORD
			S.documentTypeListItem('exhibition').title('Exhibitions'),
			S.documentTypeListItem('venue').title('Venues / Locations'),
			S.divider(),

			// 5. CONTENT MARKETING
			S.documentTypeListItem('post').title('Writing / Blog'),
			S.documentTypeListItem('category').title('Categories'),
			S.documentTypeListItem('author').title('Authors'),
			S.divider(),

			// 6. OVERIGE
			S.documentTypeListItem('navigation'),
			S.documentTypeListItem('redirect').title('Redirects'),
		])
