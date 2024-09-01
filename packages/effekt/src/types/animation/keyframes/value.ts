import type { Easing, DelayFunction } from '@/types/shared'
import type { AnimationOptions } from '@/types/animation'

export interface KeyframesObjectValue {
  duration?: number
  ease?: Easing | Easing[]
  offset?: number[]
  direction?: AnimationOptions['direction']
  delay?: number | DelayFunction
  endDelay?: number | DelayFunction
  repeat?: number
}
