import type { KeyframeOptions } from './options'

export interface KeyframesGenerator {
  options: KeyframeOptions[]
  force3d: boolean
  hasTransform: boolean
  hasFilter: boolean
  hasTranslateZ: boolean
}
