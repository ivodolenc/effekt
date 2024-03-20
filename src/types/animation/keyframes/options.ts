import type { AnimationOptions } from '@/types/animation'
import type { Easing, RGBA, DelayFunction } from '@/types/shared'

export interface KeyframesOptions {
  type: 'transform' | 'color' | 'other'
  key: string
  values: (number | RGBA)[]
  units: Set<string>
  offset: number[]
  duration?: number
  direction?: AnimationOptions['direction']
  delayStart?: number | DelayFunction
  delayEnd?: number | DelayFunction
  repeat?: number
  ease?: Easing | Easing[]
}
