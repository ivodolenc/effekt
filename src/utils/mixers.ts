// Inspired by Mixers from Framer Motion, 11.0.8, MIT License, https://github.com/framer/motion
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

import { pipe } from './pipe'
import { clamp } from './clamp'
import { mix } from './mix'
import { mixColor } from './mix-color'
import { isNumber, isArray } from './is'
import type { Mix, Mixer, MixerType, Easing, RGBA } from '@/types'

function mixerNumber(from: number, to: number): Mix<number> {
  return (p) => mix(from, to, p)
}

function mixerArray(from: number[], to: number[]): Mix<number[]> {
  const fromLength = from.length

  return (p: number) => {
    const mixed: Mix<number>[] = []
    const output: number[] = []

    for (let i = 0; i < fromLength; i++) {
      mixed.push((p) => mix(from[i], to[i], p))
      output[i] = mixed[i](p)
    }

    return output
  }
}

function mixerColor(from: RGBA, to: RGBA): Mix<RGBA> {
  return (p: number) => {
    const mixed: Mix<number>[] = []
    const output: number[] = []
    const { round } = Math
    const alpha = 3

    for (let i = 0; i < alpha; i++) {
      mixed.push((p) => mixColor(from[i], to[i], p))
      output[i] = round(clamp(0, 255, mixed[i](p)))
    }

    mixed.push((p) => mix(from[alpha], to[alpha], p))
    output[alpha] = round(clamp(0, 1, mixed[alpha](p)) * 100000) / 100000

    return output as RGBA
  }
}

function mixerShadow(
  from: (number | RGBA)[],
  to: (number | RGBA)[],
): Mix<(number | RGBA)[]> {
  const fromLength = from.length

  return (p: number) => {
    const mixed: Mix<number | RGBA>[] = []
    const output: (number | RGBA)[] = []

    for (let i = 0; i < fromLength; i++) {
      if (isNumber(from[i])) {
        mixed.push((p) => mix(from[i] as number, to[i] as number, p))
      } else {
        mixed.push((p) => mixerColor(from[i] as RGBA, to[i] as RGBA)(p))
      }

      output[i] = mixed[i](p)
    }

    return output
  }
}

function getMixerType<T>(
  value: T,
  options: {
    type?: MixerType
  } = {},
): Mixer<any> {
  if (options.type === 'color') return mixerColor
  if (options.type === 'shadow') return mixerShadow
  if (isArray(value)) return mixerArray
  return mixerNumber
}

export function createMixers<T>(
  values: T[],
  options: {
    ease?: Easing | Easing[]
    type?: MixerType
  } = {},
): Mix<T>[] {
  const { ease, type } = options
  const mixers: Mix<T>[] = []
  const mixersLength = values.length - 1
  const getMixer = getMixerType(values[0], { type })

  for (let i = 0; i < mixersLength; i++) {
    let mixer = getMixer(values[i], values[i + 1])

    if (ease) {
      const easing = isArray(ease) ? ease[i] : ease
      mixer = pipe(easing, mixer)
    }

    mixers.push(mixer)
  }

  return mixers
}
