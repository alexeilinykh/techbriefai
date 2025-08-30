'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

const ARTICLE_LINK_SELECTOR =
  'a[data-article-link], a[href^="/blog"], a[href^="/article"], a[href^="/posts/"]'

export default function HomeClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const a = target.closest('a') as HTMLAnchorElement | null
      if (!a) return

      // Track only “article” links by selector heuristic
      const isArticleLink = a.matches(ARTICLE_LINK_SELECTOR)
      if (!isArticleLink) return

      const href = a.href
      const linkText = a.textContent?.trim().slice(0, 200) || ''
      const outbound = a.host !== location.host

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-975481101/KrEeCKKL_pAbEI3SktED',
        })
      }
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
