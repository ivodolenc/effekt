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
    const elsLength = elements.length
    const keyframes = generateKeyframes(options)

    for (let i = 0; i < elsLength; i++) {
      const el = elements[i]
      const a = new Animation(
        { value: el, index: i, total: elsLength },
        keyframes,
      )
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
        this.#animation.revert3d(elements)
        options.onComplete?.(this.data)
      })
      .catch((err) => {
        this.#animation.data.playState = 'idle'
        this.#animation.data.promiseState = 'rejected'
        this.#animation.revert3d(elements)
        options.onCancel?.(this.data, err)
      })
  }

  #set(name: ControllerProperties, value: number): void {
    this.#animations.forEach((a) => (a[name] = value))
  }

  #run(name: ControllerMethods): void {
    this.#animations.forEach((method) => method[name]())
  }

  finished: AnimationPromise = new Promise((resolve, reject): void => {
    this.#resolve = resolve
    this.#reject = reject
  })

  play(): void {
    this.#run('play')
    this.#onPlay?.(this.data)
  }

  pause(): void {
    this.#run('pause')
    this.#onPause?.(this.data)
  }

  stop(): void {
    this.#run('stop')
    this.#reject?.(false)
    this.#onStop?.(this.data)
  }

  cancel(): void {
    this.#run('cancel')
    this.#reject?.(false)
  }

  finish(): void {
    this.#run('finish')
    this.#resolve?.(this.data)
  }

  reverse(): void {
    this.#run('reverse')
    this.#onReverse?.(this.data)
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

  get data(): Readonly<DriverData> {
    return Object.freeze({ ...this.#animation.data })
  }
}
