import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const BASE = cn(
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control',
  'font-sans font-semibold no-underline',
  'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-settle',
  'disabled:pointer-events-none disabled:opacity-55 disabled:shadow-none'
)

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-forest text-paper shadow-soft hover:bg-forest-deep hover:text-surface active:scale-[0.985]',
  secondary:
    'border border-line bg-surface text-moss shadow-soft hover:border-line-strong hover:bg-paper-recess active:scale-[0.985]',
  soft: 'bg-sage text-moss hover:bg-sage-deep active:scale-[0.985]',
  ghost: 'text-forest hover:bg-sage-mist hover:text-forest-deep active:scale-[0.985]',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-caption',
  md: 'h-11 px-5 text-body',
  lg: 'h-13 px-6 text-lead',
}

const SQUARE_SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 w-9 gap-0 px-0',
  md: 'h-11 w-11 gap-0 px-0',
  lg: 'h-13 w-13 gap-0 px-0',
}

export function buttonClasses(options: {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  iconOnly?: boolean
  className?: string
}): string {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    iconOnly = false,
    className,
  } = options

  return cn(
    BASE,
    iconOnly ? SQUARE_SIZES[size] : SIZES[size],
    VARIANTS[variant],
    fullWidth && 'w-full',
    className
  )
}
