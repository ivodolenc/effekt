import { Keyframe } from './keyframe'
import { generateKeyframes } from './utils'
import { msToSec } from '@/utils'
import { Driver, createDriverData } from '@/engine'
import type {
  DriverData,
  AnimationTarget,
  AnimationOptions,
  AnimationSetProperties,
  AnimationRunMethods,
  KeyframeOptions,
} from '@/types'

export class Animation {
  #data: DriverData
  #driver: Driver
  #el: HTMLElement | SVGElement
  #keyframes: Keyframe[] = []
  #keyframeOptions!: KeyframeOptions[]

  constructor(el: AnimationTarget, options: AnimationOptions) {
    this.#el = el.value
    this.#keyframeOptions = generateKeyframes(options)
    const keyframesLength = this.#keyframeOptions.length
    const duration = []

    for (let i = 0; i < keyframesLength; i++) {
      const k = new Keyframe(el, this.#keyframeOptions[i])
      duration.push(k.data.maxDuration)
      this.#keyframes.push(k)
    }

    this.#data = createDriverData({
      autoplay: options.autoplay,
      direction: options.direction,
      duration: msToSec(Math.max(...duration)),
      playRate: options.playRate,
    })

    this.#setInitialCssVars()

    this.#driver = new Driver(this.#data)
  }

  #setInitialCssVars(): void {
    if (this.#keyframeOptions.some((k) => k.type === 'transform')) {
      const vars = ['p', 'skX', 'skY']
      vars.forEach((v) => this.#el.style.setProperty(`--${v}`, ' '))

      const axis = ['X', 'Y', 'Z']
      axis.forEach((key) => {
        const vars = ['t', 'r', 's']
        vars.forEach((v) => this.#el.style.setProperty(`--${v}${key}`, ' '))
      })
    }
  }

  #set(name: AnimationSetProperties, value: number): void {
    this.#keyframes.forEach((k) => (k[name] = value))
  }

  #run(name: AnimationRunMethods): void {
    this.#keyframes.forEach((method) => method[name]())
  }

  play(): void {
    this.#run('play')
    this.#driver.play()
  }

  pause(): void {
    this.#run('pause')
    this.#driver.pause()
  }

  stop(): void {
    this.#run('stop')
    this.#driver.stop()
  }

  cancel(): void {
    this.#run('cancel')
    this.#driver.cancel()
  }

  finish(): void {
    this.#run('finish')
    this.#driver.finish()
  }

  reverse(): void {
    this.#run('reverse')
    this.#driver.reverse()
  }

  get currentTime(): number {
    return this.#driver.currentTime
  }
  set currentTime(time) {
    this.#set('currentTime', time)
    this.#driver.currentTime = time
  }

  get playRate(): number {
    return this.#driver.playRate
  }
  set playRate(rate) {
    this.#set('playRate', rate)
    this.#driver.playRate = rate
  }

  get playState(): Readonly<DriverData['playState']> {
    return this.#data.playState
  }
  set playState(v) {
    return
  }

  get progress(): number {
    return this.#data.progress
  }
  set progress(v) {
    return
  }

  get data(): Readonly<DriverData> {
    return this.#data
  }
  set data(v) {
    return
  }
}
