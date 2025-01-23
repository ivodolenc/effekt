/**
 * Converts `seconds` to `milliseconds`.
 *
 * @example
 *
 * ```ts
 * import { secToMs } from 'effekt/utils'
 *
 * secToMs(1) // Returns 1000
 * ```
 */
export function secToMs(seconds: number): number {
  return seconds * 1000
}

/**
 * Converts `milliseconds` to `seconds`.
 *
 * @example
 *
 * ```ts
 * import { msToSec } from 'effekt/utils'
 *
 * msToSec(1000)  // Returns 1
 * ```
 */
export function msToSec(milliseconds: number): number {
  return milliseconds / 1000
}
