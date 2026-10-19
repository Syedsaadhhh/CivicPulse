export type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ReadonlyArray<ClassValue>

function collect(value: ClassValue, into: string[]): void {
  if (!value) return

  if (Array.isArray(value)) {
    for (const entry of value) collect(entry, into)
    return
  }

  into.push(String(value))
}

/**
 * Composes conditional class names. Deliberately dependency-free: variants are
 * keyed by literal unions so consumers never pass conflicting utilities.
 */
export function cn(...classes: ClassValue[]): string {
  const collected: string[] = []
  collect(classes, collected)
  return collected.join(' ')
}
