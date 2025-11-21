import type { Post } from '@/payload-types'

export const articleSchema = (props: Post) => {
  const lastChild = props?.content?.root?.children?.at(-1)?.children

  const isBasedOnUrl =
    Array.isArray(lastChild) &&
    lastChild[0]?.type === 'link' &&
    typeof lastChild[0]?.fields?.url === 'string'
      ? lastChild[0].fields.url
      : undefined

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
    ...(isBasedOnUrl ? { isBasedOn: isBasedOnUrl } : {}),
  }
}
