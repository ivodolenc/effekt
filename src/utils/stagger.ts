// Inspired by Stagger from Framer Motion, 11.0.8, MIT License, https://github.com/framer/motion
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

import { isNumber } from './is'
import type { StaggerOptions, StaggerOrigin, DelayFunction } from '@/types'

function getOriginIndex(from: StaggerOrigin, total: number): number {
  if (isNumber(from)) return from
  if (from === 'first') return 0
  const lastIndex = total - 1
  return from === 'last' ? lastIndex : lastIndex / 2
}

/**
 * Creates a `stagger` animation effect.
 *
 * @example
 *
 * ```ts
 * import { stagger } from 'effekt'
 *
 * animate('.el', {
 *   delayStart: stagger(),
 * })
 * ```
 */
export function stagger(
  duration: number = 0.1,
  options: StaggerOptions = {},
): DelayFunction {
  const { delay: startDelay = 0, from = 0, ease, grid, axis } = options
  const { floor, sqrt, abs } = Math

  return (i: number, t: number) => {
    const fromIndex = getOriginIndex(from, t)
    const fromCenter = !isNumber(fromIndex) && fromIndex === 'center'
    let distance = 0

    if (!grid) {
      distance = abs(fromIndex - i)
    } else {
      // Inspired by Stagger Grid Option from Anime.js, 3.2.2, MIT License, https://github.com/juliangarnier/anime
      // Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt
      const fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2
      const fromY = !fromCenter ? floor(fromIndex / grid[0]) : (grid[1] - 1) / 2
      const toX = i % grid[0]
      const toY = floor(i / grid[0])
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
