import type { Easing } from '../shared'

export type EasingModifier = (easing: Easing) => Easing

export interface SpringOptions {
  mass?: number
  stiffness?: number
  damping?: number
  velocity?: number
  duration?: number
}

export * from '@/easing'
