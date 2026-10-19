export type ColorToken = {
  readonly name: string
  readonly cssVar: string
  readonly hex: string
  readonly role: string
}

/**
 * The palette registry used by the design foundation showcase. Swatches read
 * `cssVar` at runtime so the demo can never drift from tokens.css.
 */
export const COLOR_TOKENS: readonly ColorToken[] = [
  {
    name: 'Paper',
    cssVar: '--color-paper',
    hex: '#F8F6EF',
    role: 'Page background',
  },
  {
    name: 'Recess',
    cssVar: '--color-paper-recess',
    hex: '#F1EEE3',
    role: 'Inset panels',
  },
  { name: 'Surface', cssVar: '--color-surface', hex: '#FFFFFF', role: 'Cards' },
  {
    name: 'Sage mist',
    cssVar: '--color-sage-mist',
    hex: '#EAF1E6',
    role: 'Tinted fill',
  },
  { name: 'Sage', cssVar: '--color-sage', hex: '#DCE9D7', role: 'Soft green' },
  {
    name: 'Sage deep',
    cssVar: '--color-sage-deep',
    hex: '#C3DABF',
    role: 'Green border',
  },
  {
    name: 'Forest',
    cssVar: '--color-forest',
    hex: '#426B50',
    role: 'Primary action',
  },
  {
    name: 'Forest deep',
    cssVar: '--color-forest-deep',
    hex: '#33563F',
    role: 'Hover / active',
  },
  { name: 'Moss', cssVar: '--color-moss', hex: '#29372F', role: 'Body text' },
  { name: 'Muted', cssVar: '--color-muted', hex: '#515F55', role: 'Secondary text' },
  {
    name: 'Sunshine',
    cssVar: '--color-sunshine',
    hex: '#F1C76B',
    role: 'Warm accent',
  },
  { name: 'Coral', cssVar: '--color-coral', hex: '#E99A87', role: 'Signal accent' },
  { name: 'Line', cssVar: '--color-line', hex: '#E5E6DC', role: 'Hairline' },
]
