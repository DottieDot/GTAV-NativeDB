
export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  paper: string
  text: string
  nativeValueHighlight: string
  constantIdentifierHighlight: string
  typeInfoBorderColor: string
  parameterColor: string
  symbolColor: string
}

export interface Theme {
  id: string
  name: string
  mode: 'light' | 'dark'
  colors: ThemeColors
}
