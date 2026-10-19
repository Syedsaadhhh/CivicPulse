import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type BadgeTone = 'neutral' | 'sage' | 'sunshine' | 'coral' | 'forest' | 'outline'
export type BadgeSize = 'sm' | 'md'

const BASE = cn(
  'inline-flex items-center gap-1.5 rounded-full font-sans font-semibold no-underline'
)

const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-paper-recess text-muted',
  sage: 'bg-sage text-moss',
  sunshine: 'bg-sunshine text-moss',
  coral: 'bg-coral text-moss',
  forest: 'bg-forest text-paper',
  outline: 'border border-line-strong bg-surface text-muted',
}

const SIZES: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-eyebrow',
  md: 'px-3 py-1 text-caption',
}

export type BadgeProps = {
  tone?: BadgeTone
  size?: BadgeSize
  icon?: ReactNode
  className?: string
  children: ReactNode
}

/**
 * Short status label. Text colour is `moss` on every filled tone so the label
 * keeps WCAG AA contrast regardless of accent.
 */
export function Badge(props: BadgeProps) {
  const { tone = 'neutral', size = 'sm', icon, className, children } = props

  return (
    <span className={cn(BASE, SIZES[size], TONES[tone], className)}>
      {icon ? (
        <span aria-hidden="true" className="inline-flex shrink-0 items-center">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  )
}
