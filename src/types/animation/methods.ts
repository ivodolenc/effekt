import type { DriverData } from '@/types/engine'

export interface AnimationMethods {
  /**
   * Called at the beginning of the animation.
   *
   * @default undefined
   */
  onStart?(data: Readonly<DriverData>): void
  /**
   * Called every time the animation starts.
   *
   * @default undefined
   */
  onPlay?(data: Readonly<DriverData>): void
  /**
   * Called every time the animation pauses.
   *
   * @default undefined
   */
  onPause?(data: Readonly<DriverData>): void
  /**
   * Called every time the animation is updated.
   *
   * @default undefined
   */
  onUpdate?(
    data: Readonly<DriverData>,
    elements: (HTMLElement | SVGElement)[],
  ): void
  /**
   * Called every time the animation is reversed.
   *
   * @default undefined
   */
  onReverse?(data: Readonly<DriverData>): void
  /**
   * Called right after the animation stops.
   *
   * @default undefined
   */
  onStop?(data: Readonly<DriverData>): void
  /**
   * Called right after the animation ends.
   *
   * @default undefined
   */
  onComplete?(data: Readonly<DriverData>): void
  /**
   * Called right after the animation is canceled.
   *
   * @default undefined
   */
  onCancel?(data: Readonly<DriverData>, error: any): void
}
