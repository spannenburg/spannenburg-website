import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-6">
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* LOGO (Links) */}
        <Link href="/" className="text-2xl font-bold uppercase tracking-widest text-black no-underline hover:text-gray-700">
          Spannenburg.Art
        </Link>

        {/* NAVIGATIE MENU (Rechts) */}
        <nav>
          <ul className="flex space-x-8">
            {/* 1. ARTWORKS */}
            <li>
              <Link href="/artworks" className="text-sm font-medium uppercase tracking-wide text-gray-600 hover:text-black">
                Artworks
              </Link>
            </li>

            {/* 2. FAQ */}
            <li>
              <Link href="/faq" className="text-sm font-medium uppercase tracking-wide text-gray-600 hover:text-black">
                FAQ
              </Link>
            </li>

            {/* 3. JOURNAL (Strategisch de beste keuze) */}
            <li>
              <Link href="/journal" className="text-sm font-medium uppercase tracking-wide text-gray-600 hover:text-black">
                Journal
              </Link>
            </li>

            {/* 4. ABOUT */}
            <li>
              <Link href="/about" className="text-sm font-medium uppercase tracking-wide text-gray-600 hover:text-black">
                About
              </Link>
            </li>

            {/* 5. CONTACT */}
            <li>
              <Link href="/contact" className="text-sm font-medium uppercase tracking-wide text-gray-600 hover:text-black">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  )
}
