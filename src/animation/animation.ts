import { secToMs } from '@/utils'
import { createElementData } from '@/dom/data/create-data'
import { frame, Driver } from '@/engine'
import { defaultData, readOnly } from './data'
import { setDelay } from './set-delay'
import { createInterpolation } from './interpolation'
import type {
  AnimationData,
  AnimationTarget,
  AnimationOptions,
} from '@/types/animation'
import type { ElementData } from '@/types/dom/data'

export class Animation {
  #data: AnimationData
  #elementData!: ElementData
  #driver: Driver

  constructor(el: AnimationTarget, options: AnimationOptions) {
    this.#data = {
      ...defaultData,
      autoplay: options.autoplay ?? true,
      direction: options.direction || 'normal',
      playRate: options.playRate || 1,
      duration: secToMs(options.duration as number) || 600,
      delayStart: setDelay(options.delayStart, el.index, el.total),
      delayEnd: setDelay(options.delayEnd, el.index, el.total),
      repeat: (options.repeat as number) + 1 || 1,
    }
    this.#data.totalDuration = this.#data.duration * this.#data.repeat

    frame.read(() => {
      this.#elementData = createElementData(options)
    })

    const onUpdateDriver = () => {
      createInterpolation(el.value, this.#elementData, this.#data.progress)
    }

    this.#driver = new Driver(this.#data, { onUpdate: onUpdateDriver })
  }

  play(): void {
    this.#driver.play()
  }

  pause(): void {
    this.#driver.pause()
  }

  stop(): void {
    this.#driver.stop()
  }

  cancel(): void {
    this.#driver.cancel()
  }

  finish(): void {
    this.#driver.finish()
  }

  reverse(): void {
    this.#driver.reverse()
  }

  get currentTime(): number {
    return this.#driver.currentTime
  }
  set currentTime(time) {
    this.#driver.currentTime = time
  }

  get playRate(): number {
    return this.#driver.playRate
  }
  set playRate(rate) {
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
