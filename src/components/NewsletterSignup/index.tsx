'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

export type NewsletterSignupProps = {
  className?: string
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = (props) => {
  const { className } = props
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if script is already loaded to avoid duplicates
    const existingScript = document.querySelector('script[data-uid="f1b6d72a45"]')
    if (existingScript) return

    // Create and append the script element
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-uid', 'f1b6d72a45')
    script.src = 'https://techbriefai.kit.com/f1b6d72a45/index.js'

    if (containerRef.current) {
      containerRef.current.appendChild(script)
    }

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (containerRef.current && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <section className={cn('rounded-lg overflow-hidden', className)}>
      <div className="max-w-[700px] mx-auto" ref={containerRef}>
        {/* Script will be injected here */}
      </div>
    </section>
  )
}
