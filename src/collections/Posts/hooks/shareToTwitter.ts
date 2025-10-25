import { Post } from '@/payload-types'
import type { CollectionAfterChangeHook } from 'payload'
import { ApiResponseError, TwitterApi } from 'twitter-api-v2'

const canonicalUrl = (slug?: string) =>
  slug ? `https://www.techbriefai.com/posts/${slug}` : undefined

export const shareToTwitter: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if ((operation !== 'create' && operation !== 'update') || doc._status !== 'published') return
  if (previousDoc?._status === 'published') return

  const url = canonicalUrl(doc.slug ?? undefined)
  if (!url) return

  const twitter = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_SECRET!,
  }).readWrite

  const headline = doc.title?.trim() || 'New post'

  try {
    const tweet = await twitter.v2.tweet(headline)
    await twitter.v2.reply(url, tweet.data.id)
  } catch (error) {
    if (error instanceof ApiResponseError && error.rateLimitError) {
      req.payload.logger.warn({
        message: 'Twitter rate limit reached while sharing post',
        slug: doc.slug,
        rateLimit: error.rateLimit,
      })

      return
    }

    req.payload.logger.error({
      message: 'Failed to share post to Twitter',
      slug: doc.slug,
      error,
    })

    throw error
  }
}
