
export interface NativeParam {
  type: string
  name: string
}

export interface Native {
  name       : string
  jhash     ?: string
  comment    : string
  params     : NativeParam[]
  return_type: string
  build      : string
}

export type Namespace = { [hash: string]: Native }

export type NativeJson = { [name: string]: Namespace }
