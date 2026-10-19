import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type CardVariant = 'surface' | 'tinted' | 'outlined' | 'interactive'

const BASE = cn(
  'rounded-card border',
  'transition-[box-shadow,transform,border-color,background-color] duration-300 ease-settle'
)

const VARIANTS: Record<CardVariant, string> = {
  surface: 'border-line bg-surface shadow-soft',
  tinted: 'border-sage-deep bg-sage-mist',
  outlined: 'border-line-strong bg-transparent',
  interactive:
    'border-line bg-surface shadow-soft hover:-translate-y-1 hover:border-sage-deep hover:shadow-lifted',
}

type SlotProps = HTMLAttributes<HTMLDivElement>

export type CardProps = SlotProps & {
  variant?: CardVariant
  padded?: boolean
  fullHeight?: boolean
  /** Content cards are articles; layout cards stay divs. */
  as?: 'div' | 'article'
}

export function Card(props: CardProps) {
  const { variant = 'surface', padded = true, fullHeight = false, as: Element = 'div', className, ...rest } = props

  return (
    <Element
      className={cn(
        BASE,
        VARIANTS[variant],
        padded && 'p-card',
        fullHeight && 'flex h-full flex-col',
        className
      )}
      {...rest}
    />
  )
}

export function CardHeader({ className, ...rest }: SlotProps) {
  return (
    <div
      className={cn('flex flex-wrap items-start justify-between gap-3', className)}
      {...rest}
    />
  )
}

export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('font-display text-subtitle text-moss', className)} {...rest} />
}

export function CardDescription({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('mt-2 text-body text-muted', className)} {...rest} />
}

export function CardContent({ className, ...rest }: SlotProps) {
  return <div className={cn('mt-5', className)} {...rest} />
}

export function CardFooter({ className, ...rest }: SlotProps) {
  return (
    <div
      className={cn('mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5', className)}
      {...rest}
    />
  )
}
