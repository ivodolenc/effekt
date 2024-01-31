import { easingOut, easingInOut, easingOutIn } from './modifiers'
import type { Easing } from '@/types'

const quad: Easing = (p) => Math.pow(p, 2)
const cubic: Easing = (p) => Math.pow(p, 3)
const quart: Easing = (p) => Math.pow(p, 4)
const quint: Easing = (p) => Math.pow(p, 5)
const expo: Easing = (p) => Math.pow(p, 6)
const sine: Easing = (p) => 1 - Math.cos((p * Math.PI) / 2)
const circ: Easing = (p) => 1 - Math.sqrt(1 - p * p)
const back: Easing = (p) => p * p * (3 * p - 2)
const bounce: Easing = (p) => {
  const { pow } = Math
  let pow2, noop
  let b = 4
  while (p < ((pow2 = pow(2, --b)) - 1) / 11) noop
  return 1 / pow(4, 3 - b) - 7.5625 * pow((pow2 * 3 - 2) / 22 - p, 2)
}
const elastic = (amplitude = 1, period = 0.5): Easing => {
  const { PI, pow, sin, asin } = Math
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
 * Creates a `linear` easing effect.
 *
 * @example
 *
 * ```ts
 * import { linear } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: linear,
 * })
 * ```
 */
export const linear: Easing = (p) => p

/**
 * Creates a `in-quad` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inQuad } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inQuad,
 * })
 * ```
 */
export const inQuad = quad

/**
 * Creates a `outQuad` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outQuad } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outQuad,
 * })
 * ```
 */
export const outQuad = easingOut(quad)

/**
 * Creates a `in-out-quad` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutQuad } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutQuad,
 * })
 * ```
 */
export const inOutQuad = easingInOut(quad)

/**
 * Creates a `out-in-quad` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInQuad } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInQuad,
 * })
 * ```
 */
export const outInQuad = easingOutIn(quad)

/**
 * Creates a `in-cubic` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inCubic } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inCubic,
 * })
 * ```
 */
export const inCubic = cubic

/**
 * Creates a `out-cubic` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outCubic } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outCubic,
 * })
 * ```
 */
export const outCubic = easingOut(cubic)

/**
 * Creates a `in-out-cubic` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutCubic } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutCubic,
 * })
 * ```
 */
export const inOutCubic = easingInOut(cubic)

/**
 * Creates a `out-in-cubic` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInCubic } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInCubic,
 * })
 * ```
 */
export const outInCubic = easingOutIn(cubic)

/**
 * Creates a `in-quart` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inQuart } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inQuart,
 * })
 * ```
 */
export const inQuart = quart

/**
 * Creates a `out-quart` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outQuart } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outQuart,
 * })
 * ```
 */
export const outQuart = easingOut(quart)

/**
 * Creates a `in-out-quart` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutQuart } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutQuart,
 * })
 * ```
 */
export const inOutQuart = easingInOut(quart)

/**
 * Creates a `out-in-quart` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInQuart } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInQuart,
 * })
 * ```
 */
export const outInQuart = easingOutIn(quart)

/**
 * Creates a `in-quint` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inQuint } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inQuint,
 * })
 * ```
 */
export const inQuint = quint

/**
 * Creates a `out-quint` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outQuint } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outQuint,
 * })
 * ```
 */
export const outQuint = easingOut(quint)

/**
 * Creates a `in-out-quint` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutQuint } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutQuint,
 * })
 * ```
 */
export const inOutQuint = easingInOut(quint)

/**
 * Creates a `out-in-quint` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInQuint } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInQuint,
 * })
 * ```
 */
export const outInQuint = easingOutIn(quint)

/**
 * Creates a `in-expo` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inExpo } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inExpo,
 * })
 * ```
 */
export const inExpo = expo

/**
 * Creates a `out-expo` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outExpo } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outExpo,
 * })
 * ```
 */
export const outExpo = easingOut(expo)

/**
 * Creates a `in-out-expo` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutExpo } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutExpo,
 * })
 * ```
 */
export const inOutExpo = easingInOut(expo)

/**
 * Creates a `out-in-expo` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInExpo } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInExpo,
 * })
 * ```
 */
export const outInExpo = easingOutIn(expo)

/**
 * Creates a `in-sine` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inSine } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inSine,
 * })
 * ```
 */
export const inSine = sine

/**
 * Creates a `out-sine` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outSine } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outSine,
 * })
 * ```
 */
export const outSine = easingOut(sine)

/**
 * Creates a `in-out-sine` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutSine } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutSine,
 * })
 * ```
 */
export const inOutSine = easingInOut(sine)

/**
 * Creates a `out-in-sine` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInSine } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInSine,
 * })
 * ```
 */
export const outInSine = easingOutIn(sine)

/**
 * Creates a `in-circ` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inCirc } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inCirc,
 * })
 * ```
 */
export const inCirc = circ

/**
 * Creates a `out-circ` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outCirc } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outCirc,
 * })
 * ```
 */
export const outCirc = easingOut(circ)

/**
 * Creates a `in-out-circ` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutCirc } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutCirc,
 * })
 * ```
 */
export const inOutCirc = easingInOut(circ)

/**
 * Creates a `out-in-circ` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInCirc } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInCirc,
 * })
 * ```
 */
export const outInCirc = easingOutIn(circ)

/**
 * Creates a `in-back` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inBack } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inBack,
 * })
 * ```
 */
export const inBack = back

/**
 * Creates a `out-back` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outBack } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outBack,
 * })
 * ```
 */
export const outBack = easingOut(back)

/**
 * Creates a `in-out-back` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutBack } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutBack,
 * })
 * ```
 */
export const inOutBack = easingInOut(back)

/**
 * Creates a `out-in-back` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInBack } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInBack,
 * })
 * ```
 */
export const outInBack = easingOutIn(back)

/**
 * Creates a `in-bounce` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inBounce } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inBounce,
 * })
 * ```
 */
export const inBounce = bounce

/**
 * Creates a `out-bounce` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outBounce } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outBounce,
 * })
 * ```
 */
export const outBounce = easingOut(bounce)

/**
 * Creates a `in-out-bounce` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutBounce } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutBounce,
 * })
 * ```
 */
export const inOutBounce = easingInOut(bounce)

/**
 * Creates a `out-in-bounce` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInBounce } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInBounce,
 * })
 * ```
 */
export const outInBounce = easingOutIn(bounce)

/**
 * Creates a `in-elastic` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inElastic } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inElastic(),
 * })
 * ```
 */
export const inElastic = (amplitude?: number, period?: number) =>
  elastic(amplitude, period)

/**
 * Creates a `out-elastic` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outElastic } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outElastic(),
 * })
 * ```
 */
export const outElastic = (amplitude?: number, period?: number) =>
  easingOut(elastic(amplitude, period))

/**
 * Creates a `in-out-elastic` easing effect.
 *
 * @example
 *
 * ```ts
 * import { inOutElastic } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: inOutElastic(),
 * })
 * ```
 */
export const inOutElastic = (amplitude?: number, period?: number) =>
  easingInOut(elastic(amplitude, period))

/**
 * Creates a `out-in-elastic` easing effect.
 *
 * @example
 *
 * ```ts
 * import { outInElastic } from 'animer/easing'
 *
 * animate('.el', {
 *   ease: outInElastic(),
 * })
 * ```
 */
export const outInElastic = (amplitude?: number, period?: number) =>
  easingOutIn(elastic(amplitude, period))
