/**
 * Linearly interpolates between the `from` and `to` values, based on `progress`.
 *
 * @example
 *
 * ```ts
 * import { mix } from 'animer'
 *
 * mix(0, 150, 0.5) // => 75
 * ```
 */
export function mix(from: number, to: number, progress: number): number {
  return -progress * from + progress * to + from
}
