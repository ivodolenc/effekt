export type AnimationTarget = {
  value: Element
  index: number
  total: number
}

export type AnimationTargets =
  | string
  | Element
  | null
  | (Element | null)[]
  | NodeListOf<Element>
