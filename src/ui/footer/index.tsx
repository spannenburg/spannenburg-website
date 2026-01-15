import Link from 'next/link'
import Wrapper from '@/ui/header/Wrapper'

export default function Footer() {
	// We zetten hier hardcoded de titel neer, omdat we 'getSite' niet meer kunnen gebruiken.
	const title = 'Spannenburg Art'
	
	return (
		<section className="bg-black text-white py-12 border-t border-gray-800">
			<Wrapper>
				<div className="flex flex-col md:flex-row justify-between items-center gap-6">
					
					{/* Links: De Titel */}
					<div className="text-center md:text-left">
						<Link href="/" className="text-2xl font-bold tracking-tighter">
							{title}
						</Link>
						<p className="text-gray-400 text-sm mt-2">
							© {new Date().getFullYear()} {title}
						</p>
					</div>

					{/* Rechts: Simpele linkjes */}
					<nav className="flex gap-6 text-sm text-gray-300">
						<Link href="/" className="hover:text-white transition-colors">
							Home
						</Link>
						{/* Je kunt hier later 'Blog' of 'Contact' bij zetten */}
					</nav>
					
				</div>
			</Wrapper>
		</section>
	)
}
