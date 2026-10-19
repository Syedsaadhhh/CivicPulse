import type { Neighbourhood, NeighbourhoodId } from '@/types/domain'

/**
 * Four fictional districts. The boxes are rectangles in the neighbourhood-map
 * viewBox (0 0 800 600); the illustration is drawn around them, so a district
 * grows when its box grows. Insertion order is the order the map and the search
 * results use.
 */
export const NEIGHBOURHOODS: Record<NeighbourhoodId, Neighbourhood> = {
  'marigold-mews': {
    id: 'marigold-mews',
    name: 'Marigold Mews',
    aliases: ['marigold', 'mews', 'the yard', 'back lanes', 'behind the shops'],
    character: 'Market yards, back doors and the lane behind the high street.',
    story:
      'Marigold Mews is the part of the map most people walk past: service lanes, blocked sightlines and a yard that empties by five o’clock. Every proposal here works behind the frontage, where the price is low and the daily win is small but real.',
    box: { x: 36, y: 36, width: 300, height: 214 },
    labelAt: { x: 58, y: 226 },
  },
  'ferngate-green': {
    id: 'ferngate-green',
    name: 'Ferngate Green',
    aliases: ['ferngate', 'fern gate', 'the green', 'ferns', 'village green'],
    character: 'A wide green framed by trees, with the shops at its gate.',
    story:
      'Ferngate Green has the two things most neighbourhoods would pay for: mature canopy and an open middle. The ideas on this side of the map are mostly about keeping the ground soft, the shade thick and the edges walkable.',
    box: { x: 376, y: 36, width: 388, height: 214 },
    labelAt: { x: 398, y: 226 },
  },
  'alder-row': {
    id: 'alder-row',
    name: 'Alder Row',
    aliases: ['alder', 'alder row', 'the terrace', 'row houses', 'listed terrace'],
    character: 'One long terrace, one lane of trees, and a drain running underneath.',
    story:
      'Alder Row is a single line of front doors with a lane that has never been asked what it is for. It floods in hard rain and it is far too fast in ordinary weather, which makes it the clearest place on this map to test small, cheap change.',
    box: { x: 36, y: 290, width: 240, height: 274 },
    labelAt: { x: 48, y: 540 },
  },
  'sycamore-cut': {
    id: 'sycamore-cut',
    name: 'Sycamore Cut',
    aliases: ['sycamore', 'sycamore cut', 'the canal', 'waterfront', 'the cut'],
    character: 'A narrow water cut and the steep banks left behind it.',
    story:
      'Sycamore Cut is named for the water: a straight cut with high banks, a towpath that stops abruptly and a lot of unused edge. This is where the round spends most of its money, because the ground itself has to change before anything else can grow.',
    box: { x: 316, y: 290, width: 448, height: 274 },
    labelAt: { x: 636, y: 548 },
  },
}

export const NEIGHBOURHOOD_LIST: readonly Neighbourhood[] = Object.values(NEIGHBOURHOODS)

export const DEFAULT_NEIGHBOURHOOD_ID: NeighbourhoodId = 'marigold-mews'

export function neighbourhoodById(id: NeighbourhoodId): Neighbourhood {
  return NEIGHBOURHOODS[id]
}
