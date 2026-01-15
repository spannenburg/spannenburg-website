import '@/styles/app.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
// De regel met 'sonner' is hier weggehaald
import Header from '@/ui/header'
import Footer from '@/ui/footer'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="bg-canvas text-ink min-h-screen flex flex-col">
				{/* 1. De Header */}
				<Header />

				{/* 2. De Inhoud van de pagina */}
				<main className="flex-1">
					{children}
				</main>

				{/* 3. De Footer */}
				<Footer />

				{/* 4. Analytics (mag blijven) */}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
