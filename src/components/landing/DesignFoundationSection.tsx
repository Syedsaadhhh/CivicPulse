import { ArrowRight, Check, Flower2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import type { BadgeTone } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { ButtonSize, ButtonVariant } from '@/components/ui/Button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { COLOR_TOKENS } from '@/lib/palette'

const BUTTON_VARIANTS: readonly ButtonVariant[] = ['primary', 'secondary', 'soft', 'ghost']

const BUTTON_SIZES: readonly ButtonSize[] = ['sm', 'md', 'lg']

const BADGE_TONES: readonly { readonly tone: BadgeTone; readonly label: string }[] = [
  { tone: 'forest', label: 'Allocated' },
  { tone: 'sage', label: 'Open round' },
  { tone: 'sunshine', label: 'Closes soon' },
  { tone: 'coral', label: 'Needs backing' },
  { tone: 'neutral', label: 'Draft' },
  { tone: 'outline', label: 'Deferred' },
]

const TYPE_ROWS: readonly { readonly token: string; readonly sample: ReactNode }[] = [
  { token: 'text-hero', sample: <span className="font-display text-hero">Aa</span> },
  { token: 'text-title', sample: <span className="font-display text-title">Aa</span> },
  { token: 'text-subtitle', sample: <span className="font-display text-subtitle">Aa</span> },
  { token: 'text-lead', sample: <span className="text-lead">Lead paragraph</span> },
  { token: 'text-body', sample: <span className="text-body">Body copy</span> },
  { token: 'text-caption', sample: <span className="text-caption">Caption text</span> },
  { token: 'text-eyebrow', sample: <span className="text-eyebrow uppercase">Section label</span> },
]

export function DesignFoundationSection() {
  const [lastPressed, setLastPressed] = useState<string | null>(null)

  return (
    <section id="design-foundation" aria-labelledby="design-foundation-heading">
      <Container className="py-section">
        <SectionHeading
          headingId="design-foundation-heading"
          eyebrow="Design foundation"
          title={
            <>
              A neighbourhood <em className="text-forest italic">in bloom</em>
            </>
          }
          description="Every colour, radius, shadow and type size below is a token defined once in src/styles/tokens.css. Product screens in later phases consume these names rather than raw values."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card variant="surface" fullHeight>
              <CardHeader>
                <CardTitle>Colour</CardTitle>
                <Badge tone="neutral">{COLOR_TOKENS.length} shown</Badge>
              </CardHeader>
              <CardDescription>
                Warm paper surfaces, botanical greens and two accents used sparingly.
              </CardDescription>

              <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {COLOR_TOKENS.map((token) => (
                  <li key={token.name} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="size-10 shrink-0 rounded-tile border border-line"
                      style={{ backgroundColor: `var(${token.cssVar})` }}
                    />
                    <span className="min-w-0">
                      <span className="block text-caption font-semibold text-moss">
                        {token.name}
                      </span>
                      <span className="block text-caption text-muted">
                        {token.role}
                        <span className="font-mono"> {token.hex}</span>
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.06}>
            <Card variant="surface" fullHeight>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <Badge tone="sage">Fluid ramp</Badge>
              </CardHeader>
              <CardDescription>
                Fraunces carries the headings with an optical-size axis; Plus Jakarta Sans sets
                every control, label and number.
              </CardDescription>

              <ul className="mt-7 grid gap-4">
                {TYPE_ROWS.map((row) => (
                  <li
                    key={row.token}
                    className="flex items-baseline justify-between gap-6 border-b border-line pb-4 last:border-0 last:pb-0"
                  >
                    {row.sample}
                    <span className="font-mono text-eyebrow text-muted shrink-0">{row.token}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card variant="tinted" fullHeight>
              <CardHeader>
                <CardTitle>Controls</CardTitle>
                <Badge tone="neutral">Interactive</Badge>
              </CardHeader>
              <CardDescription>
                Four variants, three sizes, one shared focus ring. Try the keyboard tab order.
              </CardDescription>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {BUTTON_VARIANTS.map((variant) => (
                  <Button
                    key={variant}
                    variant={variant}
                    onClick={() => setLastPressed(`Button · ${variant}`)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {BUTTON_SIZES.map((size) => (
                  <Button
                    key={size}
                    variant="primary"
                    size={size}
                    onClick={() => setLastPressed(`Size · ${size}`)}
                  >
                    {size.toUpperCase()}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  trailingIcon={<ArrowRight size={16} aria-hidden="true" />}
                  onClick={() => setLastPressed('Button · ghost with trailing icon')}
                >
                  Next step
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  leadingIcon={<Flower2 size={16} aria-hidden="true" />}
                  onClick={() => setLastPressed('Button · secondary with leading icon')}
                >
                  With icon
                </Button>
                <Button
                  variant="primary"
                  iconOnly
                  aria-label="Example icon-only button"
                  onClick={() => setLastPressed('Icon-only button')}
                >
                  <Flower2 size={18} aria-hidden="true" />
                </Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
              </div>

              <CardFooter>
                <p className="flex items-center gap-2 text-caption text-muted" aria-live="polite">
                  {lastPressed ? (
                    <>
                      <Check size={14} aria-hidden="true" className="text-forest" />
                      <span>
                        Last pressed:{' '}
                        <strong className="font-semibold text-moss">{lastPressed}</strong>
                      </span>
                    </>
                  ) : (
                    <span>Press a control to see which token set it uses.</span>
                  )}
                </p>
              </CardFooter>
            </Card>
          </Reveal>

          <Reveal delay={0.18}>
            <Card variant="surface" fullHeight>
              <CardHeader>
                <CardTitle>Labels</CardTitle>
                <Badge tone="neutral">Six tones</Badge>
              </CardHeader>
              <CardDescription>
                Status badges stay small and calm. Filled tones always carry moss-coloured text so
                contrast holds on every accent.
              </CardDescription>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {BADGE_TONES.map((entry) => (
                  <Badge key={entry.tone} tone={entry.tone}>
                    {entry.label}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                <Badge tone="sage" size="md" icon={<Flower2 size={14} aria-hidden="true" />}>
                  With icon
                </Badge>
                <Badge tone="forest" size="md">
                  Fully allocated
                </Badge>
                <Badge tone="outline" size="md">
                  Neutral
                </Badge>
              </div>

              <CardFooter>
                <p className="text-caption text-muted">
                  Later phases reuse these tones for proposal status, token allocation and review
                  summaries.
                </p>
              </CardFooter>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
