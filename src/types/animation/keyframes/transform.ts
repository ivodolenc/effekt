import type { CssVarString } from './'
import type { UnitString, UnitObject } from './units'

export type TransformValue = number | UnitString | UnitObject | CssVarString
export type TransformValues = [
  TransformValue,
  TransformValue,
  ...TransformValue[],
]

export interface TransformKeyframes {
  x?: TransformValues
  y?: TransformValues
  z?: TransformValues
  translate?: TransformValues
  translateX?: TransformValues
  translateY?: TransformValues
  translateZ?: TransformValues
  rotate?: TransformValues
  rotateX?: TransformValues
  rotateY?: TransformValues
  rotateZ?: TransformValues
  skew?: TransformValues
  skewX?: TransformValues
  skewY?: TransformValues
  scale?: TransformValues
  scaleX?: TransformValues
  scaleY?: TransformValues
  scaleZ?: TransformValues
  perspective?: TransformValues
}
