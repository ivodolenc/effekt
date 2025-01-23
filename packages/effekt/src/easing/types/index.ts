import type { EasingFunction } from '@/shared/types'

export type EasingModifier = (easing: EasingFunction) => EasingFunction

export interface SpringOptions {
  mass?: number
  stiffness?: number
  damping?: number
  velocity?: number
  duration?: number
}
