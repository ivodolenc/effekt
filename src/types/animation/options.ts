import type { AnimationEffect } from './effect'
import type { AnimationKeyframes } from './keyframes'
import type { AnimationMethods } from './methods'

export interface AnimationTarget {
  value: HTMLElement | SVGElement
  index: number
  total: number
}

export interface AnimationOptions
  extends AnimationEffect,
    AnimationMethods,
    AnimationKeyframes {}
