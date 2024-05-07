
export type SelectedTheme = 'light' | 'dark' | 'system'

export enum NativeSources {
  Alloc8or = 'alloc8or',
  FiveM = 'fivem',
  DottieDot = 'dottiedot',
  SpecialData = 'special'
}

export type NativeDisplayMode = 'C' | 'UML' | 'TS'

export type NativeOrdering = 'registration' | 'alphabetical'

export interface Settings {
  theme: SelectedTheme
  sources: NativeSources[]
  nativeDisplayMode: NativeDisplayMode
  nativeOrdering: NativeOrdering,
  nativeTypes: boolean
  compactVectors: boolean
  displayVoidReturnType: boolean
  lightTheme: string
  darkTheme: string
}
