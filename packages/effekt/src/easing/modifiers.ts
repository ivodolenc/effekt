import type { EasingModifier } from './types'

/**
 * Creates a `reverse` easing modifier.
 *
 * Turns `ease-in` into `ease-out` effect.
 *
 * @example
 *
 * ```ts
 * import { easingOut } from 'effekt/easing'
 *
 * const easeOut = easingOut(easeIn)
 * ```
 */
export const easingOut: EasingModifier = (easing) => (progress) =>
  1 - easing(1 - progress)

/**
 * Creates a `mirror` easing modifier.
 *
 * Turns `ease-in` into `ease-in-out` effect.
 *
 * @example
 *
 * ```ts
 * import { easingInOut } from 'effekt/easing'
 *
 * const easeInOut = easingInOut(easeIn)
 * ```
 */
export const easingInOut: EasingModifier = (easing) => (progress) =>
  progress < 0.5 ? easing(progress * 2) / 2 : 1 - easing(progress * -2 + 2) / 2

/**
 * Creates a `reverse-mirror` easing modifier.
 *
 * Turns `ease-in` into `ease-out-in` effect.
 *
 * @example
 *
 * ```ts
 * import { easingOutIn } from 'effekt/easing'
 *
 * const easeOutIn = easingOutIn(easeIn)
 * ```
 */
export const easingOutIn: EasingModifier = (easing) => (progress) =>
  progress < 0.5
    ? (1 - easing(1 - progress * 2)) / 2
    : (easing(progress * 2 - 1) + 1) / 2
