import { transformTypeToNativeType, transformParamTypesToNativeTypes } from './util'

export default class CodeGenerator {
  settings = null
  data = null
  result = null

  constructor(settings, data) {
    this.settings = settings
    this.data = data
  }

  generateHeader() {
    this.result += '#pragma once\n\n'
    this.result += `// Generated ${new Date().toLocaleString()}\n`
    this.result += `// https://nativedb.dotindustries.dev/\n`
  }

  generateNative(hash) {
    const native = this.data.natives[hash]

    const returnType = this.settings.nativeTypes 
      ? transformTypeToNativeType(native.return_type) 
      : native.return_type
    const params = this.settings.nativeTypes
      ? transformParamTypesToNativeTypes(native.params)
      : native.params

    if (this.settings.comments && native.comment) {
      this.result += `${native.comment.replace(/^/gm, '\t// ')}\n`
    }

    let native_name = native.name
    if (this.settings.cpp_complient && native_name[0] === '_') {
      if (native_name[1] === '0') {
        native_name = `N${native_name}`
      }
      else {
        native_name = `${native_name.substr(1)}_`
      }
    }
    
    this.result += `\tstatic ${returnType} ${native_name}(${params.map(({ type, name }) => `${type} ${name}`).join(', ')})`
    this.result += ` { ${returnType === 'void' ? '' : 'return '}invoke<${returnType === 'void' ? 'Void' : returnType}>`
    this.result += `(${[native.hash, ...params.map(({ name }) => name)].join(', ')}); }`
    this.result += ` // ${native.hash}${native.jhash ? ` ${native.jhash}` : ''} b${native.build}\n`
  }

  generateNamespace({ name, natives }) {
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
