import { Leaf } from 'lucide-react'

import { BrandMark } from '@/components/brand/BrandMark'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import { NAV_ITEMS } from '@/lib/navigation'

const FOOTER_LINK = cn(
  'text-caption font-medium text-muted no-underline transition-colors duration-200 ease-settle hover:text-moss'
)

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn('border-t border-line bg-paper-recess', className)}>
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark size={30} />
              <span className="font-display text-[1rem] font-semibold text-moss">
                CivicPulse
              </span>
            </div>
            <p className="mt-5 max-w-sm text-body text-muted">
              Participatory budgeting that treats neighbourhood decisions like something worth
              tending — clearly explained, honestly scoped, and pleasant to finish.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:justify-self-end">
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-12">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={FOOTER_LINK}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line-strong pt-6 text-caption text-muted">
          <p>Concept build · Hyperbloom October 2026 UI/UX design hackathon</p>
          <p className="flex items-center gap-1.5">
            <Leaf size={13} aria-hidden="true" />
            Fraunces, Plus Jakarta Sans, Tailwind CSS v4
          </p>
        </div>
      </Container>
    </footer>
  )
}
