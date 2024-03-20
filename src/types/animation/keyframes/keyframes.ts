import type { TransformKeyframes } from './transform'
import type { ColorKeyframes } from './color'
import type { OtherKeyframes } from './other'

export interface AnimationKeyframes
  extends TransformKeyframes,
    ColorKeyframes,
    OtherKeyframes {}
