import Link from 'next/link'
import Wrapper from './Wrapper'
import { cn } from '@/lib/utils'
// We commenten de oude navigation even uit, want die veroorzaakt waarschijnlijk de crash
// import Navigation from './Navigation' 
import css from './Header.module.css'

export default function Header() {
	// We halen getSite() weg, want die data bestaat niet meer.
	// We zetten de titel hier hardcoded neer:
	const title = 'Spannenburg Art'

	return (
		<Wrapper className="frosted-glass border-ink/10 bg-canvas sticky top-0 z-10 border-b">
			<div
				className={cn(
					css.header,
					'mx-auto flex max-w-screen-xl items-center justify-between p-4',
				)}
			>
				{/* Logo / Titel */}
				<div className="flex-shrink-0">
					<Link className="h4 md:h3 block font-bold text-xl" href="/">
						{title}
					</Link>
				</div>

				{/* Tijdelijke Simpele Navigatie (Hardcoded) */}
				<nav className="flex gap-6 text-sm font-medium">
					{/* Je kunt hier later weer een dynamisch menu van maken */}
					<Link href="/" className="hover:underline">Home</Link>
					{/* <Link href="/blog" className="hover:underline">Blog</Link> */}
				</nav>

				{/* De oude Navigation component (die de crash veroorzaakt) laden we nu NIET */}
				{/* <Navigation /> */}
			</div>
		</Wrapper>
	)
}
