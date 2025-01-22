import type { SpringOptions } from './types'
import type { EasingFunction } from '@/shared/types'

/**
 * Creates a `spring` easing effect.
 *
 * Uses a physics-based spring model to create a smooth, oscillating easing interaction.
 *
 * The function can be applied to animations to simulate the feel of a spring, creating natural,
 * elastic motion that mimics the behavior of a physical spring system.
 *
 * This effect is particularly useful for transitions and dynamic visual feedback in UI animations,
 * such as bouncing buttons, easing between states, or creating an organic 'pulling' effect.
 *
 * The spring's behavior is determined by the parameters `mass`, `stiffness`, `damping`, and `velocity`:
 *
 * - `mass` - controls the mass of the object (affecting how slow or fast the spring moves).
 * - `stiffness` - controls the spring's stiffness (affecting how strongly the spring pulls the object).
 * - `damping` - affects how much the spring's oscillations decrease over time (affecting the smoothness of the movement).
 * - `velocity` - specifies the initial velocity of the spring (how fast the object is moving when the animation starts).
 * - `duration` - overrides the default behavior of calculating the duration based on the spring parameters.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { spring } from 'effekt/easing'
 *
 * animate('.el', {
 *   // Creates a default `spring` easing effect
 *   ease: spring(),
 * })
 * ```
 *
 * Optionally, adjust settings by passing custom options:
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { spring } from 'effekt/easing'
 *
 * animate('.el', {
 *   duration: 2,
 *   // Creates a custom `spring` easing effect based on defined options
 *   ease: spring({ mass: 2, stiffness: 150, damping: 5, velocity: 5 }),
 * })
 * ```
 */
export function spring({
  mass = 1,
  stiffness = 100,
  damping = 10,
  velocity = 0,
  duration,
}: SpringOptions = {}): EasingFunction {
  const { sqrt, exp, cos, sin, abs } = Math
  const w0 = sqrt(stiffness / mass)
  const zeta = damping / (2 * sqrt(stiffness * mass))
  const isUnder = zeta < 1
  const wd = isUnder ? w0 * sqrt(1 - zeta ** 2) : 0
  const b = isUnder ? (zeta * w0 - velocity) / wd : -velocity + w0

  const solver = (t: number): number =>
    1 -
    (isUnder
      ? exp(-t * zeta * w0) * (cos(wd * t) + b * sin(wd * t))
      : (1 + b * t) * exp(-t * w0))

  const step = 1 / 6
  const threshold = 0.001
  const maxSteps = 16

  const isStateReady = (time: number) => abs(1 - solver(time)) < threshold
  const countSteps = (startTime: number) => {
    let currentStep = 1
    for (let t = startTime + step; currentStep < maxSteps; t += step) {
      if (!isStateReady(t)) break
      currentStep++
    }
    return currentStep
  }

  const getDuration = () => {
    if (duration) return duration
    for (let time = 0; ; time += step) {
      if (isStateReady(time) && countSteps(time) === maxSteps) return time
    }
  }

  return (p) => (p === 0 || p === 1 ? p : solver(getDuration() * p))
}
