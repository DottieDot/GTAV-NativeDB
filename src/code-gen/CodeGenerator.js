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
    this.result += `// https://nativedb.dotindustries.com/\n`
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
    
    this.result += `\tstatic ${returnType} ${native.name}(${params.map(({ type, name }) => `${type} ${name}`).join(', ')})`
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
