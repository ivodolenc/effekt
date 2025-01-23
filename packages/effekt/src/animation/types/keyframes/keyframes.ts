import type { AnimationOptions } from '../options'
import type { AnimationEffect } from '../effect'

// Others
export type KeyframeValue = number | string
export type KeyframeArrayValue = [
  KeyframeValue,
  KeyframeValue,
  ...KeyframeValue[],
]
export interface KeyframeObjectValue extends AnimationEffect {
  value: number | string | KeyframeArrayValue
  offset?: AnimationOptions['offset']
}
export type KeyframeValues =
  | number
  | string
  | KeyframeArrayValue
  | KeyframeObjectValue

// Transforms
export type TransformValue = number | string
export type TransformArrayValue = [
  TransformValue,
  TransformValue,
  ...TransformValue[],
]
export interface TransformObjectValue extends AnimationEffect {
  value: number | string | TransformArrayValue
  offset?: AnimationOptions['offset']
}
export type TransformValues =
  | number
  | string
  | TransformArrayValue
  | TransformObjectValue

// Colors
export type ColorValue = string
export type ColorArrayValue = [ColorValue, ColorValue, ...ColorValue[]]
export interface ColorObjectValue extends AnimationEffect {
  value: string | ColorArrayValue
  offset?: AnimationOptions['offset']
}
export type ColorValues = string | ColorArrayValue | ColorObjectValue

export interface AnimationKeyframes {
  // Others
  opacity?: KeyframeValues
  width?: KeyframeValues
  minWidth?: KeyframeValues
  maxWidth?: KeyframeValues
  height?: KeyframeValues
  minHeight?: KeyframeValues
  maxHeight?: KeyframeValues
  margin?: KeyframeValues
  marginTop?: KeyframeValues
  marginRight?: KeyframeValues
  marginBottom?: KeyframeValues
  marginLeft?: KeyframeValues
  padding?: KeyframeValues
  paddingTop?: KeyframeValues
  paddingRight?: KeyframeValues
  paddingBottom?: KeyframeValues
  paddingLeft?: KeyframeValues
  inset?: KeyframeValues
  top?: KeyframeValues
  right?: KeyframeValues
  bottom?: KeyframeValues
  left?: KeyframeValues
  fontSize?: KeyframeValues
  lineHeight?: KeyframeValues
  letterSpacing?: KeyframeValues
  borderRadius?: KeyframeValues
  borderWidth?: KeyframeValues
  strokeDashoffset?: KeyframeValues
  filter?: KeyframeValues
  // Transforms
  x?: TransformValues
  y?: TransformValues
  z?: TransformValues
  translate?: TransformValues
  translateX?: TransformValues
  translateY?: TransformValues
  translateZ?: TransformValues
  translate3d?: TransformValues
  scale?: TransformValues
  scaleX?: TransformValues
  scaleY?: TransformValues
  scaleZ?: TransformValues
  scale3d?: TransformValues
  rotate?: TransformValues
  rotateX?: TransformValues
  rotateY?: TransformValues
  rotateZ?: TransformValues
  rotate3d?: TransformValues
  skew?: TransformValues
  skewX?: TransformValues
  skewY?: TransformValues
  perspective?: TransformValues
  matrix?: TransformValues
  matrix3d?: TransformValues
  transform?: TransformValues
  // Colors
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
  fill?: ColorValues
}
