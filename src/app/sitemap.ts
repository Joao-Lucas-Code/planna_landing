import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://novaflow.me', lastModified: new Date() },
    { url: 'https://novaflow.me/obrigado', lastModified: new Date() },
  ]
}
