import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'TechBriefAI brings you AI summaries of the latest announcements from the tech world.',
  images: [
    {
      url: `${getServerSideURL()}/techbriefai-logo.png`,
    },
  ],
  siteName: 'TechBriefAI',
  title: 'TechBriefAI',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
