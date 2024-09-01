/**
 * Clamps a value within a range of `min` and `max` values.
 *
 * @example
 *
 * ```ts
 * import { clamp } from 'effekt'
 *
 * clamp(0, 100, 60) // => 60
 * ```
 */
export function clamp(min: number, max: number, value: number): number {
  return Math.min(Math.max(value, min), max)
}
