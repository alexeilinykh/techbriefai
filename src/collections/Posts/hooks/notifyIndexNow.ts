import type { CollectionAfterChangeHook } from 'payload'
import type { Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const INDEX_NOW_ENDPOINT = 'https://www.bing.com/indexnow'
const INDEX_NOW_KEY = process.env.INDEX_NOW_KEY as string // keep secret in env or read from txt file in public folder (see Step 1)

export const notifyIndexNow: CollectionAfterChangeHook<Post> = ({ doc, req: { payload } }) => {
  // Only notify for published documents
  if (doc._status !== 'published') return doc

  // build the full URL based on your project setup
  const path = doc.slug === 'home' ? '/' : `/posts/${doc.slug}`
  const fullUrl = `${getServerSideURL()}${path}`
  const indexNowUrl = `${INDEX_NOW_ENDPOINT}?url=${encodeURIComponent(fullUrl)}&key=${INDEX_NOW_KEY}`

  fetch(indexNowUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorText) => {
          console.log('Failed to notify IndexNow:', errorText)

          payload.logger.error(
            `Failed to notify IndexNow at ${INDEX_NOW_ENDPOINT}: ${response.status} ${errorText}`,
          )
        })
      }
      console.log('Successfully notified IndexNow for URL:', fullUrl)
      payload.logger.info(
        `Successfully notified IndexNow at ${INDEX_NOW_ENDPOINT} for URL: ${fullUrl}`,
      )
    })
    .catch((error) => {
      console.log('Error notifying IndexNow:', error)
      payload.logger.error(
        `Error notifying IndexNow at ${INDEX_NOW_ENDPOINT}: ${error instanceof Error ? error.message : String(error)}`,
      )
    })

  return doc
}
