import type { AnimationData } from './data'

export interface AnimationMethods {
  /**
   * Called at the beginning of the animation.
   *
   * @default undefined
   */
  onStart?(data: AnimationData): void
  /**
   * Called every time the animation starts.
   *
   * @default undefined
   */
  onPlay?(data: AnimationData): void
  /**
   * Called every time the animation pauses.
   *
   * @default undefined
   */
  onPause?(data: AnimationData): void
  /**
   * Called every time the animation is updated.
   *
   * @default undefined
   */
  onUpdate?(data: AnimationData): void
  /**
   * Called every time the animation is reversed.
   *
   * @default undefined
   */
  onReverse?(data: AnimationData): void
  /**
   * Called right after the animation stops.
   *
   * @default undefined
   */
  onStop?(data: AnimationData): void
  /**
   * Called right after the animation ends.
   *
   * @default undefined
   */
  onComplete?(data: AnimationData): void
  /**
   * Called right after the animation is canceled.
   *
   * @default undefined
   */
  onCancel?(error: any): void
}
