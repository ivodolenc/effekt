import type { DriverData } from '@/types/engine'

export interface AnimationMethods {
  /**
   * Called at the beginning of the animation.
   *
   * @default undefined
   */
  onStart?(data: DriverData): void
  /**
   * Called every time the animation starts.
   *
   * @default undefined
   */
  onPlay?(data: DriverData): void
  /**
   * Called every time the animation pauses.
   *
   * @default undefined
   */
  onPause?(data: DriverData): void
  /**
   * Called every time the animation is updated.
   *
   * @default undefined
   */
  onUpdate?(data: DriverData): void
  /**
   * Called every time the animation is reversed.
   *
   * @default undefined
   */
  onReverse?(data: DriverData): void
  /**
   * Called right after the animation stops.
   *
   * @default undefined
   */
  onStop?(data: DriverData): void
  /**
   * Called right after the animation ends.
   *
   * @default undefined
   */
  onComplete?(data: DriverData): void
  /**
   * Called right after the animation is canceled.
   *
   * @default undefined
   */
  onCancel?(error: any): void
}
