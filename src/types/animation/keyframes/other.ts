import type { CssVarString } from './'
import type { UnitString, UnitObject } from './units'
import type { ColorValues } from './color'

export type OtherValue = number | UnitString | UnitObject | CssVarString
export type OtherValues = [OtherValue, OtherValue, ...OtherValue[]]

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
