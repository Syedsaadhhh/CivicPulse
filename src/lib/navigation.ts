export type NavItem = {
  readonly label: string
  readonly href: string
}

/** One entry per section that actually exists on the landing screen. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Neighbourhoods', href: '#discover' },
  { label: 'Ideas', href: '#ideas' },
  { label: 'Before & after', href: '#transform' },
  { label: 'My tokens', href: '#review' },
  { label: 'How it works', href: '#how-it-works' },
]

export const PRIMARY_CTA: NavItem = {
  label: 'Start exploring',
  href: '#discover',
}
