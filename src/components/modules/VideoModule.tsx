export default function VideoModule({ module }: { module: any }) {
  if (!module.url) return null

  // Simpele functie om YouTube ID te pakken (werkt voor youtube.com en youtu.be)
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const videoId = getYoutubeId(module.url)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-4xl px-4">
        {module.title && (
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 text-center">
            {module.title}
          </h2>
        )}
        
        <div className="relative pt-[56.25%] bg-black w-full overflow-hidden rounded-sm shadow-xl">
          {videoId ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={module.title || "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
              <p>Invalid Video URL</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
