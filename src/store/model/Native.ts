import NativeParam from './NativeParam'

export default interface Native {
  namespace : string
  name      : string
  jhash    ?: string
  hash      : string
  comment   : string
  params    : NativeParam[]
  returnType: string
  build     : string
}
