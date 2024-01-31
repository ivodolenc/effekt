import { isNumber } from './is'
import type { StaggerOptions, StaggerOrigin } from '@/types'
import type { DelayFunction } from '@/types/animation'

function getOriginIndex(from: StaggerOrigin, total: number): number {
  if (from === 'first') return 0
  else {
    const lastIndex = total - 1
    return from === 'last' ? lastIndex : lastIndex / 2
  }
}

/**
 * Creates a `stagger` animation effect.
 *
 * @example
 *
 * ```ts
 * import { stagger } from 'animer'
 *
 * animate('.el', {
 *   delayStart: stagger(),
 * })
 * ```
 */
export function stagger(
  duration: number = 0.1,
  { delay = 0, from = 0 }: StaggerOptions = {},
): DelayFunction {
  return (i: number, t: number) => {
    const fromIndex = isNumber(from) ? from : getOriginIndex(from, t)
    const distance = Math.abs(fromIndex - i)

    return delay + duration * distance
  }
}
