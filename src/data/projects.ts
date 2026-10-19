import type { NeighbourhoodId, Project, ProjectId } from '@/types/domain'

/**
 * Twelve fictional proposals, three per district. Costs are Civic Tokens out of
 * the 100-token round budget, so the full set deliberately costs far more than a
 * resident can fund. Impact figures are illustrative design estimates, not
 * measured or collected data.
 */
export const PROJECTS: readonly Project[] = [
  /* ---------------------------------------------------------------- Marigold Mews */
  {
    id: 'mews-yard',
    neighbourhoodId: 'marigold-mews',
    category: 'play',
    title: 'Open the mews yard',
    hook: 'A yard that is a car park at ten and could be a playground by six.',
    problem:
      'The mews behind the shops is the flattest, most usable ground in the district and it is used to store four vans and a skip. Children play on the pavement outside because there is nowhere else with a door and a wall.',
    proposal:
      'Keep the deliveries window until eleven, then let the yard belong to everyone else. Loose timber blocks, a low wall to sit on, chalk ground and two planting beds that double as the boundary.',
    costTokens: 28,
    timeline: 'One season, in two halves',
    impacts: [
      { label: 'Hours a week the yard is open to play', value: 'roughly 55 more' },
      { label: 'Parking spaces given up', value: 'about 9 of 26' },
    ],
    marker: { x: 178, y: 172 },
    transformation: {
      archetype: 'courtyard',
      beforeCaption: 'Today: delivery vans, one skip, no place to sit once the trucks have gone.',
      afterCaption: 'After: the same yard held open with loose play, two beds and a wall to sit on.',
      annotations: [
        { label: 'Play ground', detail: 'Loose blocks and chalk, stored in the back shop overnight.', at: { x: 270, y: 300 } },
        { label: 'Soft edge', detail: 'Two raised beds take the corner that nothing ever used.', at: { x: 360, y: 378 } },
        { label: 'Kept entrance', detail: 'The gateway stays wide enough for one van and one wheelchair.', at: { x: 58, y: 206 } },
      ],
      readings: [
        { label: 'Ground kept level', value: 'about 300 m²' },
        { label: 'Seats along the wall', value: 'around 18' },
        { label: 'Nights lit', value: 'same as now' },
      ],
    },
  },
  {
    id: 'mews-garden',
    neighbourhoodId: 'marigold-mews',
    category: 'greening',
    title: 'Garden the front doors',
    hook: 'Every household on the mews gets one metre of something living.',
    problem:
      'The frontages are bare render and bollards. There is no green on this side of the map at all, and no place for a rain barrel, a pot, or a child to water something.',
    proposal:
      'Cut the kerb in twelve short places and build soil beds out of the existing pavement width, with one shared water point and a hand-out list of plants that suit the shade each door gets.',
    costTokens: 16,
    timeline: 'Two busy months',
    impacts: [
      { label: 'Doors with soil in front of them', value: '12 of 14' },
      { label: 'Rainwater held on the frontage', value: 'a small first test' },
    ],
    marker: { x: 268, y: 96 },
    transformation: {
      archetype: 'highstreet',
      beforeCaption: 'Today: render, bollards and a kerb that sends every drop of rain to the drain.',
      afterCaption: 'After: twelve cut kerbs, soil at the front door and one shared tap.',
      annotations: [
        { label: 'Front bed', detail: 'Soil brought up into the pavement, not onto the carriageway.', at: { x: 70, y: 356 } },
        { label: 'Shared tap', detail: 'One connection, so nobody has to carry water down the lane.', at: { x: 516, y: 342 } },
        { label: 'Shade planting', detail: 'Species chosen per door, for the light that door actually gets.', at: { x: 404, y: 312 } },
      ],
      readings: [
        { label: 'Planting area gained', value: 'roughly 40 m²' },
        { label: 'Kerb cuts', value: '12' },
        { label: 'Maintenance', value: 'household by household' },
      ],
    },
  },
  {
    id: 'mews-store',
    neighbourhoodId: 'marigold-mews',
    category: 'community',
    title: 'Bring the back stores to life',
    hook: 'Empty ground floors, turned into a repair room, a tool library and a kettle.',
    problem:
      'Three former stores have been locked since the market moved. They face the mews with shutters and take up the only wall that has ever had any daylight on it.',
    proposal:
      'Take the shutters off, put a doorway back at pavement height and let the community rent the space at a price the round sets. First tenants suggested by the neighbourhood group: a repair bench, a tool library, one room left dark for storage.',
    costTokens: 22,
    timeline: 'Slowest part of the year',
    impacts: [
      { label: 'Store fronts opened', value: '3 of 3' },
      { label: 'Rooms held for people, not stock', value: '2' },
    ],
    marker: { x: 92, y: 128 },
    transformation: {
      archetype: 'highstreet',
      beforeCaption: 'Today: three shuttered stores, one doorway in use, no place to stop.',
      afterCaption: 'After: openings at pavement height, a repair bench and a shelf of tools.',
      annotations: [
        { label: 'New doorway', detail: 'Level threshold, so a trolley or a chair gets in unaided.', at: { x: 95, y: 170 } },
        { label: 'Repair bench', detail: 'A long top under the window, visible from the lane.', at: { x: 300, y: 160 } },
        { label: 'Tool shelf', detail: 'Loaned against a name, not a card.', at: { x: 540, y: 170 } },
      ],
      readings: [
        { label: 'Indoor space returned', value: 'around 110 m²' },
        { label: 'Shutters removed', value: '3' },
        { label: 'Opening hours', value: 'set by the tenants' },
      ],
    },
  },

  /* ---------------------------------------------------------------- Ferngate Green */
  {
    id: 'fern-orchard',
    neighbourhoodId: 'ferngate-green',
    category: 'greening',
    title: 'Plant the green like an orchard',
    hook: 'Standards in a grid, so the shade lands where people actually walk.',
    problem:
      'The green is wide and the trees it has are all on the edges. Crossing the middle in August means crossing it in full sun, and the grass in the centre is worn to soil by the desire lines anyway.',
    proposal:
      'Ninety young standard trees set out on a loose grid across the worn middle, mown paths between them, and a guard rail at each trunk for the first three years.',
    costTokens: 30,
    timeline: 'Two planting seasons',
    impacts: [
      { label: 'Shaded crossing routes', value: 'from none to 3' },
      { label: 'Trees that need watering by hand', value: '90 for 3 seasons' },
    ],
    marker: { x: 470, y: 100 },
    transformation: {
      archetype: 'greenway',
      beforeCaption: 'Today: an open middle, worn to soil, with the only shade at the edges.',
      afterCaption: 'After: standards on a grid, mown paths between them, grass left at the margins.',
      annotations: [
        { label: 'Standard tree', detail: 'Clear stem to two metres so the path stays under the canopy, not beside it.', at: { x: 120, y: 300 } },
        { label: 'Mown path', detail: 'Cut wide enough for two people and a buggy passing.', at: { x: 300, y: 344 } },
        { label: 'Long grass margin', detail: 'Left uncut at the edges, where the shade already is.', at: { x: 150, y: 372 } },
      ],
      readings: [
        { label: 'Canopy over the middle', value: 'full shade in 15 years' },
        { label: 'Trees', value: '90' },
        { label: 'Grass left to grow', value: 'about a fifth' },
      ],
    },
  },
  {
    id: 'fern-table',
    neighbourhoodId: 'ferngate-green',
    category: 'community',
    title: 'One long table on the green',
    hook: 'A place to eat lunch that does not belong to anyone.',
    problem:
      'There is nowhere on the green to sit that is not a car. The two benches face the road, and the school run uses the corner as a waiting bay.',
    proposal:
      'Four timber tables and a bench run along the shaded south side, with a hard-standing strip so they stay usable after rain, and two parking bays taken out of the corner.',
    costTokens: 18,
    timeline: 'One spring',
    impacts: [
      { label: 'Seats out of the shade line', value: 'around 34' },
      { label: 'Bays handed back', value: '4' },
    ],
    marker: { x: 588, y: 168 },
    transformation: {
      archetype: 'courtyard',
      beforeCaption: 'Today: two benches facing traffic and a corner kept warm for cars.',
      afterCaption: 'After: tables along the shade, a hard strip, and the corner given back.',
      annotations: [
        { label: 'Table run', detail: 'Four tops set in the late-afternoon shade line.', at: { x: 470, y: 268 } },
        { label: 'Hard standing', detail: 'Keeps the legs out of the mud and the wheelchairs on.', at: { x: 250, y: 336 } },
        { label: 'Freed corner', detail: 'Where the waiting bays were, now grass and one bench.', at: { x: 80, y: 290 } },
      ],
      readings: [
        { label: 'Tables', value: '4' },
        { label: 'Seatable in rain', value: 'most of the run' },
        { label: 'Views across the green', value: 'kept open' },
      ],
    },
  },
  {
    id: 'fern-play',
    neighbourhoodId: 'ferngate-green',
    category: 'play',
    title: 'Use the slope instead of flattening it',
    hook: 'A tumble, a rope, and a bank to roll down, at the edge of the green.',
    problem:
      'The ground falls away towards the gate and it has been fenced off as unusable. The equipment that was here went in the ground years ago and nothing replaced it.',
    proposal:
      'Take the fence down, shape the bank for rolling, add a rope climber and a low balance line, and keep the whole thing unstructured so it can be used by more than one age.',
    costTokens: 26,
    timeline: 'One summer of works',
    impacts: [
      { label: 'Years of fencing removed', value: 'the last of it' },
      { label: 'Ages that can use it', value: 'wide, on purpose' },
    ],
    marker: { x: 688, y: 84 },
    transformation: {
      archetype: 'greenway',
      beforeCaption: 'Today: a rail across the fall of the ground and one dead-end path.',
      afterCaption: 'After: the rail comes out, the bank is shaped to roll and the path runs through.',
      annotations: [
        { label: 'Rolling bank', detail: 'Regraded soil, seeded, with no hardware on it.', at: { x: 150, y: 290 } },
        { label: 'Balance line', detail: 'A low timber run at the bottom of the slope.', at: { x: 330, y: 352 } },
        { label: 'Rope climber', detail: 'One post, one rope, the cheapest thing on this map.', at: { x: 430, y: 280 } },
      ],
      readings: [
        { label: 'Playable ground', value: 'roughly 220 m²' },
        { label: 'Metal work', value: '2 posts' },
        { label: 'Fence removed', value: '38 m' },
      ],
    },
  },

  /* ------------------------------------------------------------------- Alder Row */
  {
    id: 'alder-shade',
    neighbourhoodId: 'alder-row',
    category: 'greening',
    title: 'Finish the row of alders',
    hook: 'The trees stop halfway down the terrace, so the shade does too.',
    problem:
      'Sixteen alders line the first half of the row and the gaps show. Where the canopy ends, the pavement is measurably hotter and nobody waits there.',
    proposal:
      'Fill the gaps with the same species in larger containers than standard, with soil cells under the pavement so the roots have somewhere to go that is not a drain.',
    costTokens: 20,
    timeline: 'One winter of planting',
    impacts: [
      { label: 'Gaps in the canopy line', value: 'from 7 to 0' },
      { label: 'Pavement heave risk over 20 years', value: 'lowered, not removed' },
    ],
    marker: { x: 88, y: 352 },
    transformation: {
      archetype: 'highstreet',
      beforeCaption: 'Today: a tree line that gives up halfway, and pavement that has to take it.',
      afterCaption: 'After: the gaps filled, each tree given a soil cell instead of a hole.',
      annotations: [
        { label: 'Soil cell', detail: 'Structured soil under the footway, so the root has a room, not a crack.', at: { x: 170, y: 352 } },
        { label: 'Filled gap', detail: 'Same species, same spacing, one size up.', at: { x: 404, y: 316 } },
        { label: 'Watering point', detail: 'One standpipe at the middle of the row.', at: { x: 556, y: 344 } },
      ],
      readings: [
        { label: 'Trees', value: '7' },
        { label: 'Unbroken canopy', value: 'about 200 m' },
        { label: 'Root volume each', value: 'roughly 2 m³' },
      ],
    },
  },
  {
    id: 'alder-crossing',
    neighbourhoodId: 'alder-row',
    category: 'mobility',
    title: 'Raise the crossing where people already jaywalk',
    hook: 'Two painted lines nobody uses, and one worn patch of tarmac everybody does.',
    problem:
      'The marked crossing sits by the bend, but the shop, the bus stop and the school gate are all opposite each other sixty metres along. The footway there is broken from people stepping into the road to look.',
    proposal:
      'Move the crossing to the worn point as a raised table in brick, with a single clear line of sight, dropped kerbs on both sides and one parked car taken out for visibility.',
    costTokens: 24,
    timeline: 'Six weeks, one at night',
    impacts: [
      { label: 'Distance to the nearest crossing', value: '60 m shorter' },
      { label: 'Places a child has to look behind', value: 'one, not two' },
    ],
    marker: { x: 118, y: 452 },
    transformation: {
      archetype: 'highstreet',
      beforeCaption: 'Today: a crossing around the bend and a worn step-over opposite the shop.',
      afterCaption: 'After: the crossing moved to the worn point, as a raised brick table.',
      annotations: [
        { label: 'Raised table', detail: 'Brick at footway height, so the car slows and the pram does not climb.', at: { x: 320, y: 292 } },
        { label: 'Clear sightline', detail: 'One parked bay removed so the bend stops being a blind one.', at: { x: 120, y: 272 } },
        { label: 'Both dropped', detail: 'Kerbs lowered on the shop side as well as the school side.', at: { x: 407, y: 312 } },
      ],
      readings: [
        { label: 'Crossing distance', value: '34 m of table' },
        { label: 'Bays removed', value: '1' },
        { label: 'Levels to step over', value: '0' },
      ],
    },
  },
  {
    id: 'alder-frontage',
    neighbourhoodId: 'alder-row',
    category: 'play',
    title: 'Let the frontage be a room',
    hook: 'The street in front of the terrace, claimed for an hour after school.',
    problem:
      'Alder Row is wide enough to play in and fast enough that nobody does. There is no wall to bounce a ball off and no step to sit on that is not a kerb.',
    proposal:
      'A short stretch of the row rebuilt as a home zone: continuous paving, a low seat wall on the sunny side, two bounce walls, and build-outs at each end that make the entry feel like a place rather than a road.',
    costTokens: 34,
    timeline: 'A long season, done in sections',
    impacts: [
      { label: 'Through traffic expected to fall', value: 'a lot, unproven' },
      { label: 'Kerbs a child has to sit on', value: 'none, by design' },
    ],
    marker: { x: 205, y: 505 },
    transformation: {
      archetype: 'courtyard',
      beforeCaption: 'Today: a wide, fast street with nothing to sit on except the kerb.',
      afterCaption: 'After: one level surface, a seat wall in the sun and two walls to bounce off.',
      annotations: [
        { label: 'Seat wall', detail: 'Low, warm side, wide enough to put a drink on.', at: { x: 250, y: 322 } },
        { label: 'Bounce wall', detail: 'A flat return of brick where the garage block steps in.', at: { x: 560, y: 240 } },
        { label: 'Build-out', detail: 'The entry narrowed to a gateway, so speed has to change first.', at: { x: 58, y: 210 } },
      ],
      readings: [
        { label: 'Level shared surface', value: 'about 70 m' },
        { label: 'Seating edge', value: 'around 20 m' },
        { label: 'Traffic still allowed', value: 'yes, slowly' },
      ],
    },
  },

  /* ---------------------------------------------------------------- Sycamore Cut */
  {
    id: 'sycamore-reeds',
    neighbourhoodId: 'sycamore-cut',
    category: 'water',
    title: 'Let the bank grow back',
    hook: 'Reeds in the water, not a fence above it.',
    problem:
      'The near bank is a vertical timber wall with a rail on top. Nothing grows on it, silt builds at its foot, and the water is only ever seen from a height.',
    proposal:
      'Re-grade two short reaches into shallow steps, plant reed and sedge belts at the waterline, and take the rail out where the bank becomes too shallow to need it.',
    costTokens: 14,
    timeline: 'Two working weeks, then three years of patience',
    impacts: [
      { label: 'Water edge people can reach', value: '2 reaches' },
      { label: 'Rail removed', value: 'only where the slope makes it safe' },
    ],
    marker: { x: 426, y: 491 },
    transformation: {
      archetype: 'waterfront',
      beforeCaption: 'Today: a vertical timber wall, a rail, and silt building at the foot.',
      afterCaption: 'After: shallow graded steps with reed belts at the waterline.',
      annotations: [
        { label: 'Reed belt', detail: 'Planted in the shallows, cut in rotation so it stays thick.', at: { x: 424, y: 300 } },
        { label: 'Toehold steps', detail: 'Wide enough to stand on, low enough to stay out of the water.', at: { x: 270, y: 296 } },
        { label: 'Rail gone', detail: 'Removed only where the new slope makes it pointless.', at: { x: 340, y: 282 } },
      ],
      readings: [
        { label: 'Planted edge', value: 'roughly 60 m' },
        { label: 'Open water reached', value: '2 points' },
        { label: 'Silt held on the bank', value: 'instead of in the cut' },
      ],
    },
  },
  {
    id: 'sycamore-steps',
    neighbourhoodId: 'sycamore-cut',
    category: 'water',
    title: 'Steps down to the water',
    hook: 'The cut is six feet below the path and nobody has ever been invited down.',
    problem:
      'There is one way onto the towpath at this end and it is a ramp designed for maintenance vehicles. Everything else about the edge says stay up here.',
    proposal:
      'A masonry stair at the old landing point, a widened landing at the water with a single timber bench, and a handrail on one side only so the crossing stays readable.',
    costTokens: 38,
    timeline: 'The heaviest job in the round',
    impacts: [
      { label: 'Levels between path and water', value: 'from 3 to 1' },
      { label: 'Maintenance vehicle access', value: 'kept, at the ramp' },
    ],
    marker: { x: 570, y: 391 },
    transformation: {
      archetype: 'waterfront',
      beforeCaption: 'Today: a vehicle ramp, one crossing point and a wall between the path and the water.',
      afterCaption: 'After: a stone stair to a landing at the water, with one bench and one rail.',
      annotations: [
        { label: 'Stone stair', detail: 'Set at the historic landing, eleven treads down.', at: { x: 272, y: 292 } },
        { label: 'Landing bench', detail: 'One timber seat facing the water, not the path.', at: { x: 490, y: 336 } },
        { label: 'Ramp retained', detail: 'The vehicle access stays exactly where it is today.', at: { x: 556, y: 282 } },
      ],
      readings: [
        { label: 'Vertical drop handled', value: 'about 1.8 m' },
        { label: 'Crossings to the water', value: '2' },
        { label: 'Handrails', value: '1 of 2 sides' },
      ],
    },
  },
  {
    id: 'sycamore-lane',
    neighbourhoodId: 'sycamore-cut',
    category: 'mobility',
    title: 'Close the gap in the towpath lane',
    hook: 'A path that ends at a fence, eighty metres from the next street.',
    problem:
      'The lane runs along the cut and stops dead at a gate onto a private yard. To get round it, a cyclist takes the main road for three quarters of a mile.',
    proposal:
      'Buy the crossing at the gate, lay sixty metres of firm narrow surface, and put the junction on the alignment so the path reads as the continuation rather than the side road.',
    costTokens: 45,
    timeline: 'Longest single line in the round',
    impacts: [
      { label: 'Detour removed', value: 'about 1.2 km of road' },
      { label: 'New junctions to get right', value: '2' },
    ],
    marker: { x: 691, y: 337 },
    transformation: {
      archetype: 'greenway',
      beforeCaption: 'Today: a lane that stops at a locked gate onto a private yard.',
      afterCaption: 'After: sixty metres of firm surface carried through to the next street.',
      annotations: [
        { label: 'New surface', detail: 'Narrow, self-draining, and never wider than it has to be.', at: { x: 240, y: 352 } },
        { label: 'Aligned junction', detail: 'The road bends around the path, not the other way.', at: { x: 600, y: 312 } },
        { label: 'Gate opened', detail: 'The crossing bought so the path is a way through, not a courtyard.', at: { x: 90, y: 372 } },
      ],
      readings: [
        { label: 'Missing link', value: '60 m' },
        { label: 'Road detour avoided', value: 'roughly 1.2 km' },
        { label: 'Surfaces', value: '2' },
      ],
    },
  },
]

export function projectsInNeighbourhood(id: NeighbourhoodId): Project[] {
  return PROJECTS.filter((project) => project.neighbourhoodId === id)
}

const PROJECT_INDEX: ReadonlyMap<ProjectId, Project> = new Map(
  PROJECTS.map((project) => [project.id, project]),
)

/** `ProjectId` is an open string, so an unknown id is a real runtime case. */
export function projectById(id: ProjectId): Project {
  const project = PROJECT_INDEX.get(id)
  if (project === undefined) {
    throw new RangeError(`No sample project with id "${id}".`)
  }
  return project
}
