export default function MapModule({ module }: { module: any }) {
  // We gebruiken de invoer uit Sanity (adres of titel) voor de zoekopdracht
  // Als fallback gebruiken we 'Spannenburg Art'
  const query = module.location || "Spannenburg Art"
  
  return (
    <section className="w-full h-[50vh] min-h-[400px] bg-gray-100 relative grayscale hover:grayscale-0 transition-all duration-500">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        title="Map Location"
      ></iframe>
      
      {/* Overlay met titel */}
      <div className="absolute top-10 left-10 bg-white p-6 shadow-lg max-w-xs z-10 hidden md:block">
        <h3 className="text-xl font-bold uppercase tracking-wide mb-2">Location</h3>
        <p className="text-gray-600">{query}</p>
      </div>
    </section>
  )
}
