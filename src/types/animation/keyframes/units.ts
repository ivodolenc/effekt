import type { CssVarString } from './'
import type { Easing } from '@/types/shared'

export type UnitString =
  | `${number}px`
  | `${number}pt`
  | `${number}pc`
  | `${number}in`
  | `${number}cm`
  | `${number}mm`
  | `${number}em`
  | `${number}rem`
  | `${number}%`
  | `${number}ex`
  | `${number}ch`
  | `${number}fr`
  | `${number}vw`
  | `${number}vh`
  | `${number}vmin`
  | `${number}vmax`
  | `${number}deg`
  | `${number}rad`
  | `${number}turn`

export interface UnitObject {
  value: number | UnitString | CssVarString
  offset?: number
  ease?: Easing
}
