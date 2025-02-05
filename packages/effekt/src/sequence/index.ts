import { createSequence } from './sequence'
import type { Sequence, SequenceAnimation, SequenceOptions } from './types'

/**
 * Creates a new `Sequence` object that plays animations in a specified order.
 *
 * The `sequence` function allows you to chain multiple animations with precise control and synchronization of each step in the sequence.
 *
 * Ensures that animations are played sequentially, with the ability to define other properties and methods to manage the flow of the animations.
 *
 * @example
 *
 * ```ts
 * import { sequence } from 'effekt/sequence'
 *
 * const sq = sequence([
 *   ['.el1', { opacity: [1, 0.5] }],
 *   ['.el2', { opacity: [0.5, 1] }],
 * ])
 *
 * sq.play() // Plays the sequence
 * ```
 */
export function sequence(
  animations: SequenceAnimation[],
  options?: SequenceOptions,
): Sequence {
  return createSequence(animations, options)
}
