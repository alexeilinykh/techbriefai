import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { generateNewsSitemap } from '@/lib/sitemap/news'

export const revalidate = 300 // 5 minutes (optional, ISR-style hint if used)

// Google News: only include articles published in last 2 days, limit 1000.
export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const now = new Date()
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000)

  const articles = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1000,
    sort: '-publishedAt',
    overrideAccess: false,
    where: {
      publishedAt: {
        greater_than_equal: twoDaysAgo.toISOString(),
        less_than_equal: now.toISOString(),
      },
      // Add your own published flag if you have one, e.g.:
      // _status: { equals: 'published' },
    },
  })

  const sitemap = generateNewsSitemap(articles.docs)

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
