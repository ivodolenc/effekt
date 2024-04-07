import { isNumber } from '@/utils/is'
import { rgxShadow } from '@/utils/regexp'
import { interpolate, setStyle } from '@/utils'
import { Driver, createDriverData } from '@/engine'
import type { AnimationTarget, DriverData, KeyframeOptions } from '@/types'

const transforms: WeakMap<
  HTMLElement | SVGElement,
  {
    [key: string]: string
  }
> = new WeakMap()

const filters: WeakMap<
  HTMLElement | SVGElement,
  {
    [key: string]: string
  }
> = new WeakMap()

const willChange: WeakMap<HTMLElement | SVGElement, string[]> = new WeakMap()

export class Keyframe {
  #dataKey = {}
  #dataMap: WeakMap<object, DriverData> = new WeakMap()
  #driver: Driver
  #el: HTMLElement | SVGElement

  constructor(el: AnimationTarget, options: KeyframeOptions, force3d: boolean) {
    const { type, key, value, units, ease, offset, ...dataOptions } = options

    this.#el = el.value
    this.#dataMap.set(this.#dataKey, createDriverData({ el, ...dataOptions }))

    const is = {
      transform: false,
      color: false,
      other: false,
      otherShadow: false,
      filter: false,
      filterShadow: false,
    }
    willChange.set(el.value, [])

    if (type === 'transform') {
      is.transform = true
      transforms.set(this.#el, {})

      if (force3d) {
        if (key !== 'translateZ') {
          transforms.get(this.#el)!.translateZ = `translateZ(0)`
        }
        willChange.get(el.value)!.push('transform')
      }
    }
    if (type === 'color') {
      is.color = true
    }
    if (type === 'other') {
      is.other = true
      if (rgxShadow.test(key)) is.otherShadow = true
    }
    if (type === 'filter') {
      is.filter = true
      filters.set(this.#el, {})
      if (rgxShadow.test(key)) is.filterShadow = true
      if (force3d) willChange.get(el.value)!.push('filter')
    }
    if (force3d) {
      el.value.style.willChange = willChange.get(el.value)!.join(', ')
    }

    const onRender = () => {
      if (is.transform) {
        this.#createTransform(options)
        this.#animateMap('transform', transforms)
      }
      if (is.color) this.#animateColor(options)
      if (is.other) this.#animateOther(options, is.otherShadow)
      if (is.filter) {
        this.#createFilter(options, is.filterShadow)
        this.#animateMap('filter', filters)
      }

      this.onRender()
    }

    const onComplete = () => {
      if (force3d) {
        if (key !== 'translateZ') {
          transforms.get(this.#el)!.translateZ = ``
        }
        el.value.style.willChange = 'auto'
      }

      this.onComplete()
    }

    this.#driver = new Driver(this.#data, {
      onRender,
      onComplete,
    })
  }

  #animateColor(options: KeyframeOptions): void {
    const { key, value, ease, offset } = options

    const interpolator = interpolate(value, offset, {
      ease,
      type: 'color',
    })(this.#data.progress)

    setStyle(this.#el, key, `rgba(${interpolator})`)
  }

  #animateOther(options: KeyframeOptions, isShadow: boolean): void {
    const { key, value, units, ease, offset } = options

    const [unit] = units
    const progress = this.#data.progress

    if (isShadow) {
      const interpolator = interpolate(
        value as (number | number[])[][],
        offset,
        {
          ease,
          type: 'shadow',
        },
      )(progress)
      let shadow = ''

      for (let i = 0, l = interpolator.length; i < l; i++) {
        const val = interpolator[i]
        if (isNumber(val)) shadow += `${val}${unit || 'px'} `
        else shadow += `rgba(${val})`
      }

      setStyle(this.#el, key, shadow)
    } else {
      const interpolator = interpolate(value, offset, { ease })(progress)
      setStyle(this.#el, key, `${interpolator}${unit}`)
    }
  }

  #animateMap(
    type: 'transform' | 'filter',
    map: typeof transforms | typeof filters,
  ): void {
    const style = Object.values(map.get(this.#el)!).join(' ')
    setStyle(this.#el, type, style)
  }

  #createTransform(options: KeyframeOptions): void {
    const { key, value, units, ease, offset } = options

    const [unit] = units
    const interpolator = interpolate(value, offset, { ease })(
      this.#data.progress,
    )

    transforms.get(this.#el)![key] = `${key}(${interpolator}${unit})`
  }

  #createFilter(options: KeyframeOptions, isShadow: boolean): void {
    const { key, value, units, ease, offset } = options

    const [unit] = units
    const progress = this.#data.progress
    const filter = filters.get(this.#el)!

    if (isShadow) {
      const interpolator = interpolate(
        value as (number | number[])[][],
        offset,
        { ease, type: 'shadow' },
      )(progress)
      let v = ''

      for (let i = 0, l = interpolator.length; i < l; i++) {
        const val = interpolator[i]
        if (isNumber(val)) v += `${val}${unit || 'px'} `
        else v += `rgba(${val})`
      }

      filter[key] = `${key}(${v})`
    } else {
      const interpolator = interpolate(value, offset, { ease })(progress)
      filter[key] = `${key}(${interpolator}${unit})`
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

  get #data(): DriverData {
    return this.#dataMap.get(this.#dataKey)!
  }

  get data(): DriverData {
    return this.#data
  }
}
