import { Post } from '@/payload-types'
import type { CollectionAfterChangeHook } from 'payload'

const canonicalUrl = (slug?: string) =>
  slug ? `https://www.techbriefai.com/posts/${slug}` : undefined

export const postToLinkedIn: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if ((operation !== 'create' && operation !== 'update') || doc._status !== 'published') return
  if (previousDoc?._status === 'published') return

  const webhookUrl = process.env.ZAPIER_WEBHOOK
  if (!webhookUrl) {
    req.payload.logger.warn({
      message: 'ZAPIER_WEBHOOK not configured, skipping LinkedIn post',
      slug: doc.slug,
    })
    return
  }

  const url = canonicalUrl(doc.slug ?? undefined)
  if (!url) return

  const title = doc.title?.trim() || 'New post'

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        url,
      }),
    })

    if (!response.ok) {
      throw new Error(`Zapier webhook responded with status ${response.status}`)
    }

    req.payload.logger.info({
      message: 'Successfully posted to LinkedIn via Zapier',
      slug: doc.slug,
    })
  } catch (error) {
    req.payload.logger.error({
      message: 'Failed to post to LinkedIn via Zapier',
      slug: doc.slug,
      error,
    })

    throw error
  }
}
