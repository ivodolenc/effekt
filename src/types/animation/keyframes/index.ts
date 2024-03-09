import type { TransformKeyframes } from './transform'
import type { ColorKeyframes } from './color'
import type { OtherKeyframes } from './other'

export type CssVarString = `--${number | string}`

export interface AnimationKeyframes
  extends TransformKeyframes,
    ColorKeyframes,
    OtherKeyframes {}
