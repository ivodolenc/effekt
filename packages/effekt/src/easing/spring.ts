// Inspired by Spring Code from Linear Easing Generator, 1.0.0, Apache-2.0 License, https://github.com/jakearchibald/linear-easing-generator
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

import type { Easing } from '@/types'
import type { SpringOptions } from '@/types/easing'

/**
 * Creates a `spring` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { spring } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: spring(),
 * })
 * ```
 */
export function spring({
  mass = 1,
  stiffness = 100,
  damping = 10,
  velocity = 0,
  duration,
}: SpringOptions = {}): Easing {
  const { sqrt, exp, cos, sin, abs } = Math
  const w0 = sqrt(stiffness / mass)
  const zeta = damping / (2 * sqrt(stiffness * mass))
  const wd = zeta < 1 ? w0 * sqrt(1 - zeta * zeta) : 0
  const b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0

  const solver = (t: number): number => {
    if (zeta < 1) t = exp(-t * zeta * w0) * (1 * cos(wd * t) + b * sin(wd * t))
    else t = (1 + b * t) * exp(-t * w0)
    return 1 - t
  }

  const getDuration = () => {
    if (duration) return duration

    const step = 1 / 6
    let time = 0
    const isTrue = true

    while (isTrue) {
      if (abs(1 - solver(time)) < 0.001) {
        const restStart = time
        let restSteps = 1
        while (isTrue) {
          time += step
          if (abs(1 - solver(time)) >= 0.001) break
          restSteps++
          if (restSteps === 16) return restStart
        }
      }
      time += step
    }

    return time
  }

  return (p) => (p === 0 || p === 1 ? p : solver(getDuration() * p))
}
