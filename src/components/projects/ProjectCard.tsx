import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, MapPin } from 'lucide-react'

import { TransformationScene } from '@/components/transformation/TransformationScene'
import { TokenControls } from '@/components/tokens/TokenControls'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { categoryById } from '@/data/categories'
import { cn } from '@/lib/cn'
import { EASE_SETTLE } from '@/lib/motion'
import { tokensOn, useAllocation } from '@/state/allocation'
import type { Project } from '@/types/domain'

type ProjectCardProps = {
  project: Project
  districtName: string
  isSelected: boolean
  onSelect: () => void
}

export function ProjectCard({ project, districtName, isSelected, onSelect }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(isSelected)
  const [wasSelected, setWasSelected] = useState(isSelected)
  const panelId = useId()
  const category = categoryById(project.category)
  const { state } = useAllocation()
  const hasTokens = tokensOn(state.tokens, project.id) > 0

  /* Selecting from the map opens the card it points at, and deselecting closes
     it. Adjusted during render so the reader's own collapse stays their choice. */
  if (isSelected !== wasSelected) {
    setWasSelected(isSelected)
    setIsOpen(isSelected)
  }

  function toggle() {
    if (isSelected) {
      setIsOpen((open) => !open)
    } else {
      onSelect()
      setIsOpen(true)
    }
  }

  return (
    <Card
      as="article"
      variant="interactive"
      className={cn(
        'group flex h-full flex-col p-0',
        isSelected && 'border-forest shadow-lifted ring-2 ring-forest/25',
        !isSelected && hasTokens && 'border-sage-deep',
      )}
    >
      <div className="relative overflow-hidden rounded-t-card border-b border-line">
        <div className="aspect-[8/5] w-full bg-paper">
          <TransformationScene
            archetype={project.transformation.archetype}
            side="after"
            className="h-full w-full transition-transform duration-500 ease-bloom group-hover:scale-[1.02]"
          />
        </div>
        <Badge tone="sage" className="absolute bottom-3 left-3 bg-surface/92">
          {category.label}
        </Badge>
        <span className="absolute right-3 top-3 rounded-full bg-moss/85 px-2.5 py-1 text-eyebrow text-paper">
          {project.costTokens} tokens
        </span>
      </div>

      <div className="flex flex-1 flex-col p-card">
        <h3 className="font-display text-subtitle text-moss">{project.title}</h3>
        <p className="mt-2 text-body text-muted">{project.hook}</p>

        {isSelected ? (
          <p className="mt-3 inline-flex items-center gap-1.5 text-caption font-semibold text-forest">
            <Check size={14} strokeWidth={2.6} aria-hidden="true" />
            Selected on the map — {districtName}
          </p>
        ) : null}

        <Button
          variant={isSelected ? 'primary' : 'secondary'}
          size="sm"
          className="mt-5 self-start"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          {isOpen ? 'Hide the detail' : 'Explore this idea'}
        </Button>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              key="detail"
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: EASE_SETTLE }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-line pt-5">
                <p className="text-eyebrow uppercase text-forest">The street today</p>
                <p className="mt-1.5 text-caption text-muted">{project.problem}</p>
                <p className="mt-4 text-eyebrow uppercase text-forest">What it becomes</p>
                <p className="mt-1.5 text-caption text-muted">{project.proposal}</p>

                <p className="mt-4 text-eyebrow uppercase text-forest">Expected impact</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {project.impacts.map((impact) => (
                    <li key={impact.label} className="text-caption text-muted">
                      <span className="font-semibold text-moss">{impact.value}</span> —{' '}
                      {impact.label.toLowerCase()}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-caption text-muted">
                  Illustrative estimate written for this concept, not a measured figure.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                  <span className="text-caption text-muted">{project.timeline}</span>
                  <ButtonLink href="#transform" variant="soft" size="sm" className="ml-auto">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} aria-hidden="true" />
                      Compare this street
                    </span>
                  </ButtonLink>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <TokenControls project={project} className="mt-auto" />
      </div>
    </Card>
  )
}
