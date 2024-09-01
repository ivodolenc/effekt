export interface InViewOptions {
  root?: Element | Document | null
  margin?: string
  threshold?: number | number[]
}

export type InViewCallback = (entry: IntersectionObserverEntry) => void
