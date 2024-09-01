/**
 * Recalculates progress between the `from` and `to` values, based on specified `value`.
 *
 * @example
 *
 * ```ts
 * import { progress } from 'effekt'
 *
 * progress(0, 100, 30) // => 0.3
 * ```
 */
export function progress(from: number, to: number, value: number): number {
  const difference = to - from
  return difference === 0 ? 1 : (value - from) / difference
}
