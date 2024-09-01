import { Keyframe } from './keyframe'
import { getAnimation } from './utils'
import type {
  DriverData,
  AnimationTarget,
  AnimationSetProperties,
  AnimationRunMethods,
  KeyframesGenerator,
} from '@/types'

export class Animation {
  #animation!: Keyframe
  #animations: Keyframe[] = []

  constructor(el: AnimationTarget, keyframes: KeyframesGenerator) {
    for (let i = 0, l = keyframes.options.length; i < l; i++) {
      const keyframe = new Keyframe(el, keyframes.options[i], keyframes.force3d)
      this.#animations.push(keyframe)
    }
    this.#animation = getAnimation(this.#animations)
  }

  #set(name: AnimationSetProperties, value: number): void {
    this.#animations.forEach((k) => (k[name] = value))
  }

  #run(name: AnimationRunMethods): void {
    this.#animations.forEach((k) => k[name]())
  }

  onRender(callback: VoidFunction): void {
    this.#animation.onRender = callback
  }

  onComplete(callback: VoidFunction): void {
    this.#animation.onComplete = callback
  }

  play(): void {
    this.#run('play')
  }

  pause(): void {
    this.#run('pause')
  }

  stop(): void {
    this.#run('stop')
  }

  cancel(): void {
    this.#run('cancel')
  }

  finish(): void {
    this.#run('finish')
  }

  reverse(): void {
    this.#run('reverse')
  }

  get currentTime(): number {
    return this.#animation.currentTime
  }
  set currentTime(time) {
    this.#set('currentTime', time)
  }

  get playRate(): number {
    return this.#animation.playRate
  }
  set playRate(rate) {
    this.#set('playRate', rate)
  }

  get data(): DriverData {
    return this.#animation.data
  }
}
