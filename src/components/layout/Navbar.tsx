import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { BrandMark } from '@/components/brand/BrandMark'
import { Container } from '@/components/layout/Container'
import { Button, ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { EASE_SETTLE } from '@/lib/motion'
import { NAV_ITEMS, PRIMARY_CTA } from '@/lib/navigation'

const DESKTOP_LINK = cn(
  // The six-item row has to survive a 1024 viewport next to the brand and the
  // CTA, so the pills stay tight until there is room for the full padding.
  'inline-flex items-center whitespace-nowrap rounded-full px-2 py-2 text-caption font-medium',
  'text-muted no-underline transition-colors duration-200 ease-settle',
  'hover:bg-sage-mist hover:text-moss xl:px-3.5'
)

const MOBILE_LINK = cn(
  'flex items-center gap-3 rounded-control px-3 py-3 text-body font-medium',
  'text-moss no-underline transition-colors duration-200 ease-settle hover:bg-sage-mist'
)

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isStuck, setIsStuck] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    setIsStuck(value > 12)
  })

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const sync = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    sync()
    desktop.addEventListener('change', sync)
    return () => desktop.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-settle',
        isStuck || menuOpen
          ? 'border-line bg-paper shadow-soft'
          : 'border-transparent bg-transparent'
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <motion.a
          href="#overview"
          aria-label="CivicPulse — back to top"
          whileHover="bloom"
          className="flex items-center gap-2.5 rounded-control no-underline"
        >
          <BrandMark />
          <span className="grid">
            <span className="font-display text-[1.0625rem] leading-none font-semibold text-moss">
              CivicPulse
            </span>
            <span className="mt-1.5 text-eyebrow leading-none text-muted">
              Hyperbloom round
            </span>
          </span>
        </motion.a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={DESKTOP_LINK}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink
            href={PRIMARY_CTA.href}
            variant="primary"
            size="sm"
            trailingIcon={<ArrowRight size={15} strokeWidth={2.2} />}
          >
            {PRIMARY_CTA.label}
          </ButtonLink>
        </div>

        <Button
          className="lg:hidden"
          variant="secondary"
          size="sm"
          iconOnly
          aria-expanded={menuOpen}
          aria-controls="primary-disclosure"
          aria-label={menuOpen ? 'Close main menu' : 'Open main menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </Container>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="primary-disclosure"
            className="overflow-hidden lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_SETTLE }}
          >
            <div className="border-t border-line">
              <Container className="py-5">
                <ul className="grid gap-1">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={MOBILE_LINK}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <ButtonLink
                    href={PRIMARY_CTA.href}
                    variant="primary"
                    fullWidth
                    onClick={() => setMenuOpen(false)}
                  >
                    {PRIMARY_CTA.label}
                  </ButtonLink>
                </div>
              </Container>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
