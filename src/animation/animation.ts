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
  #keyframes!: KeyframesGenerator
  #el: HTMLElement | SVGElement
  #force3d: boolean
  #revert3d: boolean = false
  #revert3dZ: boolean = false

  constructor(el: AnimationTarget, keyframes: KeyframesGenerator) {
    this.#el = el.value
    this.#force3d = keyframes.force3d

    this.#keyframes = keyframes
    const keyframesLength = keyframes.options.length

    for (let i = 0; i < keyframesLength; i++) {
      const options = keyframes.options[i]
      const keyframe = new Keyframe(el, options)
      this.#animations.push(keyframe)
    }

    this.#animation = getAnimation(this.#animations)
    this.#setInitialCssVars()
  }

  #setInitialCssVars(): void {
    const { hasTransform, hasFilter, hasTranslateZ } = this.#keyframes

    if (hasTransform) {
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

      if (this.#force3d) {
        this.#revert3d = true
        if (!hasTranslateZ) {
          this.#revert3dZ = true
          this.#el.style.setProperty(`--t-trZ`, 'translateZ(0)')
        }
        this.#el.style.willChange = hasFilter
          ? 'transform, filter'
          : 'transform'
      }
      this.#el.style.transform = transform
    }

    if (hasFilter) {
      let filter = ''
      const vars = ['bl', 'br', 'co', 'dr', 'gr', 'hu', 'in', 'op', 'sa', 'se']

      vars.forEach((v) => {
        filter += `var(--f-${v}) `
        this.#el.style.setProperty(`--f-${v}`, ' ')
      })

      if (this.#force3d) {
        this.#revert3d = true
        this.#el.style.willChange = hasTransform
          ? 'transform, filter'
          : 'filter'
      }
      this.#el.style.filter = filter
    }
  }

  #set(name: AnimationSetProperties, value: number): void {
    this.#animations.forEach((k) => (k[name] = value))
  }

  #run(name: AnimationRunMethods): void {
    this.#animations.forEach((method) => method[name]())
  }

  revert3d(elements: (HTMLElement | SVGElement)[]): void {
    if (this.#revert3d) {
      elements.forEach((el) => {
        if (this.#revert3dZ) el.style.setProperty(`--t-trZ`, ' ')
        el.style.willChange = 'auto'
      })
    }
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
