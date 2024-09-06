type MarginValue = `${number}${'px' | '%'}`
type MarginType =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`

export interface InViewOptions {
  root?: Document | Element | null
  margin?: MarginType
  threshold?: number | number[]
}

export type InViewCallback = (entry: IntersectionObserverEntry) => void
