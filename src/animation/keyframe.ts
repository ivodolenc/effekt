import { interpolate, setStyle } from '@/utils'
import { Driver, createDriverData } from '@/engine'
import type { AnimationTarget, DriverData, KeyframeOptions } from '@/types'

export class Keyframe {
  #data: DriverData
  #driver: Driver
  #el: HTMLElement | SVGElement

  constructor(el: AnimationTarget, options: KeyframeOptions) {
    const { type, key, value, units, ease, offset, ...dataOptions } = options

    this.#el = el.value

    const onRender = () => {
      this.#createInterpolation(options)(this.#data.progress)
    }

    this.#data = createDriverData({ el, ...dataOptions })
    this.#driver = new Driver(this.#data, { onRender })
  }

  #createInterpolation(
    options: KeyframeOptions,
  ): (progress: number) => string | void {
    const { type } = options

    return (progress: number) => {
      if (type === 'transform') {
        const { key, value, units, ease, offset } = options

        const [unit] = units
        const interpolator = interpolate(value, offset, { ease })(progress)
        const v = `${interpolator}${unit}`

        let tVar = `${key[0]}${key[key.length - 1]}`
        const tValue = `${key}(${v})`

        if (key.startsWith('p')) tVar = `p`
        if (key.startsWith('sk')) tVar = `sk${key[key.length - 1]}`

        this.#el.style.setProperty(`--${tVar}`, tValue)

        const transform =
          'var(--tX) var(--tY) var(--tZ) var(--rX) var(--rY) var(--rZ) var(--sX) var(--sY) var(--sZ) var(--skX) var(--skY) var(--p)'

        return setStyle(this.#el, 'transform', transform)
      }

      if (type === 'color') {
        const { key, value, ease, offset } = options

        const interpolator = interpolate(value, offset, {
          ease,
          color: true,
        })(progress)

        return setStyle(this.#el, key, `rgba(${interpolator})`)
      }

      if (type === 'other') {
        const { key, value, units, ease, offset } = options

        const [unit] = units
        const interpolator = interpolate(value, offset, { ease })(progress)

        return setStyle(this.#el, key, `${interpolator}${unit}`)
      }
    }
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

  get data(): Readonly<DriverData> {
    return this.#data
  }
  set data(v) {
    return
  }
}
