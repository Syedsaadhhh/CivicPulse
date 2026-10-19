import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: 'page' | 'prose'
}

export function Container({ width = 'page', className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-gutter',
        width === 'prose' ? 'max-w-3xl' : 'max-w-page',
        className
      )}
      {...rest}
    />
  )
}
