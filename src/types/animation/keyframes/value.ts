import type { Easing, DelayFunction } from '@/types/shared'
import type { AnimationOptions } from '@/types/animation'

export interface KeyframesObjectValue {
  duration?: number
  ease?: Easing | Easing[]
  offset?: number[]
  direction?: AnimationOptions['direction']
  delayStart?: number | DelayFunction
  delayEnd?: number | DelayFunction
  repeat?: number
}
