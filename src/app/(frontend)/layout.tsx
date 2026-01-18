import '@/styles/app.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// --- NIEUW: JSON-LD DATA (SEO & AI) ---
// Dit vertelt Google en AI bots wie je bent.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArtGallery', // Definieert je organisatie type
  name: 'Spannenburg.Art',
  url: 'https://www.spannenburg.art',
  description: 'Contemporary Art & Photography',
  email: 'Arjan@spannenburg.art',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NL'
  },
  // Vul hier later je echte social links in
  sameAs: [
    'https://www.instagram.com/arjanspannenburg',
    // 'https://www.facebook.com/jouw-pagina'
  ]
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="bg-canvas text-ink min-h-screen flex flex-col">
				
				{/* 1. SEO: Injecteer de JSON-LD data voor Google/AI */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				{/* 2. De Header */}
				<Header />

				{/* 3. De Inhoud van de pagina */}
				<main className="flex-1">
					{children}
				</main>

				{/* 4. De Footer */}
				<Footer />

				{/* 5. Analytics & SpeedInsights */}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
