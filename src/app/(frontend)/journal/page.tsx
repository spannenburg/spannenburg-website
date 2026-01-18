import { client } from "@/sanity/lib/client"
import Link from "next/link"

export const metadata = {
  title: "Journal | Spannenburg.Art",
}

export default async function JournalPage() {
  const posts = await client.fetch(`
    *[_type == "post"]|order(_createdAt desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "imageUrl": mainImage.asset->url,
      _createdAt
    }
  `)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 uppercase tracking-widest text-center">
        Journal
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {posts.map((post: any) => (
          <article key={post._id} className="flex flex-col">
            <Link href={`/journal/${post.slug}`} className="block mb-4 overflow-hidden">
               {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
               )}
            </Link>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-2">
                {new Date(post._createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
              </p>
              <h2 className="text-2xl font-bold mb-3">
                <Link href={`/journal/${post.slug}`} className="hover:text-gray-600">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
