import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // We staan afbeeldingen van Sanity toe
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
