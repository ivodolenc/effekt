import { Animation } from './animation'
import { generateKeyframes, getAnimation } from './utils'
import { getElements } from '@/utils'
import type {
  Targets,
  AnimationOptions,
  DriverData,
  ControllerProperties,
  ControllerMethods,
  AnimationPromise,
} from '@/types'

export class AnimationController {
  #isRunning: boolean = false
  #animation!: Animation
  #animations: Animation[] = []
  #onPlay: AnimationOptions['onPlay']
  #onPause: AnimationOptions['onPause']
  #onStop: AnimationOptions['onStop']
  #onReverse: AnimationOptions['onReverse']
  #resolve?: (value: Readonly<DriverData>) => void
  #reject?: (value: any) => void

  constructor(targets: Targets, options: AnimationOptions) {
    this.#onPlay = options.onPlay
    this.#onPause = options.onPause
    this.#onStop = options.onStop
    this.#onReverse = options.onReverse

    const elements = getElements(targets)

    if (!elements.length) return
    else this.#isRunning = true

    const keyframes = generateKeyframes(options)

    for (let i = 0, l = elements.length; i < l; i++) {
      const el = elements[i]
      const a = new Animation({ value: el, index: i, total: l }, keyframes)
      this.#animations.push(a)
    }

    this.#animation = getAnimation(this.#animations)

    this.#animation.onComplete(() => this.#resolve?.(this.data))
    if (options.onUpdate) {
      this.#animation.onRender(() => options.onUpdate?.(this.data, elements))
    }

    options.onStart?.(this.data)

    this.finished
      .then(() => {
        this.#animation.data.playState = 'finished'
        this.#animation.data.promiseState = 'fulfilled'
        options.onComplete?.(this.data)
      })
      .catch((err) => {
        this.#animation.data.playState = 'idle'
        this.#animation.data.promiseState = 'rejected'
        options.onCancel?.(this.data, err)
      })
  }

  #set(name: ControllerProperties, value: number): void {
    this.#animations.forEach((a) => (a[name] = value))
  }

  #run(name: ControllerMethods): void {
    this.#animations.forEach((a) => a[name]())
  }

  finished: AnimationPromise = new Promise((resolve, reject): void => {
    this.#resolve = resolve
    this.#reject = reject
  })

  play(): void {
    if (!this.#isRunning) return
    this.#run('play')
    this.#onPlay?.(this.data)
  }

  pause(): void {
    if (!this.#isRunning) return
    this.#run('pause')
    this.#onPause?.(this.data)
  }

  stop(): void {
    if (!this.#isRunning) return
    this.#run('stop')
    this.#reject?.(false)
    this.#onStop?.(this.data)
  }

  cancel(): void {
    if (!this.#isRunning) return
    this.#run('cancel')
    this.#reject?.(false)
  }

  finish(): void {
    if (!this.#isRunning) return
    this.#run('finish')
    this.#resolve?.(this.data)
  }

  reverse(): void {
    if (!this.#isRunning) return
    this.#run('reverse')
    this.#onReverse?.(this.data)
  }

  get currentTime(): number {
    if (!this.#isRunning) return 0
    return this.#animation.currentTime
  }
  set currentTime(time) {
    if (!this.#isRunning) return
    this.#set('currentTime', time)
  }

  get playRate(): number {
    if (!this.#isRunning) return 1
    return this.#animation.playRate
  }
  set playRate(rate) {
    if (!this.#isRunning) return
    this.#set('playRate', rate)
  }

  get data(): Readonly<DriverData> {
    if (!this.#isRunning) return Object.freeze({} as DriverData)
    return Object.freeze({ ...this.#animation.data })
  }
}
