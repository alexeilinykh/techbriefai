import type { Post } from '@/payload-types'

export const articleSchema = (props: Post) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    proficiencyLevel: 'Intermediate',
    headline: props.title,
    datePublished: new Date(props.createdAt),
    dateModified: new Date(props.updatedAt),
    author: {
      '@type': 'Organization',
      name: 'TechBriefAI',
      url: 'https://www.techbriefai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechBriefAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.techbriefai.com/techbriefai-logo.png',
        width: '243',
        height: '243',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.techbriefai.com/posts/${props.slug}`,
    },
    url: `https://www.techbriefai.com/posts/${props.slug}`,
  }
}
