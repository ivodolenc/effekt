import { isNumber } from '@/shared'
import type { DelayFunction } from '@/shared/types'
import type { StaggerOptions, StaggerOrigin } from './types'

const getOriginIndex = (from: StaggerOrigin, total: number): number => {
  if (isNumber(from)) return from
  if (from === 'first') return 0
  const lastIndex = total - 1
  return from === 'last' ? lastIndex : lastIndex / 2
}

/**
 * Creates a `stagger` animation effect.
 *
 * Applies delay based on index, distance from the origin and specified options.
 *
 * This function calculates the delay for each element based on its position relative to others in the sequence,
 * and optionally considers a grid layout and axis-specific distances.
 *
 * The staggered delay is useful for creating animations where elements appear or move in sequence (with delays between them),
 * often seen in UI animations such as grid layouts or lists.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { stagger } from 'effekt/utils'
 *
 * animate('.els', {
 *   // Creates a 0.1 sec default staggered delay
 *   delay: stagger(),
 * })
 * ```
 *
 * If necessary, it's possible to specify some advanced options to further customize the behavior,
 * such as controlling the starting point of the stagger, applying easing functions,
 * or defining a grid layout for more complex animations.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { stagger } from 'effekt/utils'
 * import { spring } from 'effekt/easing'
 *
 * animate('.els', {
 *   // Creates a 0.3 sec staggered delay, starting from the center of a 6x6 grid
 *   // and with a `spring` easing effect
 *   delay: stagger(0.3, { from: 'center', grid: [6, 6], ease: spring() }),
 * })
 * ```
 */
export function stagger(
  duration: number = 0.1,
  options: StaggerOptions = {},
): DelayFunction {
  const { delay: startDelay = 0, from = 0, ease, grid, axis } = options
  const { floor, sqrt, abs } = Math

  const width = grid ? grid[0] : 0
  const height = grid ? grid[1] : 0

  return (i: number, t: number) => {
    const fromIndex = getOriginIndex(from, t)
    const fromCenter = from === 'center'
    let distance = 0

    if (!grid) distance = abs(fromIndex - i)
    else {
      const fromX = fromCenter ? (width - 1) / 2 : fromIndex % width
      const fromY = fromCenter ? (height - 1) / 2 : floor(fromIndex / width)
      const toX = i % width
      const toY = floor(i / width)
      const distanceX = fromX - toX
      const distanceY = fromY - toY
      let value = sqrt(distanceX * distanceX + distanceY * distanceY)
      if (axis === 'x') value = -distanceX
      if (axis === 'y') value = -distanceY
      distance = value
    }

    let delay = duration * distance
    if (ease) {
      const maxDelay = t * duration
      delay = ease(delay / maxDelay) * maxDelay
    }

    return startDelay + delay
  }
}
