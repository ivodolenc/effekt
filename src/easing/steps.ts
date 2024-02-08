import { clamp } from '@/utils'
import type { Easing } from '@/types'

/**
 * Creates a `steps` easing effect.
 *
 * @example
 *
 * ```ts
 * import { steps } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: steps(3),
 * })
 * ```
 */
export function steps(
  intervals: number,
  position: 'start' | 'end' = 'end',
): Easing {
  const round = position === 'end' ? Math.floor : Math.ceil

  return (p) => clamp(0, 1, round(p * intervals) / intervals)
}
