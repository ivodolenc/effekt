import { isNumber } from '@/utils/is'
import { rgxShadow } from '@/utils/regexp'
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
      this.onRender()
    }

    const onComplete = () => {
      this.onComplete()
    }

    this.#data = createDriverData({ el, ...dataOptions })
    this.#driver = new Driver(this.#data, { onRender, onComplete })
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

        let tName = `${key[0]}${key[1]}${key[key.length - 1]}`
        const tValue = `${key}(${v})`

        if (key.startsWith('p')) tName = `pe`

        return this.#el.style.setProperty(`--t-${tName}`, tValue)
      }

      if (type === 'color') {
        const { key, value, ease, offset } = options

        const interpolator = interpolate(value, offset, {
          ease,
          type: 'color',
        })(progress)

        return setStyle(this.#el, key, `rgba(${interpolator})`)
      }

      if (type === 'other') {
        const { key, value, units, ease, offset } = options

        const [unit] = units

        if (rgxShadow.test(key)) {
          const interpolator = interpolate(
            value as (number | number[])[][],
            offset,
            { ease, type: 'shadow' },
          )(progress)
          const iLength = interpolator.length
          let shadow = ''

          for (let i = 0; i < iLength; i++) {
            const val = interpolator[i]
            if (isNumber(val)) shadow += `${val}${unit || 'px'} `
            else shadow += `rgba(${val})`
          }

          return setStyle(this.#el, key, shadow.trimEnd())
        }

        const interpolator = interpolate(value, offset, { ease })(progress)

        return setStyle(this.#el, key, `${interpolator}${unit}`)
      }

      if (type === 'filter') {
        const { key, value, units, ease, offset } = options

        const [unit] = units
        const fName = `${key[0]}${key[1]}`

        if (rgxShadow.test(key)) {
          const interpolator = interpolate(
            value as (number | number[])[][],
            offset,
            { ease, type: 'shadow' },
          )(progress)
          const iLength = interpolator.length
          let v = ''

          for (let i = 0; i < iLength; i++) {
            const val = interpolator[i]
            if (isNumber(val)) v += `${val}${unit || 'px'} `
            else v += `rgba(${val})`
          }
          const fValue = `${key}(${v.trimEnd()})`

          return this.#el.style.setProperty(`--f-${fName}`, fValue)
        }

        const interpolator = interpolate(value, offset, { ease })(progress)
        const fValue = `${key}(${interpolator}${unit})`

        return this.#el.style.setProperty(`--f-${fName}`, fValue)
      }
    }
  }

  onRender(): void {}

  onComplete(): void {}

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

  get data(): DriverData {
    return this.#data
  }
}
