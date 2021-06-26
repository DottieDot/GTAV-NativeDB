
export interface AdditionalNativeData {
  old_names: string[]
}

export type AdditionalNativeDataJson = {
  [hash: string]: AdditionalNativeData
}
