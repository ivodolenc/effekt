// Inspired by Scroll Timeline JS API from Scroll Timeline, 1.0.0, Apache-2.0 License, https://github.com/flackr/scroll-timeline
// Rewritten and adapted to Effekt, 0.1.0, MIT License, https://github.com/ivodolenc/effekt

import type {
  TimelineAxis,
  TimelinePhase,
  SourceMeasurements,
  SourceDetails,
  TimelineOptions,
  ScrollTimelineOptions,
  ScrollTimeline as ST,
} from './types'

const timelineOptions: WeakMap<ScrollTimeline, TimelineOptions> = new WeakMap()
const sourceDetails: WeakMap<Element, SourceDetails> = new WeakMap()

/**
 * Specifies event source element.
 */
function scrollEventSource(source: HTMLElement) {
  if (source === document.scrollingElement) return document
  return source
}

/**
 * Calculates a scroll offset that corrects for writing modes, text direction and a logical axis.
 */
function directionAwareScrollOffset(
  source: HTMLElement,
  axis: TimelineAxis,
): number {
  const measurements = sourceDetails.get(source)!.sourceMeasurements
  let currentScrollOffset = measurements.scrollTop

  if (axis === 'x') currentScrollOffset = Math.abs(measurements.scrollLeft)

  return currentScrollOffset
}

/**
 * Calculates scroll offset based on axis and source geometry.
 */
function calculateMaxScrollOffset(
  source: HTMLElement,
  axis: TimelineAxis,
): number {
  const measurements = sourceDetails.get(source)!.sourceMeasurements

  if (axis === 'y') return measurements.scrollHeight - measurements.clientHeight

  return measurements.scrollWidth - measurements.clientWidth
}

/**
 * Read measurements of source element.
 */
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

/**
 * Update measurements of source, and update timelines.
 */
function updateMeasurements(source: HTMLElement) {
  const details = sourceDetails.get(source)!
  details.sourceMeasurements = measureSource(source)

  // Update measurements of the subject of connected view timelines
  for (const ref of details.timelineRefs) ref.deref()

  if (details.updateScheduled) return

  setTimeout(() => {
    // Schedule a task to update timelines after all measurements are completed
    for (const ref of details.timelineRefs) ref.deref()
    details.updateScheduled = false
  })
  details.updateScheduled = true
}

function updateSource(timeline: ScrollTimeline, source: HTMLElement | null) {
  const timelineDetails = timelineOptions.get(timeline)!
  const oldSource = timelineDetails.source
  if (oldSource === source) return

  if (oldSource) {
    const details = sourceDetails.get(oldSource)
    if (details) {
      // Remove timeline reference from old source
      details.timelineRefs.delete(timeline as unknown as WeakRef<ST>)

      // Clean up timeline refs that have been garbage-collected
      const undefinedRefs = Array.from(details.timelineRefs).filter(
        (ref) => typeof ref.deref() === 'undefined',
      )

      for (const ref of undefinedRefs) details.timelineRefs.delete(ref)

      if (details.timelineRefs.size === 0) {
        // All timelines have been disconnected from the source
        // Clean up
        details?.disconnect?.()
        sourceDetails.delete(oldSource)
      }
    }
  }

  timelineDetails.source = source

  if (source) {
    let details = sourceDetails.get(source)!
    if (!details) {
      // This is the first timeline for this source
      // Store a set of weak refs to connected timelines and current measurements
      details = {
        timelineRefs: new Set(),
        sourceMeasurements: measureSource(source),
      }
      sourceDetails.set(source, details)

      // Use resize observer to detect changes to source size
      const resizeObserver = new ResizeObserver((entries) => {
        for (let i = 0, l = entries.length; i < l; i++) {
          updateMeasurements(timelineDetails.source!)
        }
      })

      resizeObserver.observe(source)
      for (const child of source.children) resizeObserver.observe(child)

      // Use mutation observer to detect updated style attributes on source element
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
        // Sample and store scroll pos
        details.sourceMeasurements.scrollLeft = source.scrollLeft
        details.sourceMeasurements.scrollTop = source.scrollTop

        for (const ref of details.timelineRefs) ref.deref()
      }

      scrollEventSource(source).addEventListener('scroll', scrollListener)

      details.disconnect = () => {
        resizeObserver.disconnect()
        mutationObserver.disconnect()
        scrollEventSource(source).removeEventListener('scroll', scrollListener)
      }
    }

    // Add a weak ref to the timeline so that we can update it when the source changes
    details.timelineRefs.add(new WeakRef(timeline))
  }
}

export class ScrollTimeline implements ST {
  constructor({
    source = document.documentElement,
    axis = 'y',
  }: ScrollTimelineOptions) {
    timelineOptions.set(this, {
      source: null,
      axis,
    })

    updateSource(this, source)
  }

  cancel(): void {
    const details = sourceDetails.get(this.source)!
    details.disconnect?.()
  }

  get source(): HTMLElement {
    return timelineOptions.get(this)!.source!
  }
  set source(element) {
    updateSource(this, element)
  }

  get axis(): TimelineAxis {
    return timelineOptions.get(this)!.axis
  }
  set axis(axis) {
    timelineOptions.get(this)!.axis = axis
  }

  get phase(): TimelinePhase {
    // Per https://drafts.csswg.org/scroll-animations-1/#phase-algorithm
    // Step 1
    // if source is null
    const container = this.source
    if (!container) return 'inactive'

    const style = getComputedStyle(container)
    // if source does not currently have a CSS layout box
    if (style.display === 'none') return 'inactive'

    // if source's layout box is not a scroll container
    if (
      container !== document.scrollingElement &&
      (style.overflow === 'visible' || style.overflow === 'clip')
    ) {
      return 'inactive'
    }

    return 'active'
  }

  get currentTime(): { value: number } | null {
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

    return maxScrollPos > 0
      ? { value: (100 * scrollPos) / maxScrollPos }
      : { value: 100 }
  }
}
