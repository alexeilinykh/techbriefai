import type { Post } from '@/payload-types' // adjust path if needed

// Update Options to use Post
type Options = {
  siteUrl?: string
  publicationName?: string
  language?: string
  toLoc?: (post: Post) => string
  toTitle?: (post: Post) => string
  toPublicationDate?: (post: Post) => Date
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function generateNewsSitemap(posts: Post[], opts: Options = {}): string {
  const siteUrl =
    opts.siteUrl ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.SITE_URL ||
    process.env.APP_URL ||
    ''

  const publicationName =
    opts.publicationName ||
    process.env.NEWS_PUBLICATION_NAME ||
    process.env.NEXT_PUBLIC_SITE_NAME ||
    'TechBriefAI'

  const language = opts.language || process.env.NEWS_PUBLICATION_LANGUAGE || 'en'

  const toLoc =
    opts.toLoc ||
    ((p: Post) => {
      const slug = (p as any).slug || ''
      return siteUrl ? `${siteUrl}/posts/${slug}` : `/posts/${slug}`
    })

  const toTitle = opts.toTitle || ((p: Post) => (p as any).title || 'Untitled')

  const toPublicationDate =
    opts.toPublicationDate ||
    ((p: Post) => new Date(((p as any).publishedAt as string | Date | undefined) || new Date()))

  const items = (posts || []).slice(0, 1000) // Google News cap

  const urlItems = items.map((p) => {
    const loc = toLoc(p)
    const title = toTitle(p)
    const pubDate = toPublicationDate(p)

    return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(publicationName)}</news:name>
        <news:language>${escapeXml(language)}</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${escapeXml(title)}</news:title>
    </news:news>
  </url>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
>
${urlItems.join('\n')}
</urlset>`

  return xml
}
