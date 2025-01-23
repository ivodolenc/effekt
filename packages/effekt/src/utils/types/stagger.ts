import type { EasingFunction } from '@/shared/types'

export type StaggerOrigin = 'first' | 'center' | 'last' | number

export type StaggerOptions = {
  delay?: number
  from?: StaggerOrigin
  ease?: EasingFunction
  grid?: [number, number]
  axis?: 'x' | 'y'
}
