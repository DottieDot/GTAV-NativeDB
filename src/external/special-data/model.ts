
export interface NativeParam {
  type: string
  name: string
  default?: string
}

export interface Native {
  name: string
  sch_comment?: string
  params: NativeParam[]
  return_type: string
}

export interface EnumValue {
  comment?: string
  value?: string
}

export interface StructField {
  comment?: string
  type_name: string,
  array_size?: string
  default_value?: string
}

export interface TypeDefinitionEnum {
  type: 'Enum'
  comment?: string
  values: { [name: string]: EnumValue }
}

export interface TypeDefinitionStruct {
  type: 'Struct'
  comment?: string
  fields: { [name: string]: StructField }
}

export interface TypeDefinitionNativeType {
  type: 'NativeType'
}

export type TypeDefinition = TypeDefinitionEnum | TypeDefinitionStruct | TypeDefinitionNativeType

export interface ConstDefinition {
  comment?: string
  type_name: string
  value: string
}

export interface DocumentRoot {
  types: { [name: string]: TypeDefinition }
  constants: { [name: string]: ConstDefinition }
  natives: { [hash: string]: Native }
}
