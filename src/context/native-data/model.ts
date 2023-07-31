export interface NativeParam {
  type: string
  name: string

  // Special data
  defaultValue?: string
}

export interface Native {
  namespace: string
  name: string
  hash: string
  comment: string
  params: NativeParam[]
  returnType: string
  oldNames?: string[]
  build?: string
  jhash?: string
  apiSet?: string
  examples?: CodeExample[]

  // Special data
  schComment?: string

  // RDR3
  gtaHash?: string
}

export interface NativeStats {
  namespaces: number
  natives: number
  comments: number
  knownNames: {
    total: number
    confirmed: number
  }
}

export interface EnumValue {
  comment?: string
  value?: string
  name: string
}

export interface StructField {
  name: string
  comment?: string
  typeName: string
  arraySize?: string
  defaultValue?: string
}

export interface TypeDefinitionEnum {
  type: 'Enum'
  name: string
  comment?: string
  values: { [name: string]: EnumValue }
}

export interface TypeDefinitionStruct {
  type: 'Struct'
  name: string
  comment?: string
  fields: { [name: string]: StructField }
}

export interface TypeDefinitionNativeType {
  name: string
  comment?: string
  aliasFor?: string
  type: 'NativeType'
}

export type TypeDefinition = TypeDefinitionEnum | TypeDefinitionStruct | TypeDefinitionNativeType

export interface Namespace {
  name: string
  natives: string[]
}

export interface ConstDefinition {
  comment?: string
  type_name: string
  value: string
  name: string
}

export interface CodeExample {
  lang: string
  code: string
}

export enum Game {
  GrandTheftAuto5,
  RedDeadRedemption2
}
