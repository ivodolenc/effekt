/**
 * Calculates the normalized progress between two numbers.
 *
 * This function returns a value between 0 and 1, representing how far along the `value` is between `from` and `to`.
 *
 * If `value` is equal to `from`, the progress will be 0. If `value` is equal to `to`, the progress will be 1.
 *
 * If `from` and `to` are the same, the function will return 1, as there's no progress to be made.
 *
 * @example
 *
 * ```ts
 * import { progress } from 'effekt/utils'
 *
 * progress(0, 100, 50) // Progress between 0 and 100 when value is 50, returns 0.5
 * progress(10, 20, 10) // Progress between 10 and 20 when value is 10 (at the start), returns 0
 * progress(10, 20, 20) // Progress between 10 and 20 when value is 20 (at the end), returns 1
 * progress(10, 10, 10) // Progress when from and to are the same, returns 1
 * ```
 */
export function progress(from: number, to: number, value: number): number {
  const difference = to - from
  return difference === 0 ? 1 : (value - from) / difference
}
