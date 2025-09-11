import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white dark:text-foreground">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <Link
            className="flex items-center text-white dark:text-foreground hover:text-gray-300 dark:hover:text-gray-400 transition-colors"
            href="/"
          >
            TechBriefAI
          </Link>

          <Link
            href="https://twitter.com/techbriefai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white dark:text-foreground hover:text-gray-300 dark:hover:text-gray-400 transition-colors"
            aria-label="Follow us on X (Twitter)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink
                  className="text-white dark:text-foreground hover:text-gray-300 dark:hover:text-gray-400 transition-colors"
                  key={i}
                  {...link}
                />
              )
            })}
          </nav>
        </div>
      </div>
      <NewsletterSignup />
    </footer>
  )
}
