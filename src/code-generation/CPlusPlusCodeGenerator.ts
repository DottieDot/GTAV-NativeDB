import { gtaParamsToNativeParams, gtaTypeToNativeType, makeNativeNameCPlusPlusCompliant } from '../common'
import { Namespace, NamespaceReducerState, NativeReducerState } from '../store'

export interface CPlusPlusCodeGeneratorData { 
  natives   : NativeReducerState, 
  namespaces: NamespaceReducerState }
export interface CPlusPlusCodeGeneratorSettings {
  typedefs    : boolean
  comments    : boolean
  cppCompliant: boolean
  shvIncludes : boolean
}

export default class CPlusPlusCodeGenerator {
  settings: CPlusPlusCodeGeneratorSettings
  data: CPlusPlusCodeGeneratorData
  result = ''

  constructor(settings: CPlusPlusCodeGeneratorSettings, data: CPlusPlusCodeGeneratorData) {
    this.settings = settings
    this.data = data
  }

  generateHeader() {
    this.result += '#pragma once\n'
    if (this.settings.shvIncludes) {
      this.result += '#include "types.h"\n'
      this.result += '#include "nativeCaller.h"\n'
    }
    this.result += '\n'
    this.result += `// Generated ${new Date().toLocaleString()}\n`
    this.result += `// https://nativedb.dotindustries.dev/\n`
  }

  generateNative(hash: string) {
    const native = this.data.natives[hash]

    const returnType = !this.settings.typedefs 
      ? gtaTypeToNativeType(native.returnType) 
      : native.returnType
    const params = !this.settings.typedefs
      ? gtaParamsToNativeParams(native.params)
      : native.params

    if (this.settings.comments && native.comment) {
      this.result += `${native.comment.replace(/^/gm, '\t// ')}\n`
    }

    let native_name = this.settings.cppCompliant
      ? makeNativeNameCPlusPlusCompliant(native.name)
      : native.name
    
    this.result += `\tstatic ${returnType} ${native_name}(${params.map(({ type, name }) => `${type} ${name}`).join(', ')})`
    this.result += ` { ${returnType === 'void' ? '' : 'return '}invoke<${returnType === 'void' ? 'Void' : returnType}>`
    this.result += `(${[native.hash, ...params.map(({ name }) => name)].join(', ')}); }`
    this.result += ` // ${native.hash}${native.jhash ? ` ${native.jhash}` : ''} b${native.build}\n`
  }

  generateNamespace({ name, natives }: Namespace) {
    this.result += `\nnamespace ${name}\n{\n`
    natives.forEach(hash => this.generateNative(hash))
    this.result += '}\n'
  }

  generate() {
    this.result = ''

    this.generateHeader()

    Object.values(this.data.namespaces)
      .forEach(ns => this.generateNamespace(ns))
  }

  getCode() {
    return this.result
  }
}
