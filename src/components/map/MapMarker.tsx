import { motion } from 'framer-motion'

import { CategoryMotif } from '@/components/illustrations/CategoryMotif'
import { cn } from '@/lib/cn'
import { pointStyle } from '@/lib/map-geometry'
import { EASE_BLOOM } from '@/lib/motion'
import type { Category, Project } from '@/types/domain'

export type MarkerTone = 'selected' | 'focused' | 'elsewhere' | 'filtered'

type MapMarkerProps = {
  project: Project
  category: Category
  districtName: string
  tone: MarkerTone
  onSelect: () => void
}

const PIN_TONES: Record<MarkerTone, string> = {
  selected: 'bg-forest text-paper border-forest-deep shadow-lifted',
  focused: 'bg-surface text-forest border-sage-deep shadow-soft',
  elsewhere: 'bg-paper text-muted border-line-strong',
  filtered: 'bg-paper-recess text-muted border-line',
}

const TIP_TONES: Record<MarkerTone, string> = {
  selected: 'bg-forest border-forest-deep',
  focused: 'bg-surface border-sage-deep',
  elsewhere: 'bg-paper border-line-strong',
  filtered: 'bg-paper-recess border-line',
}

export function MapMarker({ project, category, districtName, tone, onSelect }: MapMarkerProps) {
  const isSelected = tone === 'selected'
  const isFaint = tone === 'elsewhere' || tone === 'filtered'

  return (
    <div
      className={cn('absolute -translate-x-1/2 -translate-y-full', isSelected ? 'z-30' : 'z-20')}
      style={pointStyle(project.marker)}
    >
      <motion.button
        type="button"
        onClick={onSelect}
        aria-pressed={isSelected}
        aria-label={`${project.title} — ${category.label}, ${districtName}, ${project.costTokens} tokens`}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: tone === 'filtered' ? 0.45 : isFaint ? 0.75 : 1,
          scale: isSelected ? 1.12 : 1,
        }}
        whileHover={{ scale: isSelected ? 1.18 : 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.32, ease: EASE_BLOOM }}
        className="group relative block h-11 w-11 cursor-pointer rounded-full"
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] border',
            TIP_TONES[tone],
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'absolute bottom-[7px] left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border transition-colors duration-300 ease-settle',
            PIN_TONES[tone],
          )}
        >
          <CategoryMotif motif={category.motif} size={16} strokeWidth={1.6} />
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 w-max max-w-[9rem] -translate-x-1/2 rounded-tile bg-moss px-2 py-1 text-center text-caption font-semibold leading-tight text-balance text-paper opacity-0 shadow-soft transition-opacity duration-200 ease-settle group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {project.title}
          <span className="ml-1 font-normal opacity-75">{project.costTokens} tokens</span>
        </span>
      </motion.button>
    </div>
  )
}
