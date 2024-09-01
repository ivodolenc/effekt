import type { AnimationOptions } from '@/types/animation'
import type { Easing, RGBA, DelayFunction } from '@/types/shared'

export interface KeyframeOptions {
  type: 'transform' | 'color' | 'other' | 'filter'
  key: string
  value: (number | RGBA)[]
  units: Set<string>
  offset: number[]
  autoplay?: boolean
  direction?: AnimationOptions['direction']
  playRate?: number
  duration?: number
  delay?: number | DelayFunction
  endDelay?: number | DelayFunction
  repeat?: number
  ease?: Easing | Easing[]
}

export interface KeyframeTypeData {
  transform: boolean
  color: boolean
  other: boolean
  otherShadow: boolean
  filter: boolean
  filterShadow: boolean
}
