import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // /obrigado fica de fora de proposito: a pagina e noindex e listar no
    // sitemap contradiz isso na frente dos buscadores.
    { url: 'https://novaflow.me', lastModified: new Date() },
  ]
}
