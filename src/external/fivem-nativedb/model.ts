
export interface FiveMNativeParam {
  type: string
  name: string
}

export interface FiveMCodeExample {
  lang: string
  code: string
}

export interface FiveMNative {
  name       : string
  description: string
  ns         : string
  game       : string
  apiset     : string
  params     : FiveMNativeParam[]
  results    : string
  hash       : string
  examples   : FiveMCodeExample[]
}

export type FiveMNamespace = { [hash: string]: FiveMNative }

export type FiveMNativeJson = { [name: string]: FiveMNamespace }
