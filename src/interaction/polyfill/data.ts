import type { TimelineData, SourceData, ScrollTimeline } from './types'

export const timelineDataMap: WeakMap<ScrollTimeline, TimelineData> =
  new WeakMap()

export const sourceDataMap: WeakMap<Element, SourceData> = new WeakMap()
