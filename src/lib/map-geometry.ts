import type { CSSProperties } from 'react'

import type { MapBox, MapPoint } from '@/types/domain'

/** The neighbourhood map is drawn in these units; the frame keeps this ratio. */
export const MAP_WIDTH = 800
export const MAP_HEIGHT = 600

function percent(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(4)}%`
}

/**
 * Overlay controls are placed in percentages so they stay locked to the
 * illustration at every width, as long as the frame keeps the viewBox ratio.
 */
export function pointStyle(point: MapPoint): CSSProperties {
  return {
    left: percent(point.x, MAP_WIDTH),
    top: percent(point.y, MAP_HEIGHT),
  }
}

export function boxStyle(box: MapBox): CSSProperties {
  return {
    left: percent(box.x, MAP_WIDTH),
    top: percent(box.y, MAP_HEIGHT),
    width: percent(box.width, MAP_WIDTH),
    height: percent(box.height, MAP_HEIGHT),
  }
}

/** Corner radius of the district plates, in viewBox units. */
const TILE_RADIUS = 20

/**
 * An HTML overlay needs a percentage radius to keep the same corner as the SVG
 * plate underneath it, because percentages are taken against its own box.
 */
export function radiusStyle(box: MapBox): CSSProperties {
  const horizontal = (TILE_RADIUS / box.width) * 100
  const vertical = (TILE_RADIUS / box.height) * 100
  return { borderRadius: `${horizontal.toFixed(2)}% / ${vertical.toFixed(2)}%` }
}
