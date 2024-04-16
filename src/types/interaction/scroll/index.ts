export type OnScroll = (progress: number) => void

export interface ScrollOptions {
  /**
   * Specifies the element whose scroll position drives the progress of the timeline.
   *
   * @default document.documentElement
   */
  source?: HTMLElement
  /**
   * Specifies the scroll axis that drives the progress of the timeline.
   *
   * @default 'y'
   */
  axis?: 'x' | 'y'
}
