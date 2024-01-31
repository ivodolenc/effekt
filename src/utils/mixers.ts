import { pipe } from './pipe'
import { clamp } from './clamp'
import { mix } from './mix'
import { mixColor } from './mix-color'
import { isArray } from './is'
import type { Mix, Mixer, Easing, RGBA } from '@/types'

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

function getMixerType<T>(value: T, color: boolean = false): Mixer<any> {
  if (color) return mixerColor
  if (isArray(value)) return mixerArray
  return mixerNumber
}

export function createMixers<T>(
  values: T[],
  options: {
    ease?: Easing | Easing[]
    color?: boolean
  } = {},
): Mix<T>[] {
  const { ease, color } = options
  const mixers: Mix<T>[] = []
  const mixersLength = values.length - 1
  const getMixer = getMixerType(values[0], color)

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
