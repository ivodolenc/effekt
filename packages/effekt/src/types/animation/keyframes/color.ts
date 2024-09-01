import type { CssVarString } from './css-vars'
import type { KeyframesObjectValue } from './value'
import type { Easing } from '@/types/shared'

export type HexString = `#${number | string}`

export type RgbString =
  | `rgb(${number},${number},${number})`
  | `rgb(${number}, ${number}, ${number})`

export type RgbaString =
  | `rgba(${number},${number},${number},${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`

export type HslString =
  | `hsl(${number},${number},${number})`
  | `hsl(${number}, ${number}, ${number})`

export type HslaString =
  | `hsla(${number},${number},${number},${number})`
  | `hsla(${number}, ${number}, ${number}, ${number})`

export type ColorString =
  | HexString
  | RgbString
  | RgbaString
  | HslString
  | HslaString

export interface ColorObjectValue {
  value: ColorString | CssVarString
  offset?: number
  ease?: Easing
}

export type ColorValue = ColorString | ColorObjectValue | CssVarString

export interface ColorObject extends KeyframesObjectValue {
  value: [ColorValue, ColorValue, ...ColorValue[]]
}

export type ColorValues =
  | [ColorValue, ColorValue, ...ColorValue[]]
  | ColorObject

export interface ColorKeyframes {
  color?: ColorValues
  background?: ColorValues
  backgroundColor?: ColorValues
  borderColor?: ColorValues
  borderTopColor?: ColorValues
  borderRightColor?: ColorValues
  borderBottomColor?: ColorValues
  borderLeftColor?: ColorValues
  outlineColor?: ColorValues
  textDecorationColor?: ColorValues
  columnRuleColor?: ColorValues
}
