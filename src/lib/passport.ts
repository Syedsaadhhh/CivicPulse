import { categoryById } from '@/data/categories'
import { neighbourhoodById } from '@/data/neighbourhoods'
import { ROUND } from '@/data/round'
import { deriveTokens, tokenStage } from '@/state/allocation'
import type { FundedProject } from '@/state/allocation'
import type { CategoryId, ConfirmedBallot, NeighbourhoodId } from '@/types/domain'

/**
 * Everything the passport says, read out of a confirmed ballot. Nothing here
 * stores a total: the numbers come from `deriveTokens`, the same derivation the
 * budget panel and the review use, so the receipt cannot drift from the screen.
 */

/* Picked so a reference read aloud over a demo call still parses. */
const REFERENCE_ALPHABET = '23456789JKHGFMLNPQRSTVWXY'
const REFERENCE_LENGTH = 6

const COUNT_WORDS = ['no', 'one', 'two', 'three', 'four'] as const

export function ballotReference(): string {
  const bytes = new Uint8Array(REFERENCE_LENGTH)
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes)
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256)
    }
  }
  const body = Array.from(bytes, (byte) =>
    REFERENCE_ALPHABET.charAt(byte % REFERENCE_ALPHABET.length),
  ).join('')
  return `HYB-${body.slice(0, 3)}-${body.slice(3)}`
}

export function confirmedAtLabel(iso: string): string {
  const stamp = new Date(iso)
  if (Number.isNaN(stamp.getTime())) {
    return iso
  }
  return stamp.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

export function shortDateLabel(iso: string): string {
  const stamp = new Date(iso)
  if (Number.isNaN(stamp.getTime())) {
    return iso
  }
  return stamp.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

export type PassportRow = {
  readonly id: string
  readonly title: string
  readonly hook: string
  readonly tokens: number
  readonly costTokens: number
  readonly share: number
  readonly stage: ReturnType<typeof tokenStage>
  readonly neighbourhood: string
  readonly category: string
}

export type PassportGroup = {
  readonly id: NeighbourhoodId | CategoryId
  readonly name: string
  readonly tokens: number
  readonly share: number
  readonly ideas: number
}

export type PassportHighlight = {
  readonly idea: string
  readonly label: string
  readonly value: string
}

export type PassportView = {
  readonly reference: string
  readonly confirmedAt: string
  readonly confirmedAtLabel: string
  readonly title: string
  readonly standfirst: string
  readonly budget: number
  readonly placed: number
  readonly remaining: number
  readonly unusedShare: number
  readonly rows: readonly PassportRow[]
  readonly neighbourhoods: readonly PassportGroup[]
  readonly themes: readonly PassportGroup[]
  readonly highlights: readonly PassportHighlight[]
  readonly summary: readonly string[]
}

function countWord(count: number): string {
  return COUNT_WORDS[count] ?? String(count)
}

function capitalize(text: string): string {
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`
}

function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : pluralForm}`
}

function percent(share: number): number {
  return Math.round(share)
}

function groupBy<K>(rows: readonly FundedProject[], key: (project: FundedProject['project']) => K) {
  const groups = new Map<K, { tokens: number; ideas: number }>()
  for (const row of rows) {
    const id = key(row.project)
    const current = groups.get(id) ?? { tokens: 0, ideas: 0 }
    groups.set(id, { tokens: current.tokens + row.tokens, ideas: current.ideas + 1 })
  }
  return groups
}

function toGroups<K extends NeighbourhoodId | CategoryId>(
  groups: Map<K, { tokens: number; ideas: number }>,
  name: (id: K) => string,
  budget: number,
): PassportGroup[] {
  return Array.from(groups, ([id, value]) => ({
    id,
    name: name(id),
    tokens: value.tokens,
    ideas: value.ideas,
    share: (value.tokens / budget) * 100,
  })).sort((a, b) => b.tokens - a.tokens)
}

export function buildPassportView(ballot: ConfirmedBallot): PassportView {
  const totals = deriveTokens(ballot.tokens)
  const { budget, placed, remaining, funded } = totals

  const rows: PassportRow[] = funded.map(({ project, tokens, share }) => ({
    id: project.id,
    title: project.title,
    hook: project.hook,
    tokens,
    costTokens: project.costTokens,
    share,
    stage: tokenStage(tokens, project.costTokens),
    neighbourhood: neighbourhoodById(project.neighbourhoodId).name,
    category: categoryById(project.category).label,
  }))

  const neighbourhoods = toGroups(
    groupBy(funded, (project) => project.neighbourhoodId),
    (id) => neighbourhoodById(id).name,
    budget,
  )
  const themes = toGroups(
    groupBy(funded, (project) => project.category),
    (id) => categoryById(id).label,
    budget,
  )

  const strongest = rows[0]
  const topTheme = themes[0]
  const fullyFunded = rows.filter((row) => row.tokens >= row.costTokens)

  const title =
    neighbourhoods.length === 1 && strongest !== undefined
      ? `The ${strongest.neighbourhood} planting`
      : `${capitalize(countWord(neighbourhoods.length))} neighbourhoods, one planting`

  const summary: string[] = [
    `In the ${ROUND.name}, ${plural(placed, 'token')} of ${budget} went into the ground and ` +
      `${plural(remaining, 'token')} were left unplaced.`,
  ]

  if (topTheme !== undefined && themes.length > 1) {
    const runnerUp = themes[1]
    summary.push(
      `The heaviest planting is ${topTheme.name} at ${topTheme.tokens} tokens ` +
        `(${percent(topTheme.share)}% of the round)` +
        (runnerUp !== undefined
          ? `, then ${runnerUp.name} at ${runnerUp.tokens}.`
          : '.') +
        `${themes.length > 2 ? ` ${capitalize(countWord(themes.length))} kinds of change in all.` : ''}`,
    )
  } else if (topTheme !== undefined) {
    summary.push(
      `Every placed token leans the same way: ${topTheme.name}, ` +
        `${topTheme.tokens} tokens or ${percent(topTheme.share)}% of the round.`,
    )
  }

  if (strongest !== undefined && rows.length > 1) {
    summary.push(
      `${strongest.title} in ${strongest.neighbourhood} holds the largest single share — ` +
        `${strongest.tokens} of ${strongest.costTokens} tokens it asks for, ` +
        `${percent(strongest.share)}% of the whole round.`,
    )
  } else if (strongest !== undefined) {
    summary.push(
      `${strongest.title} in ${strongest.neighbourhood} carries the round on its own — ` +
        `${strongest.tokens} of the ${strongest.costTokens} tokens it asks for.`,
    )
  }

  summary.push(
    fullyFunded.length > 0
      ? `${capitalize(countWord(fullyFunded.length))} ${plural(fullyFunded.length, 'idea', 'ideas')} ` +
          `reached full cost${fullyFunded.length === 1 ? '' : ', the rest were started rather than finished'}.` +
          (remaining > 0
            ? ` ${remaining} ${remaining === 1 ? 'token' : 'tokens'} stayed in hand, which is a decision too.`
            : '')
      : `Nothing was funded to its full cost: the round was spread across ` +
        `${countWord(rows.length)} ideas instead${remaining > 0 ? `, with ${remaining} left unplaced` : ''}.`,
  )

  const highlights: PassportHighlight[] = []
  for (const row of rows.slice(0, 3)) {
    const fundedRow = funded.find((entry) => entry.project.id === row.id)
    const impact = fundedRow?.project.impacts[0]
    if (impact !== undefined) {
      highlights.push({ idea: row.title, label: impact.label, value: impact.value })
    }
  }

  return {
    reference: ballot.reference,
    confirmedAt: ballot.confirmedAt,
    confirmedAtLabel: confirmedAtLabel(ballot.confirmedAt),
    title,
    standfirst: `${plural(placed, 'token')} planted on ${plural(rows.length, 'idea', 'ideas')}`,
    budget,
    placed,
    remaining,
    unusedShare: (remaining / budget) * 100,
    rows,
    neighbourhoods,
    themes,
    highlights,
    summary,
  }
}

/** The one line used on the sheet and in the plain-text receipt. */
export const DEMO_NOTICE =
  'Demonstration ballot. Confirmed inside the CivicPulse demo only — there is no civic ' +
  'backend in this build, so nothing was sent, counted, stored or verified anywhere.'

export function receiptFileName(view: PassportView, extension: 'txt' | 'json'): string {
  return `civicpulse-passport-${view.reference.toLowerCase()}.${extension}`
}

export function receiptText(view: PassportView): string {
  const line = '='.repeat(64)
  const thin = '-'.repeat(64)
  const out: string[] = [
    line,
    'CIVICPULSE — COMMUNITY IMPACT PASSPORT',
    `${view.title} · ${ROUND.name}`,
    line,
    '',
    'DEMONSTRATION SUBMISSION — NOT AN OFFICIAL CIVIC BALLOT',
    '',
    `Ballot reference   ${view.reference}`,
    `Confirmed          ${view.confirmedAtLabel}`,
    `Neighbourhoods     ${view.neighbourhoods.map((g) => `${g.name} (${g.tokens})`).join(', ')}`,
    '',
    thin,
    'WHERE THE TOKENS WENT',
    thin,
  ]

  for (const row of view.rows) {
    // Idea names are not truncated: a receipt that cuts a project's name in
    // half no longer matches what the visitor confirmed.
    out.push(
      `${String(row.tokens).padStart(4)} tokens  ${`${percent(row.share)}%`.padStart(4)}  ${row.title}`,
      `${' '.repeat(19)}${row.category} · ${row.neighbourhood}`,
    )
  }

  out.push(
    thin,
    'TOTALS',
    thin,
    `   ${String(view.budget).padStart(4)} tokens in the round`,
    `   ${String(view.placed).padStart(4)} allocated`,
    `   ${String(view.remaining).padStart(4)} unused`,
    '',
    'SUMMARY',
    ...view.summary.map((sentence) => `  ${sentence}`),
    '',
  )

  if (view.highlights.length > 0) {
    out.push('NAMED CHANGES ON THESE IDEAS')
    for (const highlight of view.highlights) {
      out.push(`  ${highlight.idea} — ${highlight.label}: ${highlight.value}`)
    }
    out.push('')
  }

  out.push(thin, DEMO_NOTICE, `Data note: ${ROUND.dataNotice}`, line, '')
  return out.join('\n')
}

export function receiptJson(view: PassportView): string {
  return `${JSON.stringify(
    {
      kind: 'civicpulse.community-impact-passport',
      version: 1,
      demo: true,
      official: false,
      deliveredTo: null,
      storedOnLedger: false,
      round: { name: ROUND.name, tokenBudget: view.budget, dataNotice: ROUND.dataNotice },
      ballot: {
        reference: view.reference,
        title: view.title,
        confirmedAt: view.confirmedAt,
        confirmedAtLabel: view.confirmedAtLabel,
      },
      totals: {
        budget: view.budget,
        allocated: view.placed,
        unused: view.remaining,
      },
      neighbourhoods: view.neighbourhoods.map((group) => ({
        id: group.id,
        name: group.name,
        tokens: group.tokens,
        ideas: group.ideas,
        shareOfRound: Number(group.share.toFixed(2)),
      })),
      themes: view.themes.map((group) => ({
        id: group.id,
        name: group.name,
        tokens: group.tokens,
        ideas: group.ideas,
        shareOfRound: Number(group.share.toFixed(2)),
      })),
      allocations: view.rows.map((row) => ({
        projectId: row.id,
        title: row.title,
        neighbourhood: row.neighbourhood,
        category: row.category,
        tokens: row.tokens,
        costTokens: row.costTokens,
        shareOfRound: Number(row.share.toFixed(2)),
        stage: row.stage,
      })),
      summary: view.summary,
      notice: DEMO_NOTICE,
    },
    null,
    2,
  )}\n`
}

export type FileResult = { readonly ok: boolean; readonly message: string }

/** Browser download through an object URL — no dependency, no server. */
export function downloadReceipt(fileName: string, text: string, mime: string): FileResult {
  try {
    const url = URL.createObjectURL(new Blob([text], { type: `${mime};charset=utf-8` }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName
    anchor.rel = 'noopener'
    anchor.style.display = 'none'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 2000)
    return { ok: true, message: `Saved ${fileName}` }
  } catch {
    return { ok: false, message: 'This browser blocked the download. Copy the summary instead.' }
  }
}

export function clipboardAvailable(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    window.isSecureContext &&
    typeof navigator.clipboard?.writeText === 'function'
  )
}

export async function copyReceipt(text: string): Promise<FileResult> {
  if (!clipboardAvailable()) {
    return {
      ok: false,
      message: 'Clipboard needs a secure context. Use the download instead.',
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    return { ok: true, message: 'Ballot summary copied' }
  } catch {
    return { ok: false, message: 'The browser refused clipboard access. Use the download instead.' }
  }
}
