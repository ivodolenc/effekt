import { isNumber } from '@/utils/is'
import { rgxShadow } from '@/utils/regexp'
import { interpolate, setStyle } from '@/utils'
import { Driver, createDriverData } from '@/engine'
import type {
  AnimationTarget,
  DriverData,
  KeyframeOptions,
  KeyframeTypeData,
} from '@/types'

const transforms: WeakMap<
  AnimationTarget['value'],
  {
    [key: string]: string
  }
> = new WeakMap()

const filters: WeakMap<
  AnimationTarget['value'],
  {
    [key: string]: string
  }
> = new WeakMap()

export class Keyframe {
  #dataMap: WeakMap<AnimationTarget['value'], DriverData> = new WeakMap()
  #typeMap: WeakMap<AnimationTarget['value'], KeyframeTypeData> = new WeakMap()
  #driver: Driver
  #el: HTMLElement | SVGElement

  constructor(el: AnimationTarget, options: KeyframeOptions, force3d: boolean) {
    const { type, key, value, units, ease, offset, ...dataOptions } = options

    this.#el = el.value
    this.#dataMap.set(this.#el, createDriverData({ el, ...dataOptions }))
    this.#typeMap.set(this.#el, {
      transform: false,
      color: false,
      other: false,
      otherShadow: false,
      filter: false,
      filterShadow: false,
    })

    if (type === 'transform') {
      this.#type.transform = true
      transforms.set(this.#el, {})

      if (force3d) {
        if (key !== 'translateZ') {
          transforms.get(this.#el)!.translateZ = `translateZ(0)`
        }
        el.value.style.willChange = 'transform'
      }
    }
    if (type === 'color') {
      this.#type.color = true
    }
    if (type === 'other') {
      this.#type.other = true
      if (rgxShadow.test(key)) this.#type.otherShadow = true
    }
    if (type === 'filter') {
      this.#type.filter = true
      if (rgxShadow.test(key)) this.#type.filterShadow = true
      filters.set(this.#el, {})
    }

    const onRender = () => {
      if (this.#type.transform) {
        this.#createTransform(options)
        this.#animateMap('transform', transforms)
      }
      if (this.#type.color) this.#animateColor(options)
      if (this.#type.other) this.#animateOther(options, this.#type.otherShadow)
      if (this.#type.filter) {
        this.#createFilter(options, this.#type.filterShadow)
        this.#animateMap('filter', filters)
      }

      this.onRender()
    }

    const onComplete = () => {
      if (this.#type.transform && force3d) {
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

  get #data(): DriverData {
    return this.#dataMap.get(this.#el)!
  }

  get #type(): KeyframeTypeData {
    return this.#typeMap.get(this.#el)!
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
