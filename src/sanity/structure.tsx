import { structureTool } from 'sanity/structure'
import { singleton } from './lib/builders'
import { VscFiles, VscServerProcess } from 'react-icons/vsc'

export const structure = structureTool({
	structure: (S: any) =>
		S.list()
			.title('Content')
			.items([
				// 1. Site Settings (De basis)
				singleton(S, 'site', 'Site settings').icon(VscServerProcess),
				S.divider(),

				// 2. Pagina's (Home, About, Contact)
				S.documentTypeListItem('page').title('All pages').icon(VscFiles),
				S.divider(),

				// 3. JOUW KUNST (De Core Business)
				// Sanity pakt automatisch de icoontjes uit de schema files
				S.documentTypeListItem('project').title('Artwork Series'),
				S.documentTypeListItem('artwork').title('Artworks (Individual)'),
				S.divider(),

				// 4. Content Marketing (Blog & Authors)
				S.documentTypeListItem('post').title('Writing / Blog'),
				S.documentTypeListItem('category').title('Categories'),
				S.documentTypeListItem('author').title('Authors'),
				S.divider(),

				// 5. Overige (indien aanwezig)
				// Als je navigation.ts niet hebt, verdwijnt deze vanzelf of geeft een warning, 
				// maar we laten hem staan voor het geval dat.
				S.documentTypeListItem('navigation'),
				S.documentTypeListItem('redirect').title('Redirects'),
			]),
})
