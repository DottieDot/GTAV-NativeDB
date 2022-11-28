
export interface Alloc8orNativeParam {
  type: string
  name: string
}

export interface Alloc8orNative {
  name       : string
  jhash     ?: string
  comment    : string
  params     : Alloc8orNativeParam[]
  return_type: string
  build      : string
  old_names  : string[]
  gta_hash  ?: string
  gta_jhash ?: string
}

export type Alloc8orNamespace = { [hash: string]: Alloc8orNative }

export type Alloc8orNativeJson = { [name: string]: Alloc8orNamespace }
