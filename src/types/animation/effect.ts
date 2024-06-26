import type { DelayFunction, Easing } from '@/types/shared'

export type AnimationDirection =
  | 'normal'
  | 'reverse'
  | 'alternate'
  | 'alternate-reverse'

export type AnimationPlayState = 'finished' | 'idle' | 'paused' | 'running'

export interface AnimationEffect {
  /**
   * Specifies whether the animation will play automatically when `animate` is called.
   *
   * If disabled, the animation must be explicitly started with the `.play()` method.
   *
   * @default true
   */
  autoplay?: boolean
  /**
   * Specifies the direction in which the animation will run.
   *
   * - `normal` - runs forwards.
   * - `reverse` - runs backwards.
   * - `alternate` - switches direction after each iteration.
   * - `alternate-reverse` - runs backwards and switches direction after each iteration.
   *
   * @default 'normal'
   */
  direction?: AnimationDirection
  /**
   * Specifies the playback rate of the animation.
   *
   * The value can be positive, negative, or 0. Positive values play the animation normally,
   * negative values reverse the animation, and 0 pauses the animation.
   *
   * A positive value is a scaling factor, so for example a value of 2 would double
   * the playback rate and 0.5 would slow it in half.
   *
   * @default 1
   */
  playRate?: number
  /**
   * Specifies the duration of the animation in `seconds`.
   *
   * @default 0.6
   */
  duration?: number
  /**
   * Specifies the number of iterations of the animation.
   *
   * @default 0
   */
  repeat?: number
  /**
   * Specifies the animation `start` delay in `seconds`.
   *
   * For example, 0.3 means the animation will wait that long before starting.
   *
   * @default 0
   */
  delay?: number | DelayFunction
  /**
   * Specifies the animation `end` delay in `seconds`.
   *
   * For example, 0.3 means that the animation will wait that long before it ends completely.
   *
   * @default 0
   */
  endDelay?: number | DelayFunction
  /**
   * Specifies the mathematical function used in the interpolation between the `start` and `end` keyframes.
   *
   * @default outQuart
   */
  ease?: Easing | Easing[]
  /**
   * Specifies `transform` rendering mode.
   *
   * By default, it automatically activates GPU acceleration by applying 3D transforms instead of 2D.
   *
   * When the animation ends or is canceled, the mode reverts back to its initial state to conserve GPU memory.
   *
   * @default true
   */
  force3d?: boolean
}
