import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { buttonClasses } from '@/lib/button-styles'
import type { ButtonSize, ButtonVariant } from '@/lib/button-styles'

export type { ButtonSize, ButtonVariant }

type SharedProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Stretches the control to the width of its container. */
  fullWidth?: boolean
  /** Squares the control and drops its horizontal padding for icon-only use. */
  iconOnly?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  children: ReactNode
}

type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps | 'type'> & {
    type?: 'button' | 'submit' | 'reset'
  }

function Content({
  leadingIcon,
  trailingIcon,
  children,
}: Pick<SharedProps, 'leadingIcon' | 'trailingIcon' | 'children'>) {
  return (
    <>
      {leadingIcon ? (
        <span aria-hidden="true" className="inline-flex shrink-0 items-center">
          {leadingIcon}
        </span>
      ) : null}
      <span className="min-w-0">{children}</span>
      {trailingIcon ? (
        <span aria-hidden="true" className="inline-flex shrink-0 items-center">
          {trailingIcon}
        </span>
      ) : null}
    </>
  )
}

export function Button(props: ButtonProps) {
  const {
    variant,
    size,
    fullWidth,
    iconOnly,
    leadingIcon,
    trailingIcon,
    className,
    children,
    type = 'button',
    ...rest
  } = props

  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, iconOnly, className })}
      {...rest}
    >
      <Content leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </Content>
    </button>
  )
}

type ButtonLinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string
  }

export function ButtonLink(props: ButtonLinkProps) {
  const {
    variant,
    size,
    fullWidth,
    iconOnly,
    leadingIcon,
    trailingIcon,
    className,
    children,
    ...rest
  } = props

  return (
    <a className={buttonClasses({ variant, size, fullWidth, iconOnly, className })} {...rest}>
      <Content leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </Content>
    </a>
  )
}
