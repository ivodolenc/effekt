import { createAnimation } from '@/animation'
import type {
  Animation,
  AnimationTargets,
  AnimationOptions,
} from '@/animation/types'

/**
 * Creates a new `Animation` object with powerful controls for advanced manipulations on specified DOM targets.
 *
 * Provides the flexibility to design complex and dynamic animations, which can be played, paused, reversed, or even stopped programmatically,
 * enabling highly responsive interactions that can be synchronized with other events or actions.
 *
 * Supports multiple targets and a wide range of custom options, offering fine-grained control to easily run animations with minimal effort.
 *
 * @example
 *
 * ```ts
 * import { animate } from 'effekt'
 *
 * animate('.el', {
 *   x: [0, 600, 300],
 *   background: ['#cf3', '#0df'],
 *   duration: 1,
 * })
 * ```
 *
 * @see [Repository](https://github.com/effekt-labs/effekt)
 */
export function animate(
  targets: AnimationTargets,
  options: AnimationOptions,
): Animation {
  return createAnimation(targets, options)
}
