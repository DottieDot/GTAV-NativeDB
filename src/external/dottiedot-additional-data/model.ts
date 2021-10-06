
export interface DottieDotCodeExample {
  lang: string
  code: string
}


export interface DottieDotAdditionalNativeData {
  examples: DottieDotCodeExample[]
}

export type DottieDotAdditionalNativeDataJson = {
  [hash: string]: DottieDotAdditionalNativeData
}
