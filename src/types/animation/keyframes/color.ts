import type { CssVarString } from './'
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

export interface ColorObject {
  value: ColorString | CssVarString
  offset?: number
  ease?: Easing
}

export type ColorValue = ColorString | ColorObject | CssVarString
export type ColorValues = [ColorValue, ColorValue, ...ColorValue[]]

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
