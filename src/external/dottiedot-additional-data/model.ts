
export interface DottieDotCodeExample {
  lang: string
  code: string
}


export interface DottieDotAdditionalNativeData {
  old_names: string[]
  examples: DottieDotCodeExample[]
}

export type DottieDotAdditionalNativeDataJson = {
  [hash: string]: DottieDotAdditionalNativeData
}
