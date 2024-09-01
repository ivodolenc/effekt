import type { Easing } from '@/types/shared'
import type { KeyframesObjectValue } from './value'

export type ShadowValue =
  | string
  | {
      value: string
      offset?: number
      ease?: Easing
    }

export interface ShadowObject extends KeyframesObjectValue {
  value: [ShadowValue, ShadowValue, ...ShadowValue[]]
}

export type ShadowValues =
  | [ShadowValue, ShadowValue, ...ShadowValue[]]
  | ShadowObject
