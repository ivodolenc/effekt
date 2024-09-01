/**
 * Rounds a number with a specified precision.
 *
 * @example
 *
 * ```ts
 * import { round } from 'effekt'
 *
 * round(32.997633923673) // => 33
 * ```
 */
export function round(number: number, precision: number = 2) {
  precision = 10 ** precision
  return Math.round(number * precision) / precision
}
