import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Acyrx Social Handler',
    short_name: 'Acyrx Socials',
    description: 'An application built by Acyrx for managing platfrom credidtentials',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
    {
      src: "/web-app-manifest-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/web-app-manifest-512x512.png",
      sizes: "512x512",
      type: "image/png",
    }
  ],
}
}