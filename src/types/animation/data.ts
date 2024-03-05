import type { AnimationEffect, AnimationPlayState } from './effect'

export interface AnimationData extends Required<Omit<AnimationEffect, 'ease'>> {
  /**
   * Specifies the playback state of the animation.
   */
  playState: AnimationPlayState
  /**
   * Specifies the state of the animation Promise.
   */
  promiseState: 'pending' | 'fulfilled' | 'rejected'
  /**
   * Specifies the playback rate of the animation.
   */
  playRate: number
  /**
   * Specifies the animation `start` delay in `seconds`.
   *
   * For example, `0.3` means the animation will wait that long before starting.
   *
   * @default 0
   */
  delayStart: number
  /**
   * Specifies the animation `end` delay in `seconds`.
   *
   * For example, `0.3` means that the animation will wait that long before it ends completely.
   *
   * @default 0
   */
  delayEnd: number
  /**
   * Specifies time since last frame.
   *
   * @default 0
   */
  delta: number
  /**
   * Specifies timestamp of the current frame.
   *
   * @default 0
   */
  timestamp: number
  /**
   * Specifies the time of the animation.
   */
  time: number
  /**
   * Specifies the initial time at the very beginning of the animation.
   */
  initTime: number
  /**
   * Specifies the start time of the animation.
   */
  startTime: number
  /**
   * Specifies the pause time of the animation.
   */
  pauseTime: number | null
  /**
   * Specifies the total duration of the animation.
   *
   * `duration` * `repeat`
   */
  totalDuration: number
  /**
   * Specifies the progress of the animation (0 to 1).
   */
  progress: number
  /**
   * Specifies the total progress of the animation (1 or 0).
   *
   * - `1` is for `normal` direction
   * - `0` is for `reverse` direction
   */
  totalProgress: number
  /**
   * Specifies the reverse mode.
   */
  reverseMode: boolean
  /**
   * Specifies the reverse time.
   */
  reverseTime: number
}

export type AnimationPromise = Promise<AnimationData>
