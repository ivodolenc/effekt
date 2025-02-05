import type { SequenceEvents } from './events'
import type { AnimationTargets, AnimationOptions } from '@/animation/types'

export type SequenceAnimation = [
  AnimationTargets,
  Omit<AnimationOptions, 'timeline'>,
]

export interface SequenceOptions extends SequenceEvents {
  /**
   * Specifies the animation `timeline` features, inherited by other types:
   *
   * - `DocumentTimeline`
   * - `ScrollTimeline`
   * - `ViewTimeline`
   *
   * @experimental [Browser support](https://developer.mozilla.org/en-US/docs/Web/API/AnimationTimeline) (2025): 74.8%
   *
   * @default undefined
   */
  timeline?: globalThis.AnimationTimeline | null
}

export type SequenceEventNames =
  | 'play'
  | 'pause'
  | 'stop'
  | 'complete'
  | 'cancel'

export type SequencePromise = Promise<globalThis.Animation[][]>
