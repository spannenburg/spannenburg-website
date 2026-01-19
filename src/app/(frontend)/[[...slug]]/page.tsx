import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { client } from '@/sanity/lib/client'

import Modules from '@/components/Modules'



const PAGE_QUERY = `

  *[_type == "page" && (slug.current == $slug || ($slug == '/' && slug.current == 'home'))][0]{

    title,

    seoTitle,

    metaDescription,

    "ogImage": socialImage.asset->url,

    modules[]{

      ...,

      // Voor Hero en Image modules: haal de werkelijke URL op

      bgImage{ ..., asset->{url} },

      image{ ..., asset->{url} },

      // Voor de Artwork Grid: haal de juiste velden uit het artwork schema

      artworks[]->{

        _id,

        title,

        "slug": slug.current,

        "imageUrl": mainImage.asset->url,

        "artistName": artist->name,

        availability,

        editions[]{ price }

      }

    }

  }

`



export async function generateStaticParams() {

  const slugs = await client.fetch<string[]>(`*[_type == "page" && defined(slug.current)].slug.current`)

  return slugs.map((slug) => ({ slug: slug.split('/') }))

}



export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {

  const { slug } = await params

  const slugString = slug ? slug.join('/') : '/'

  const page = await client.fetch(PAGE_QUERY, { slug: slugString })



  if (!page) notFound()



  return <Modules modules={page?.modules} />

}



export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {

  const { slug } = await params

  const slugString = slug ? slug.join('/') : '/'

  const page = await client.fetch(`*[_type == "page" && (slug.current == $slug || ($slug == '/' && slug.current == 'home'))][0]{ seoTitle, title, metaDescription }`, { slug: slugString })



  return {

    title: page?.seoTitle || page?.title || 'Spannenburg.Art',

    description: page?.metaDescription,

  }

}

