import { Animation } from './animation'
import { Driver, createDriverData } from '@/engine'
import { msToSec, getElements } from '@/utils'
import type {
  Targets,
  AnimationOptions,
  DriverData,
  ControllerProperties,
  ControllerMethods,
  AnimationPromise,
} from '@/types'

export class AnimationController {
  #data: DriverData
  #driver: Driver
  #animations: Animation[] = []
  #onPlay: AnimationOptions['onPlay']
  #onPause: AnimationOptions['onPause']
  #onStop: AnimationOptions['onStop']
  #resolve?: (value: DriverData) => void
  #reject?: (value: any) => void

  constructor(targets: Targets, options: AnimationOptions) {
    this.#onPlay = options.onPlay
    this.#onPause = options.onPause
    this.#onStop = options.onStop

    const elements = getElements(targets)
    const elsLength = elements.length
    const duration = []

    for (let i = 0; i < elsLength; i++) {
      const el = elements[i]
      const a = new Animation(
        { value: el, index: i, total: elsLength },
        options,
      )
      duration.push(a.data.maxDuration)
      this.#animations.push(a)
    }

    this.#data = createDriverData({
      autoplay: options.autoplay,
      direction: options.direction,
      duration: msToSec(Math.max(...duration)),
      playRate: options.playRate,
    })

    options.onStart?.(this.#data)

    const onComplete = () => {
      this.#resolve?.(this.#data)
    }

    this.#driver = new Driver(this.#data, { onComplete })

    this.finished
      .then(() => {
        this.#data.playState = 'finished'
        this.#data.promiseState = 'fulfilled'
        options.onComplete?.(this.#data)
      })
      .catch((err) => {
        this.#data.playState = 'idle'
        this.#data.promiseState = 'rejected'
        options.onCancel?.(err)
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
    this.#driver.play()
    this.#onPlay?.(this.#data)
  }

  pause(): void {
    this.#run('pause')
    this.#driver.pause()
    this.#onPause?.(this.#data)
  }

  stop(): void {
    this.#run('stop')
    this.#driver.stop()
    this.#reject?.(false)
    this.#onStop?.(this.#data)
  }

  cancel(): void {
    this.#run('cancel')
    this.#driver.cancel()
    this.#reject?.(false)
  }

  finish(): void {
    this.#run('finish')
    this.#driver.finish()
    this.#resolve?.(this.#data)
  }

  reverse(): void {
    this.#run('reverse')
    this.#driver.reverse()
  }

  getAnimations(): Animation[] {
    return this.#animations
  }

  getActiveAnimation(): Animation {
    let index = 0
    const now = this.#driver.now()
    const animLength = this.#animations.length

    for (let i = 0; i < animLength; i++) {
      const timing = this.#animations[index].data.maxDuration
      if (now < timing) break
      else index++
    }
    if (index >= animLength) index = animLength - 1

    return this.#animations[index]
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
