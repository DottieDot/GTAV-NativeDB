
export type SelectedTheme = 'light' | 'dark' | 'system'

export enum NativeSources {
  Alloc8or = 'alloc8or',
  FiveM = 'fivem',
  DottieDot = 'dottiedot',
  SpecialData = 'special'
}

export type NativeDisplayMode = 'C' | 'UML' | 'TS'

export interface Settings {
  theme: SelectedTheme
  sources: NativeSources[]
  nativeDisplayMode: NativeDisplayMode
  nativeTypes: boolean
  compactVectors: boolean
  displayVoidReturnType: boolean
  lightTheme: string
  darkTheme: string
}
