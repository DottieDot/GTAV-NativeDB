import _ from 'lodash'
import CodeGeneratorBase, { CodeGeneratorBaseSettings } from './CodeGeneratorBase'
import { CodeGenNative, CodeGenParam, CodeGenType } from './ICodeGenerator'

export interface CPlusPlusCodeGeneratorSettings extends CodeGeneratorBaseSettings {
  generateComments  : boolean
  useNativeTypes    : boolean
  cppCompliant      : boolean
  includes          : string[]
  invokeFunction    : string
  invokeSupportsVoid: boolean
  oneLineFunctions  : boolean
  includeNdbLinks   : boolean
}

export default
class CPlusPlusCodeGenerator extends CodeGeneratorBase<CPlusPlusCodeGeneratorSettings> {
  private transformNativeName(name: string): string {
    if (name.startsWith('_0x')) {
      return `N${name.slice(1)}`
    }
    else if (name.startsWith('_')) {
      return `${name.slice(1)}_`
    }
    else {
      return name
    }
  }

  start(): this {
    return super.start()
      .writeLine('#pragma once')
      .conditional(_.isEmpty(this.settings.includes), gen => 
        this.settings.includes.reduce((gen, include) => (
          gen.writeLine(`#include ${include}`)
        ), gen)
      )
      .writeBlankLine()
      .writeComment(`Generated on ${new Date().toLocaleString()}`)
      .writeComment(`${window.location.origin}`)
      .writeBlankLine()
  }

  end(): this {
    return this
  }

  transformBaseType(type: string): string {
    if (!this.settings.useNativeTypes) {
      return type
    }

    switch (type) {
      case 'Hash'      : return 'unsigned'
      case 'Ped'       : return 'int'
      case 'Vehicle'   : return 'int'
      case 'Blip'      : return 'int'
      case 'Cam'       : return 'int'
      case 'Objet'     : return 'int'
      case 'Player'    : return 'int'
      case 'Entity'    : return 'int'
      case 'ScrHandle' : return 'int'
      case 'FireId'    : return 'int'
      case 'Pickup'    : return 'int'
      case 'Interior'  : return 'int'
      default          : return type
    }
  }

  addNative(native: CodeGenNative): this {
    const name         = this.settings.cppCompliant ? this.transformNativeName(native.name) : native.name
    const params       = native.params.map(({ type, name }) => `${this.formatType(type)} ${name}`).join(', ')
    const invokeParams = [native.hash, ...native.params.map(this.formatInvokeParam)].join(', ')
    const returnType   = this.formatType(native.returnType)
    const returnString = returnType === 'void'
      ? '' 
      : 'return ' 
    const invokeReturn = (returnType === 'void' && !this.settings.invokeSupportsVoid) ? 'int' : returnType
    const invoker      = this.settings.invokeFunction
    const link         =  `${window.location.origin}/natives/${native.hash}`

    return this
      .conditional(this.settings.generateComments, gen => gen.writeComment(native.comment))
      .conditional(this.settings.generateComments && this.settings.includeNdbLinks && !!native.comment, gen => gen.writeComment(' '))
      .conditional(this.settings.includeNdbLinks, gen => gen.writeComment(link))
      .writeLine(`static ${returnType} ${name}(${params})`)
      .pushBranch(this.settings.oneLineFunctions)
      .writeLine(`${returnString}${invoker}<${invokeReturn}>(${invokeParams});`)
      .popBranchWithComment(`${native.hash} ${native.jhash} ${native.build ? `b${native.build}` : ''}`)
  }

  pushNamespace(name: string): this {
    return this
      .writeLine(`namespace ${name}`)
      .pushBranch(false)
  }

  popNamespace(): this {
    return this
      .popBranch()
      .writeBlankLine()
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
    let { baseType } = type

    return `${type.isConst ? 'const ' : ''}${baseType}${'*'.repeat(type.pointers)}`
  }

  private formatInvokeParam({ name, type }: CodeGenParam): string {
    if (!type.pointers) {
      switch (type.baseType) {
        case 'Vector2':
          return `${name}.x, ${name}.y`
        case 'Vector3':
          return `${name}.x, ${name}.y, ${name}.z`
        case 'Vector4':
          return `${name}.x, ${name}.y, ${name}.z, ${name}.w`
      }
    }

    return name
  }
}
