import { secToMs } from '@/utils'
import { getElements } from '@/dom/get-elements'
import { Driver } from '@/engine'
import { defaultData, readOnly } from './data'
import { Animation } from './animation'
import { setDelay } from './set-delay'
import type { Targets } from '@/types'
import type {
  AnimationData,
  AnimationOptions,
  AnimationPromise,
  ControllerMethods,
  ControllerProperties,
} from '@/types/animation'

export class AnimationController {
  #animations: Animation[] = []
  #data: AnimationData
  #driver: Driver
  #resolve?: (value: AnimationData) => void
  #reject?: (value: any) => void
  #onPlay: AnimationOptions['onPlay']
  #onPause: AnimationOptions['onPause']
  #onStop: AnimationOptions['onStop']
  #onReverse: AnimationOptions['onReverse']

  constructor(targets: Targets, options: AnimationOptions) {
    const { onStart, onUpdate, onComplete, onCancel } = options

    this.#data = {
      ...defaultData,
      autoplay: options.autoplay ?? true,
      direction: options.direction || 'normal',
      playRate: options.playRate || 1,
      duration: secToMs(options.duration as number) || 600,
      delayStart: setDelay(options.delayStart),
      delayEnd: setDelay(options.delayEnd),
      repeat: (options.repeat as number) + 1 || 1,
    }
    this.#onPlay = options.onPlay
    this.#onPause = options.onPause
    this.#onStop = options.onStop
    this.#onReverse = options.onReverse

    const elements = getElements(targets)
    const elsLength = elements.length
    const delayStart = []
    const delayEnd = []

    for (let i = 0; i < elsLength; i++) {
      const el = elements[i]
      const animation = new Animation(
        { value: el, index: i, total: elsLength },
        options,
      )
      delayStart.push(animation.data.delayStart)
      delayEnd.push(animation.data.delayEnd)
      this.#animations.push(animation)
    }

    const maxDelays = Math.max(...delayStart) + Math.max(...delayEnd)
    this.#data.totalDuration =
      this.#data.duration * this.#data.repeat + maxDelays

    onStart?.(this.#data)

    const onUpdateDriver = () => {
      onUpdate?.(this.#data)
    }

    const onCompleteDriver = () => {
      this.#resolve?.(this.#data)
    }

    this.#driver = new Driver(this.#data, {
      onUpdate: onUpdate && onUpdateDriver,
      onComplete: onCompleteDriver,
    })

    this.finished
      .then(() => {
        this.#data.playState = 'finished'
        this.#data.promiseState = 'fulfilled'
        onComplete?.(this.#data)
      })
      .catch((err) => {
        this.#data.playState = 'idle'
        this.#data.promiseState = 'rejected'
        onCancel?.(err)
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
    this.#onReverse?.(this.#data)
  }

  getAnimations(): Animation[] {
    return this.#animations
  }

  getActiveAnimation(): Animation {
    let index = 0
    const now = this.#driver.now()
    const animLength = this.#animations.length

    for (let i = 0; i < animLength; i++) {
      const { data } = this.#animations[index]
      const timing = data.delayStart + data.totalDuration + data.delayEnd
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

  get playState(): Readonly<AnimationData['playState']> {
    return this.#data.playState
  }
  set playState(v) {
    readOnly()
  }

  get progress(): number {
    return this.#data.progress
  }
  set progress(v) {
    readOnly()
  }

  get data(): Readonly<AnimationData> {
    return this.#data
  }
  set data(v) {
    readOnly()
  }
}
