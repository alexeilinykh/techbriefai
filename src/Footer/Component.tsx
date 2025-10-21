import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'

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
          <Link
            href="https://www.linkedin.com/company/techbriefai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white dark:text-foreground hover:text-gray-300 dark:hover:text-gray-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mb-1"
            >
              <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
            </svg>
          </Link>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <Link
            href="/privacy-policy"
            className="text-white dark:text-foreground hover:text-gray-300 dark:hover:text-gray-400 transition-colors"
          >
            Privacy Policy
          </Link>
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
    </footer>
  )
}
