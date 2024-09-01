export type Mix<T> = (p: number) => T
export type Mixer<T> = (from: T, to: T) => Mix<T>
export type MixerType = 'color' | 'shadow'
