import '@/styles/app.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// --- HIER ZIT DE WIJZIGING ---
// We verwijzen nu naar de map 'components' die we net gemaakt hebben
// De '@' staat voor de map 'src'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			{/* We behouden 'bg-canvas' en 'text-ink' zodat het SanityPress thema blijft werken */}
			<body className="bg-canvas text-ink min-h-screen flex flex-col">
				
				{/* 1. De Header */}
				<Header />

				{/* 2. De Inhoud van de pagina */}
				<main className="flex-1">
					{children}
				</main>

				{/* 3. De Footer */}
				<Footer />

				{/* 4. Analytics & SpeedInsights (standaard van template) */}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
