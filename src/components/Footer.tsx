export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20 py-12">
      <div className="container mx-auto px-4 text-center">
        
        {/* Logo of Naam in Footer */}
        <h3 className="text-lg font-bold uppercase tracking-widest mb-4">
          Spannenburg.Art
        </h3>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          &copy; {currentYear} Arjan Spannenburg. All rights reserved.
        </p>

        {/* Kleine links (optioneel) */}
        <div className="mt-4 space-x-4 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-600">Terms & Conditions</a>
        </div>

      </div>
    </footer>
  )
}
