import type { AnimationKeyframes } from '../../animation'
import type { Easing, RGBA } from '../../shared'

type StyleDeclarations = [
  property: keyof AnimationKeyframes,
  values: (number | RGBA)[],
  unit: string,
  offset: number[],
  easing: Easing | Easing[],
][]

export interface ElementData {
  transform: StyleDeclarations
  color: StyleDeclarations
  other: StyleDeclarations
}
