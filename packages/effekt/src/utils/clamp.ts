/**
 * Clamps a value between a specified minimum and maximum.
 *
 * Ensures that the given `value` will not be smaller than `min` or greater than `max`.
 *
 * It returns the `value` if it is within the range, otherwise, it returns the nearest boundary (`min` or `max`).
 *
 * @example
 *
 * ```ts
 * import { clamp } from 'effekt/utils'
 *
 * // Clamps the value 10 between 1 and 5, returns 5
 * clamp(1, 5, 10)
 * // Clamps the value -3 between 0 and 5, returns 0
 * clamp(0, 5, -3)
 * // No change, as 3 is between 1 and 5, returns 3
 * clamp(1, 5, 3)
 * ```
 */
export function clamp(min: number, max: number, value: number): number {
  return Math.min(Math.max(value, min), max)
}
