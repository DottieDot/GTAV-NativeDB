import CodeGeneratorBase, { CodeGeneratorBaseSettings } from './CodeGeneratorBase'
import { CodeGenNative, CodeGenParam, CodeGenType } from './ICodeGenerator'
import { toPascalCase } from '../common'

export interface TSCodeGeneratorSettings extends CodeGeneratorBaseSettings {
  generateComments: boolean
  useNativeTypes: boolean
  includes: string[]
  invokeFunction: string
  invokeSupportsVoid: boolean
  convertHashes: boolean
  oneLineFunctions: boolean
  includeNdbLinks: boolean
}

export function convertTypeToTS(type: string, useNativeTypes: boolean, convertHashes = true) {
  type = type.replaceAll('*', '').replaceAll('const', '').trim()

  switch (type) {
    case 'int': return 'number'
    case 'float': return 'number'
    case 'char': return 'string'
    case 'BOOL': return 'boolean'
    case 'Any': return 'any'
    case 'Object': type = 'ObjectEntity'; break
  }

  if (!useNativeTypes) {
    return type
  }

  switch (type) {
    case 'Hash': return convertHashes ? 'number | string' : 'number'
    case 'Ped': return 'number'
    case 'Vehicle': return 'number'
    case 'Blip': return 'number'
    case 'Cam': return 'number'
    case 'ObjectEntity': return 'number'
    case 'Player': return 'number'
    case 'Entity': return 'number'
    case 'ScrHandle': return 'number'
    case 'FireId': return 'number'
    case 'Pickup': return 'number'
    case 'Interior': return 'number'
    default: return type
  }
}

export default
class TSCodeGenerator extends CodeGeneratorBase<TSCodeGeneratorSettings> {
  start(): this {
    return super.start()
      .writeComment(`Generated on ${new Date().toLocaleString()}`)
      .writeComment(`${window.location.origin}`)
      .writeBlankLine()
  }

  end(): this {
    return this
  }

  transformBaseType(type: string): string {
    return convertTypeToTS(type, this.settings.useNativeTypes, this.settings.convertHashes)
  }

  private transformReturnType(type: string): string {
    switch (type) {
      case 'Vector2':
        return 'number[]'
      case 'Vector3':
        return 'number[]'
      case 'Vector4':
        return 'number[]'
      case 'string | number':
        return 'number'
    }
    return type
  }

  private formatParam({ name, type }: CodeGenParam): string {
    if (name === 'var') name = 'variable'
    return `${name}: ${this.formatType(type)}`
  }

  addNative(native: CodeGenNative): this {
    const name = toPascalCase(native.name)
    const params = native.params.map((param) => this.formatParam(param)).join(', ')
    const invokeParams = [ native.hash, ...native.params.map((v) => this.formatInvokeParam(v, this.settings.convertHashes)) ].join(', ')
    const returnType = this.transformReturnType(this.formatType(native.returnType))
    const returnString = returnType === 'void'
      ? ''
      : 'return '
    const invokeReturn = (returnType === 'void') ? '' : `<${returnType}>`
    const invoker = this.settings.invokeFunction
    const link = `${window.location.origin}/natives/${native.hash}`

    return this
      .conditional(this.settings.generateComments, gen => gen.writeComment(native.comment))
      .conditional(this.settings.generateComments && this.settings.includeNdbLinks && !!native.comment, gen => gen.writeComment(' '))
      .conditional(this.settings.includeNdbLinks, gen => gen.writeComment(link))
      .writeLine(`function ${name}(${params}): ${returnType}`)
      .pushBranch(this.settings.oneLineFunctions)
      .writeLine(`${returnString}${invoker}${invokeReturn}(${invokeParams});`)
      .popBranchWithComment(`${native.hash} ${native.jhash} ${native.build ? `b${native.build}` : ''}`)
  }

  pushNamespace(_name: string): this {
    return this
  }

  popNamespace(): this {
    return this
  }

  protected formatComment(comment: string): string {
    return `// ${comment}`
  }

  protected getOpeningBracket(): string | null {
    return '{'
  }

  protected getClosingBracket(): string | null {
    return '}'
  }

  private formatType(type: CodeGenType): string {
    const { baseType } = type

    return `${baseType}`
  }

  private formatInvokeParam({ name, type }: CodeGenParam, convertHashes: boolean): string {
    if (name === 'var') name = 'variable'

    switch (type.baseType) {
      case 'Vector2':
        return `${name}.x, ${name}.y`
      case 'Vector3':
        return `${name}.x, ${name}.y, ${name}.z`
      case 'Vector4':
        return `${name}.x, ${name}.y, ${name}.z, ${name}.w`
      case 'number | string':
      case 'Hash':
        return convertHashes ? `_ch(${name})` : name
    }

    return name
  }
}
