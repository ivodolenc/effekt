import { Keyframe } from './keyframe'
import { generateKeyframes, getAnimation } from './utils'
import type {
  DriverData,
  AnimationTarget,
  AnimationOptions,
  AnimationSetProperties,
  AnimationRunMethods,
  KeyframeOptions,
} from '@/types'

export class Animation {
  #animation!: Keyframe
  #animations: Keyframe[] = []
  #keyframes!: KeyframeOptions[]
  #el: HTMLElement | SVGElement

  constructor(el: AnimationTarget, options: AnimationOptions) {
    this.#el = el.value
    this.#keyframes = generateKeyframes(options)
    const keyframesLength = this.#keyframes.length

    for (let i = 0; i < keyframesLength; i++) {
      const k = new Keyframe(el, this.#keyframes[i])
      this.#animations.push(k)
    }

    this.#animation = getAnimation(this.#animations)
    this.#setInitialCssVars()
  }

  #setInitialCssVars(): void {
    if (this.#keyframes.some((k) => k.type === 'transform')) {
      let transform = ''

      const vars = ['pe', 'skX', 'skY']
      vars.forEach((v) => {
        transform += `var(--t-${v}) `
        this.#el.style.setProperty(`--t-${v}`, ' ')
      })

      const axis = ['X', 'Y', 'Z']
      axis.forEach((key) => {
        const vars = ['tr', 'ro', 'sc']
        vars.forEach((v) => {
          transform += `var(--t-${v}${key}) `
          this.#el.style.setProperty(`--t-${v}${key}`, ' ')
        })
      })

      this.#el.style.transform = transform
    }

    if (this.#keyframes.some((k) => k.type === 'filter')) {
      let filter = ''
      const vars = ['bl', 'br', 'co', 'dr', 'gr', 'hu', 'in', 'op', 'sa', 'se']

      vars.forEach((v) => {
        filter += `var(--f-${v}) `
        this.#el.style.setProperty(`--f-${v}`, ' ')
      })

      this.#el.style.filter = filter
    }
  }

  #set(name: AnimationSetProperties, value: number): void {
    this.#animations.forEach((k) => (k[name] = value))
  }

  #run(name: AnimationRunMethods): void {
    this.#animations.forEach((method) => method[name]())
  }

  onRender(callback: () => void): void {
    this.#animation.onRender = callback
  }

  onComplete(callback: () => void): void {
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
