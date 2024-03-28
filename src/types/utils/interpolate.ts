import type { MixerType } from './mix'
import type { Easing } from '@/types/shared'

export interface InterpolateOptions {
  ease?: Easing | Easing[]
  type?: MixerType
}
