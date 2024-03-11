import { Easing } from '../shared'

export type StaggerOrigin = 'first' | 'center' | 'last' | number

export type StaggerOptions = {
  delay?: number
  from?: StaggerOrigin
  ease?: Easing
  grid?: [number, number]
  axis?: 'x' | 'y'
}
