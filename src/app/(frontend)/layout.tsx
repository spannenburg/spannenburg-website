import '@/styles/app.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'
import Header from '@/ui/header'
import Footer from '@/ui/footer' // <--- Zorg dat deze import klopt
// We verwijderen 'DraftModeToast' even tijdelijk als die errors geeft, 
// maar meestal kan hij blijven staan. Voor nu houden we het simpel:

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="nl">
			<body className="bg-canvas text-ink min-h-screen flex flex-col">
				{/* 1. De Header */}
				<Header />

				{/* 2. De Inhoud van de pagina */}
				<main className="flex-1">
					{children}
				</main>

				{/* 3. De Footer */}
				<Footer />

				{/* 4. Hulpstukken van Vercel */}
				<Toaster />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
