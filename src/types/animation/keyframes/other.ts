import type { ColorValues } from './color'
import type { CssVarString } from './css-vars'
import type { KeyframesObjectValue } from './value'
import type { UnitString, UnitObject } from './units'

export type OtherValue = number | UnitString | CssVarString | UnitObject

export interface OtherObject extends KeyframesObjectValue {
  values: [OtherValue, OtherValue, ...OtherValue[]]
}

export type OtherValues =
  | [OtherValue, OtherValue, ...OtherValue[]]
  | OtherObject

export interface OtherKeyframes {
  opacity?: OtherValues
  width?: OtherValues
  minWidth?: OtherValues
  maxWidth?: OtherValues
  height?: OtherValues
  minHeight?: OtherValues
  maxHeight?: OtherValues
  margin?: OtherValues
  marginTop?: OtherValues
  marginRight?: OtherValues
  marginBottom?: OtherValues
  marginLeft?: OtherValues
  padding?: OtherValues
  paddingTop?: OtherValues
  paddingRight?: OtherValues
  paddingBottom?: OtherValues
  paddingLeft?: OtherValues
  inset?: OtherValues
  top?: OtherValues
  right?: OtherValues
  bottom?: OtherValues
  left?: OtherValues
  fontSize?: OtherValues
  lineHeight?: OtherValues
  letterSpacing?: OtherValues
  borderRadius?: OtherValues
  borderWidth?: OtherValues
  strokeDashoffset?: OtherValues
  fill?: ColorValues
}
