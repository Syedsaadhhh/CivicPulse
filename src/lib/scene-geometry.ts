import type { CSSProperties } from 'react'

import type { ScenePoint } from '@/types/domain'

/** Street-transformation scenes are drawn in these units; the frame keeps the ratio. */
export const SCENE_WIDTH = 640
export const SCENE_HEIGHT = 400
export const SCENE_ASPECT = '8 / 5'

function percent(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(4)}%`
}

export function scenePointStyle(point: ScenePoint): CSSProperties {
  return {
    left: percent(point.x, SCENE_WIDTH),
    top: percent(point.y, SCENE_HEIGHT),
  }
}
