import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { extractFirstParagraph } from './extractFirstParagraph'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/techbriefai-logo.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | TechBriefAI'
    : doc?.title + ' | TechBriefAI'

  let description = doc?.meta?.description || ''
  if (
    !description &&
    doc &&
    typeof doc === 'object' &&
    'content' in doc &&
    typeof (doc as any).content === 'string'
  ) {
    const summary = extractFirstParagraph((doc as any).content)
    const truncated = summary.length > 120 ? summary.slice(0, 117) + '...' : summary
    description = summary ? `${truncated} Read more!` : 'Latest tech news and updates. Read more!'
  }

  return {
    description,
    openGraph: mergeOpenGraph({
      description: description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
