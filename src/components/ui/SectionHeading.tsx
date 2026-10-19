import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  /** Renders the title as h3 instead of h2 for nested sections. */
  level?: 2 | 3
  /** Lets a section point at its heading with aria-labelledby. */
  headingId?: string
  className?: string
}

export function SectionHeading(props: SectionHeadingProps) {
  const {
    eyebrow,
    title,
    description,
    align = 'left',
    level = 2,
    headingId,
    className,
  } = props
  const Heading = level === 3 ? 'h3' : 'h2'

  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow ? (
        <p className="text-eyebrow text-forest uppercase">{eyebrow}</p>
      ) : null}
      <Heading id={headingId} className="mt-3 font-display text-title">
        {title}
      </Heading>
      {description ? (
        <p className={cn('mt-4 text-lead text-muted', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
