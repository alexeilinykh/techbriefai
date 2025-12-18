import type { CollectionAfterChangeHook } from 'payload'
import type { Post } from '../../../payload-types'

export const purgeCloudflareCache: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  // Only purge when post is published (not draft)
  if (doc._status !== 'published') {
    return doc
  }

  const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID
  const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techbriefai.com'

  if (!CLOUDFLARE_ZONE_ID || !CLOUDFLARE_API_TOKEN) {
    payload.logger.warn('Cloudflare credentials not configured, skipping cache purge')
    return doc
  }

  const postUrl = `${SITE_URL}/posts/${doc.slug}`

  // Also purge homepage and sitemap since they list posts
  const urlsToPurge = [postUrl, `${postUrl}/`, `${SITE_URL}/`, `${SITE_URL}/sitemap.xml`]

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: urlsToPurge,
        }),
      },
    )

    const result = await response.json()

    if (result.success) {
      payload.logger.info(`Cloudflare cache purged for: ${postUrl}`)
    } else {
      payload.logger.error(`Cloudflare cache purge failed: ${JSON.stringify(result.errors)}`)
    }
  } catch (error) {
    payload.logger.error(`Cloudflare cache purge error: ${error}`)
  }

  return doc
}
