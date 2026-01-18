export default function ImageModule({ module }: { module: any }) {
  if (!module.image?.asset) return null

  return (
    <section className="w-full py-12">
      <div className={`container mx-auto px-4 ${module.layout === 'full' ? 'max-w-none px-0' : ''}`}>
        <img 
          src={module.image.asset.url} 
          alt={module.alt || 'Artwork impression'}
          className="w-full h-auto object-cover max-h-[80vh]"
        />
        {module.caption && (
          <p className="text-center text-sm text-gray-500 mt-2 italic">
            {module.caption}
          </p>
        )}
      </div>
    </section>
  )
}
