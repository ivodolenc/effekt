import { noop } from '@/shared'
import { easingOut, easingInOut, easingOutIn } from './modifiers'
import type { EasingFunction } from '@/shared/types'

const { pow, cos, sqrt, sin, asin, PI } = Math

const quad: EasingFunction = (p) => pow(p, 2)
const cubic: EasingFunction = (p) => pow(p, 3)
const quart: EasingFunction = (p) => pow(p, 4)
const quint: EasingFunction = (p) => pow(p, 5)
const expo: EasingFunction = (p) => pow(p, 6)
const sine: EasingFunction = (p) => 1 - cos((p * PI) / 2)
const circ: EasingFunction = (p) => 1 - sqrt(1 - p * p)
const back: EasingFunction = (p) => p * p * (3 * p - 2)
const bounce: EasingFunction = (p) => {
  let pow2
  let b = 4
  while (p < ((pow2 = pow(2, --b)) - 1) / 11) noop()
  return 1 / pow(4, 3 - b) - 7.5625 * pow((pow2 * 3 - 2) / 22 - p, 2)
}
const elastic = (amplitude = 1, period = 0.5): EasingFunction => {
  const amp = amplitude <= 1 ? 1 : amplitude >= 10 ? 10 : amplitude
  const per = period <= 0.1 ? 0.1 : period >= 2 ? 2 : period
  const pi2 = PI * 2

  return (p) =>
    p === 0 || p === 1
      ? p
      : -amp *
        pow(2, 10 * (p - 1)) *
        sin(((p - 1 - (per / pi2) * asin(1 / amp)) * pi2) / per)
}

/**
 * Creates a `quad-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quadIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quadIn,
 * })
 * ```
 */
export const quadIn = quad

/**
 * Creates a `quadOut` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quadOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quadOut,
 * })
 * ```
 */
export const quadOut = easingOut(quad)

/**
 * Creates a `quad-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quadInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quadInOut,
 * })
 * ```
 */
export const quadInOut = easingInOut(quad)

/**
 * Creates a `quad-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quadOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quadOutIn,
 * })
 * ```
 */
export const quadOutIn = easingOutIn(quad)

/**
 * Creates a `cubic-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { cubicIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: cubicIn,
 * })
 * ```
 */
export const cubicIn = cubic

/**
 * Creates a `cubic-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { cubicOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: cubicOut,
 * })
 * ```
 */
export const cubicOut = easingOut(cubic)

/**
 * Creates a `cubic-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { cubicInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: cubicInOut,
 * })
 * ```
 */
export const cubicInOut = easingInOut(cubic)

/**
 * Creates a `cubic-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { cubicOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: cubicOutIn,
 * })
 * ```
 */
export const cubicOutIn = easingOutIn(cubic)

/**
 * Creates a `quart-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quartIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quartIn,
 * })
 * ```
 */
export const quartIn = quart

/**
 * Creates a `quart-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quartOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quartOut,
 * })
 * ```
 */
export const quartOut = easingOut(quart)

/**
 * Creates a `quart-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quartInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quartInOut,
 * })
 * ```
 */
export const quartInOut = easingInOut(quart)

/**
 * Creates a `quart-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quartOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quartOutIn,
 * })
 * ```
 */
export const quartOutIn = easingOutIn(quart)

/**
 * Creates a `quint-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quintIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quintIn,
 * })
 * ```
 */
export const quintIn = quint

/**
 * Creates a `quint-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quintOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quintOut,
 * })
 * ```
 */
export const quintOut = easingOut(quint)

/**
 * Creates a `quint-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quintInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quintInOut,
 * })
 * ```
 */
export const quintInOut = easingInOut(quint)

/**
 * Creates a `quint-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { quintOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: quintOutIn,
 * })
 * ```
 */
export const quintOutIn = easingOutIn(quint)

/**
 * Creates a `expo-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { expoIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: expoIn,
 * })
 * ```
 */
export const expoIn = expo

/**
 * Creates a `expo-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { expoOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: expoOut,
 * })
 * ```
 */
export const expoOut = easingOut(expo)

/**
 * Creates a `expo-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { expoInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: expoInOut,
 * })
 * ```
 */
export const expoInOut = easingInOut(expo)

/**
 * Creates a `expo-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { expoOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: expoOutIn,
 * })
 * ```
 */
export const expoOutIn = easingOutIn(expo)

/**
 * Creates a `sine-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { sineIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: sineIn,
 * })
 * ```
 */
export const sineIn = sine

/**
 * Creates a `sine-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { sineOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: sineOut,
 * })
 * ```
 */
export const sineOut = easingOut(sine)

/**
 * Creates a `sine-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { sineInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: sineInOut,
 * })
 * ```
 */
export const sineInOut = easingInOut(sine)

/**
 * Creates a `sine-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { sineOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: sineOutIn,
 * })
 * ```
 */
export const sineOutIn = easingOutIn(sine)

/**
 * Creates a `circ-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { circIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: circIn,
 * })
 * ```
 */
export const circIn = circ

/**
 * Creates a `circ-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { circOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: circOut,
 * })
 * ```
 */
export const circOut = easingOut(circ)

/**
 * Creates a `circ-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { circInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: circInOut,
 * })
 * ```
 */
export const circInOut = easingInOut(circ)

/**
 * Creates a `circ-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { circOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: circOutIn,
 * })
 * ```
 */
export const circOutIn = easingOutIn(circ)

/**
 * Creates a `back-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { backIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: backIn,
 * })
 * ```
 */
export const backIn = back

/**
 * Creates a `back-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { backOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: backOut,
 * })
 * ```
 */
export const backOut = easingOut(back)

/**
 * Creates a `back-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { backInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: backInOut,
 * })
 * ```
 */
export const backInOut = easingInOut(back)

/**
 * Creates a `back-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { backOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: backOutIn,
 * })
 * ```
 */
export const backOutIn = easingOutIn(back)
/**
 * Creates a `bounce-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { bounceIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: bounceIn,
 * })
 * ```
 */
export const bounceIn = bounce

/**
 * Creates a `bounce-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { bounceOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: bounceOut,
 * })
 * ```
 */
export const bounceOut = easingOut(bounce)

/**
 * Creates a `bounce-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { bounceInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: bounceInOut,
 * })
 * ```
 */
export const bounceInOut = easingInOut(bounce)

/**
 * Creates a `bounce-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { bounceOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: bounceOutIn,
 * })
 * ```
 */
export const bounceOutIn = easingOutIn(bounce)

/**
 * Creates a `elastic-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { elasticIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: elasticIn(),
 * })
 * ```
 */
export const elasticIn = (amplitude?: number, period?: number) =>
  elastic(amplitude, period)

/**
 * Creates a `elastic-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { elasticOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: elasticOut(),
 * })
 * ```
 */
export const elasticOut = (amplitude?: number, period?: number) =>
  easingOut(elastic(amplitude, period))

/**
 * Creates a `elastic-in-out` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { elasticInOut } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: elasticInOut(),
 * })
 * ```
 */
export const elasticInOut = (amplitude?: number, period?: number) =>
  easingInOut(elastic(amplitude, period))

/**
 * Creates a `elastic-out-in` easing effect.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 * import { elasticOutIn } from 'effekt/easing'
 *
 * animate('.el', {
 *   ease: elasticOutIn(),
 * })
 * ```
 */
export const elasticOutIn = (amplitude?: number, period?: number) =>
  easingOutIn(elastic(amplitude, period))
