import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! This page could not be found.</p>
      <Link href="/" className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
        Back to Home
      </Link>
    </div>
  )
}
