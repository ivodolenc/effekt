import { setStyle } from '@/dom'
import { interpolate } from '@/utils'
import type { ElementData } from '@/types/dom/data'

export function createInterpolation(
  element: HTMLElement | SVGElement,
  elementData: ElementData,
  progress: number,
): void {
  const { transform, color, other } = elementData
  const transformLength = transform.length
  const colorLength = color.length
  const otherLength = other.length

  if (transformLength) {
    let styles = ''

    for (let i = 0; i < transformLength; i++) {
      const [key, values, unit, offset, ease] = transform[i]

      const interpolator = interpolate(values, offset, { ease })(progress)

      styles += `${key}(${interpolator}${unit})`
    }

    setStyle(element, 'transform', styles)
  }

  if (colorLength) {
    for (let i = 0; i < colorLength; i++) {
      const [key, values, , offset, ease] = color[i]

      const options = { ease, color: true }
      const interpolator = interpolate(values, offset, options)(progress)

      setStyle(element, key, `rgba(${interpolator})`)
    }
  }

  if (otherLength) {
    for (let i = 0; i < otherLength; i++) {
      const [key, values, unit, offset, ease] = other[i]

      const interpolator = interpolate(values, offset, { ease })(progress)

      setStyle(element, key, `${interpolator}${unit}`)
    }
  }
}
