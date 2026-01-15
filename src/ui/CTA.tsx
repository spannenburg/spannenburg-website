import Link from 'next/link'
import { cn } from '@/lib/utils'
import resolveUrl from '@/lib/resolveUrl'

export default function CTA({
	link,
	style,
	className,
	children,
	...props
}: any) {
	// Als er geen link is, tonen we niets
	if (!link?.type) return null

	// Bepaal de URL
	// 1. Is het extern? Dan gewoon de URL pakken.
	// 2. Is het intern? Dan onze 'resolveUrl' gebruiken (ZONDER params!)
	const isExternal = link.type === 'external'
	const href = isExternal
		? link.external
		: resolveUrl(link.internal, { base: false })

	if (!href) return null

	// Bepaal de stijl van de knop (simpel en netjes)
	const isOutline = style === 'outline'
	
	return (
		<Link
			href={href}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noopener noreferrer' : undefined}
			className={cn(
				'inline-flex items-center justify-center rounded-full px-6 py-2 transition-all duration-200',
				// Primaire knop (zwart) vs Outline knop (randje)
				isOutline 
					? 'border border-current hover:bg-black/5' 
					: 'bg-black text-white hover:bg-gray-800',
				className
			)}
			{...props}
		>
			{link.label || children || 'Read more'}
		</Link>
	)
}
