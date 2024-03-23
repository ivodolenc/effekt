// Inspired by Interpolate from Framer Motion, 11.0.8, MIT License, https://github.com/framer/motion
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

import { progress } from './progress'
import { createMixers } from './mixers'
import type { Mix, Easing } from '@/types'

/**
 * Creates a linear interpolation from a series of `values`
 * and custom effects, based on `progress`.
 *
 * @example
 *
 * ```ts
 * import { interpolate } from 'effekt'
 *
 * const from = [255, 0, 0, 0]
 * const to = [0, 255, 0, 1]
 *
 * interpolate([from, to], [0, 1])(0.5) // => [127.5, 127.5, 0, 0.5]
 * ```
 */
export function interpolate<T>(
  values: T[],
  offset: number[],
  options: {
    ease?: Easing | Easing[]
    color?: boolean
  } = {},
): Mix<T> {
  const offsetLength = offset.length
  const lastOffsetIndex = offsetLength - 1

  if (offset[0] > offset[lastOffsetIndex]) {
    offset = [...offset].reverse()
    values = [...values].reverse()
  }

  const mixers = createMixers(values, options)
  const mixersLength = mixers.length

  return (p) => {
    let i = 0
    if (mixersLength > 1) {
      for (; i < offsetLength - 2; i++) {
        if (p < offset[i + 1]) break
      }
    }
    const progressor = progress(offset[i], offset[i + 1], p)

    return mixers[i](progressor)
  }
}
