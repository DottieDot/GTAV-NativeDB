import CodeExample from './CodeExample';
import NativeParam from './NativeParam'

export default interface Native {
  namespace : string
  name      : string
  hash      : string
  comment   : string
  params    : NativeParam[]
  returnType: string
  oldNames ?: string[]
  build    ?: string
  jhash    ?: string
  apiSet   ?: string
  examples ?: CodeExample[]
}
