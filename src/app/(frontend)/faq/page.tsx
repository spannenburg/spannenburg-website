export const metadata = {
  title: "FAQ | Spannenburg.Art",
}

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest text-center">
        Frequently Asked Questions
      </h1>
      
      <div className="space-y-6">
        {/* Voorbeeld vraag 1 */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-medium mb-2">Do you ship internationally?</h3>
          <p className="text-gray-600">Yes, we ship artworks worldwide. Shipping costs are calculated based on the destination and the size of the artwork.</p>
        </div>

        {/* Voorbeeld vraag 2 */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-medium mb-2">Are the artworks framed?</h3>
          <p className="text-gray-600">This depends on the specific piece. Please check the details on the artwork page or contact us for custom framing options.</p>
        </div>
      </div>
    </div>
  )
}
