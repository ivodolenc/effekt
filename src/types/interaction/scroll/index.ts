export type OnScroll = (progress: number) => void

export interface ScrollOptions {
  source?: HTMLElement
  axis?: 'x' | 'y'
}
