/**
 * Rounds a number to a specified number of decimal places.
 *
 * @example
 *
 * ```ts
 * import { round } from 'effekt/utils'
 *
 * round(3.14159, 2) // Returns 3.14
 * round(3.14159, 3) // Returns 3.142
 * round(5.5555, 2) // Returns 5.56
 * round(1.987654, 4) // Returns 1.9877
 * ```
 */
export function round(number: number, precision: number = 2): number {
  precision = 10 ** precision
  return Math.round(number * precision) / precision
}
