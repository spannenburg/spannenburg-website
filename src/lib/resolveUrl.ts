import { stegaClean } from '@sanity/client/stega'

export default function resolveUrl(
  document: any,
  options?: { base?: boolean }
): string {
  const slug = stegaClean(document?.metadata?.slug?.current || document?.slug?.current)
  const type = document?._type

  // Basis URL (nodig voor de Studio preview link)
  const baseUrl = options?.base 
    ? process.env.NEXT_PUBLIC_URL || 'http://localhost:3000' 
    : ''

  // 1. Homepage
  if (slug === 'index' || !slug) {
    return `${baseUrl}/`
  }

  // 2. Blog Posts
  if (type === 'post') {
    return `${baseUrl}/blog/${slug}`
  }

  // 3. Standaard Pagina's (projecten, over ons, etc.)
  return `${baseUrl}/${slug}`
}
