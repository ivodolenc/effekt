// Inspired by Scroll Timeline JS API from Scroll Timeline, 1.0.0, Apache-2.0 License, https://github.com/flackr/scroll-timeline
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

import { timelineDataMap, sourceDataMap } from './data'
import type {
  TimelineAxis,
  TimelinePhase,
  SourceMeasurements,
  ScrollTimelineOptions,
  ScrollTimeline as ST,
} from './types'

function scrollEventSource(source: HTMLElement): HTMLElement | Document {
  if (source === document.scrollingElement) return document
  return source
}

function directionAwareScrollOffset(
  source: HTMLElement,
  axis: TimelineAxis,
): number {
  const measurements = sourceDataMap.get(source)!.sourceMeasurements
  let currentScrollOffset = measurements.scrollTop

  if (axis === 'x') currentScrollOffset = Math.abs(measurements.scrollLeft)

  return currentScrollOffset
}

function calculateMaxScrollOffset(
  source: HTMLElement,
  axis: TimelineAxis,
): number {
  const measurements = sourceDataMap.get(source)!.sourceMeasurements

  if (axis === 'y') return measurements.scrollHeight - measurements.clientHeight

  return measurements.scrollWidth - measurements.clientWidth
}

function measureSource(source: Element): SourceMeasurements {
  return {
    scrollLeft: source.scrollLeft,
    scrollTop: source.scrollTop,
    scrollWidth: source.scrollWidth,
    scrollHeight: source.scrollHeight,
    clientWidth: source.clientWidth,
    clientHeight: source.clientHeight,
  }
}

export function updateMeasurements(source: HTMLElement): void {
  const sourceData = sourceDataMap.get(source)!
  sourceData.sourceMeasurements = measureSource(source)

  for (const ref of sourceData.timelineRefs) ref.deref()

  if (sourceData.updateScheduled) return

  setTimeout(() => {
    for (const ref of sourceData.timelineRefs) ref.deref()
    sourceData.updateScheduled = false
  })
  sourceData.updateScheduled = true
}

function updateSource(
  timeline: ScrollTimeline,
  source: HTMLElement | null,
): void {
  let timelineRef!: WeakRef<ScrollTimeline>
  const timelineData = timelineDataMap.get(timeline)!
  const oldSource = timelineData.source

  if (oldSource === source) return

  if (oldSource) {
    const sourceData = sourceDataMap.get(oldSource)

    if (sourceData) {
      sourceData.timelineRefs.delete(timelineRef)

      const undefinedRefs = Array.from(sourceData.timelineRefs).filter(
        (ref) => typeof ref.deref() === 'undefined',
      )

      for (const ref of undefinedRefs) sourceData.timelineRefs.delete(ref)

      if (sourceData.timelineRefs.size === 0) {
        sourceData?.disconnect?.()
        sourceDataMap.delete(oldSource)
      }
    }
  }

  timelineData.source = source

  if (source) {
    let sourceData = sourceDataMap.get(source)!

    if (!sourceData) {
      sourceData = {
        timelineRefs: new Set(),
        sourceMeasurements: measureSource(source),
      }
      sourceDataMap.set(source, sourceData)

      const resizeObserver = new ResizeObserver((entries) => {
        for (let i = 0, l = entries.length; i < l; i++) {
          updateMeasurements(timelineData.source!)
        }
      })

      resizeObserver.observe(source)
      for (const child of source.children) resizeObserver.observe(child)

      const mutationObserver = new MutationObserver((records) => {
        for (const record of records) {
          if (record.target instanceof HTMLElement) {
            updateMeasurements(record.target)
          }
        }
      })

      mutationObserver.observe(source, {
        attributes: true,
        attributeFilter: ['style', 'class'],
      })

      const scrollListener = () => {
        sourceData.sourceMeasurements.scrollLeft = source.scrollLeft
        sourceData.sourceMeasurements.scrollTop = source.scrollTop

        for (const ref of sourceData.timelineRefs) ref.deref()
      }

      scrollEventSource(source).addEventListener('scroll', scrollListener)

      sourceData.disconnect = () => {
        resizeObserver.disconnect()
        mutationObserver.disconnect()
        scrollEventSource(source).removeEventListener('scroll', scrollListener)
      }
    }

    timelineRef = new WeakRef(timeline)
    sourceData.timelineRefs.add(timelineRef)
  }
}

export class ScrollTimeline implements ST {
  constructor({
    source = document.documentElement,
    axis = 'y',
  }: ScrollTimelineOptions) {
    timelineDataMap.set(this, {
      source: null,
      axis,
    })

    updateSource(this, source)
  }

  cancel(): void {
    const sourceData = sourceDataMap.get(this.source)!
    sourceData.disconnect?.()
  }

  get source(): HTMLElement {
    return timelineDataMap.get(this)!.source!
  }

  get axis(): TimelineAxis {
    return timelineDataMap.get(this)!.axis
  }

  get phase(): TimelinePhase {
    const container = this.source
    if (!container) return 'inactive'

    const style = getComputedStyle(container)

    if (style.display === 'none') return 'inactive'
    if (
      container !== document.scrollingElement &&
      (style.overflow === 'visible' || style.overflow === 'clip')
    ) {
      return 'inactive'
    }

    return 'active'
  }

  get currentTime(): number | null {
    const unresolved = null
    const container = this.source

    if (!container || !container.isConnected) return unresolved
    if (this.phase === 'inactive') return unresolved

    const style = getComputedStyle(container)
    if (style.display === 'inline' || style.display === 'none') {
      return unresolved
    }

    const axis = this.axis
    const scrollPos = directionAwareScrollOffset(container, axis)
    const maxScrollPos = calculateMaxScrollOffset(container, axis)

    return maxScrollPos > 0 ? (100 * scrollPos) / maxScrollPos : 100
  }

  get progress(): number {
    const percentage = this.currentTime === null ? 0 : this.currentTime
    return percentage / 100
  }
}
