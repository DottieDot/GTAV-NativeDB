
export interface CodeGenType {
  isPointer: boolean
  baseType : string
  isConst  : boolean
}

export interface CodeGenParam {
  type: CodeGenType
  name: string
}

export interface CodeGenNative {
  hash       : string
  jhash     ?: string
  params     : CodeGenParam[]
  returnType : CodeGenType
  name       : string
  comment    : string
  build     ?: string
  oldNames  ?: string[]
}

export interface CodeGenFunction {
  returnType: string
  name      : string
  params    : CodeGenParam
}

export default 
interface ICodeGenerator {
  addNative(native: CodeGenNative): this

  pushNamespace(name: string): this

  popNamespace(): this

  transformBaseType(type: string): string
}
