import type { RGBA } from '@/types'

/**
 * Converts `hex` to `rgba` color format.
 *
 * ```ts
 * import { hexToRgba } from 'effekt'
 *
 * hexToRgba('#fff') // => [255, 255, 255, 1]
 * hexToRgba('#ffffff33') // => [255, 255, 255, 0.2]
 * ```
 */
export function hexToRgba(hex: string): RGBA {
  let v = hex.slice(1)

  if (v.length === 3) {
    v = `${v[0]}${v[0]}${v[1]}${v[1]}${v[2]}${v[2]}`
  }

  const r = parseInt(v.slice(0, 2), 16)
  const g = parseInt(v.slice(2, 4), 16)
  const b = parseInt(v.slice(4, 6), 16)
  const a = parseInt(v.slice(6, 8), 16) / 255 || 1

  return [r, g, b, a]
}
