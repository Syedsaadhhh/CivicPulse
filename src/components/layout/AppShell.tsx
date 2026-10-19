import type { ReactNode } from 'react'

import { Navbar } from '@/components/layout/Navbar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { cn } from '@/lib/cn'

const SKIP_LINK = cn(
  'sr-only rounded-full font-sans font-semibold text-moss no-underline',
  'focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-1/2',
  'focus-visible:z-60 focus-visible:-translate-x-1/2 focus-visible:bg-surface',
  'focus-visible:px-5 focus-visible:py-2.5 focus-visible:shadow-lifted'
)

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <a href="#main" className={SKIP_LINK}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
