import type { CssVarString } from './css-vars'
import type { KeyframesObjectValue } from './value'
import type { UnitString, UnitObject } from './units'

export type TransformValue = number | UnitString | CssVarString | UnitObject

export interface TransformObject extends KeyframesObjectValue {
  values: [TransformValue, TransformValue, ...TransformValue[]]
}

export type TransformValues =
  | [TransformValue, TransformValue, ...TransformValue[]]
  | TransformObject

export interface TransformKeyframes {
  x?: TransformValues
  y?: TransformValues
  z?: TransformValues
  translateX?: TransformValues
  translateY?: TransformValues
  translateZ?: TransformValues
  rotateX?: TransformValues
  rotateY?: TransformValues
  rotateZ?: TransformValues
  skewX?: TransformValues
  skewY?: TransformValues
  scaleX?: TransformValues
  scaleY?: TransformValues
  scaleZ?: TransformValues
  perspective?: TransformValues
}
