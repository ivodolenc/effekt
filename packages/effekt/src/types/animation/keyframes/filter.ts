import type { CssVarString } from './css-vars'
import type { KeyframesObjectValue } from './value'
import type { UnitString, UnitObject } from './units'
import type { ShadowValues } from './shadow'

export type FilterValue = number | UnitString | CssVarString | UnitObject

export interface FilterObject extends KeyframesObjectValue {
  value: [FilterValue, FilterValue, ...FilterValue[]]
}

export type FilterValues =
  | [FilterValue, FilterValue, ...FilterValue[]]
  | FilterObject

export interface FilterKeyframes {
  blur?: FilterValues
  brightness?: FilterValues
  contrast?: FilterValues
  dropShadow?: ShadowValues
  grayscale?: FilterValues
  hueRotate?: FilterValues
  invert?: FilterValues
  opacityFilter?: FilterValues
  saturate?: FilterValues
  sepia?: FilterValues
}
