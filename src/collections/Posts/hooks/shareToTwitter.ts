import { Post } from '@/payload-types'
import type { CollectionAfterChangeHook } from 'payload'
import { TwitterApi } from 'twitter-api-v2'

const canonicalUrl = (slug?: string) =>
  slug ? `https://www.techbriefai.com/posts/${slug}` : undefined

export const shareToTwitter: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  operation,
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
  const tweet = await twitter.v2.tweet(headline)
  await twitter.v2.reply(url, tweet.data.id)
}
