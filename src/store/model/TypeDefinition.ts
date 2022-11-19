
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
