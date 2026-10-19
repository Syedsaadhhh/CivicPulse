import type { Category, CategoryId } from '@/types/domain'

/** Keyed by id so a lookup is total: every `CategoryId` in the data resolves. */
export const CATEGORIES: Record<CategoryId, Category> = {
  greening: {
    id: 'greening',
    label: 'Greening',
    motif: 'tree',
    blurb: 'Trees, meadow and shade that arrive slowly on purpose.',
  },
  mobility: {
    id: 'mobility',
    label: 'Mobility',
    motif: 'cycle',
    blurb: 'Crossings, lanes and surfaces that make walking the easier choice.',
  },
  water: {
    id: 'water',
    label: 'Water',
    motif: 'water',
    blurb: 'Reopening the stream, holding rain, softening the edges.',
  },
  community: {
    id: 'community',
    label: 'Community',
    motif: 'gathering',
    blurb: 'Tables, lights and stores that give the street a reason to linger.',
  },
  play: {
    id: 'play',
    label: 'Play',
    motif: 'swing',
    blurb: 'Loose parts, slopes and room for the unsupervised kind.',
  },
}

export const CATEGORY_LIST: readonly Category[] = Object.values(CATEGORIES)

export const ALL_CATEGORIES: readonly (CategoryId | 'all')[] = [
  'all',
  ...CATEGORY_LIST.map((category) => category.id),
]

export function categoryById(id: CategoryId): Category {
  return CATEGORIES[id]
}
