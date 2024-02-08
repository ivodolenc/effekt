/**
 * Linearly interpolates color between the `from` and `to` values, based on `progress`.
 *
 * @example
 *
 * ```ts
 * import { mixColor } from 'effekt'
 *
 * mixColor(0, 100, 0.3) // => 54.772
 * ```
 */
export function mixColor(from: number, to: number, progress: number): number {
  const fromExpo = from * from
  return Math.sqrt(Math.max(0, progress * (to * to - fromExpo) + fromExpo))
}
