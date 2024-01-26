import type { RGBA } from '@/types'

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

/**
 * Converts `hsla` to `rgba` color format.
 *
 * @example
 *
 * ```ts
 * import { hslaToRgba } from 'animer'
 *
 * hslaToRgba(75, 100, 60, 1) // => [204, 255, 51, 1]
 * ```
 */
export function hslaToRgba(h: number, s: number, l: number, a: number): RGBA {
  let r: number, g: number, b: number
  h /= 360
  s /= 100
  l /= 100

  if (s === 0) {
    r = g = b = l
  } else {
    const { round } = Math
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = round(hueToRgb(p, q, h + 1 / 3) * 255)
    g = round(hueToRgb(p, q, h) * 255)
    b = round(hueToRgb(p, q, h - 1 / 3) * 255)
  }

  return [r, g, b, a]
}
