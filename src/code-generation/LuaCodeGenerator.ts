import _ from 'lodash'
import CodeGeneratorBase, { CodeGeneratorBaseSettings } from './CodeGeneratorBase'
import { CodeGenNative, CodeGenParam, CodeGenType } from './ICodeGenerator'

export interface LuaCodeGeneratorSettings extends CodeGeneratorBaseSettings {
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
class LuaCodeGenerator extends CodeGeneratorBase<LuaCodeGeneratorSettings> {
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
      .conditional(_.isEmpty(this.settings.includes), gen => 
        this.settings.includes.reduce((gen, include) => (
          gen.writeLine(`#include ${include}`)
        ), gen)
      )
  }

  end(): this {
    return this
  }

  transformBaseType(type: string): string {
    if (!this.settings.useNativeTypes) {
      return '--[[' + type + ']]'
    }
    switch (type) {
      case 'Any'       : return '--[[int]]'
      case 'Hash'      : return '--[[int]]'
      case 'Ped'       : return '--[[int]]'
      case 'Vehicle'   : return '--[[int]]'
      case 'Blip'      : return '--[[int]]'
      case 'Cam'       : return '--[[int]]'
      case 'Object'    : return '--[[int]]'
      case 'Player'    : return '--[[int]]'
      case 'Entity'    : return '--[[int]]'
      case 'ScrHandle' : return '--[[int]]'
      case 'FireId'    : return '--[[int]]'
      case 'Pickup'    : return '--[[int]]'
      case 'Interior'  : return '--[[int]]'
      default          : return '--[[' + type + ']]'
    }
  }
  changeCaseOnRet(v: string): string {
    if (!this.settings.useNativeTypes) {
      switch (v) {     
        case '--[[Any]]'            : return 'Int'
        case '--[[Hash]]'           : return 'Int'
        case '--[[Ped]]'            : return 'Int'
        case '--[[Vehicle]]'        : return 'Int'
        case '--[[Blip]]'           : return 'Int'
        case '--[[Cam]]'            : return 'Int'
        case '--[[Object]]'         : return 'Int'
        case '--[[Player]]'         : return 'Int'
        case '--[[Entity]]'         : return 'Int'
        case '--[[ScrHandle]]'      : return 'Int'
        case '--[[FireId]]'         : return 'Int'
        case '--[[Pickup]]'         : return 'Int'
        case '--[[Interior]]'       : return 'Int'
      }
    }
    switch (v) {
      case '--[[int]]'            : return 'Int'
      case '--[[float]]'          : return 'Float'
      case '--[[bool]]'           : return 'Bool'
      case '--[[BOOL]]'           : return 'Bool'
      case '--[[const char*]]'    : return 'Str'
      case '--[[void]]'           : return 'Void'
      case '--[[Vector3]]'        : return 'Vec3'
      default : return v
    }
  }

  addNative(native: CodeGenNative): this {
    const name         = this.settings.cppCompliant ? this.transformNativeName(native.name) : native.name
    const params       = native.params.map(({ type, name }) => `${this.formatType(type)} ${name}`).join(', ')
    const invokeParams = [native.hash, ...native.params.map(this.formatInvokeParam)].join(', ')
    const returnType   = this.formatType(native.returnType)
    const returnString = returnType === 'Void'
      ? '' 
      : 'return ' 
    const invokeReturn = (returnType === 'Void' && !this.settings.invokeSupportsVoid) ? 'Void' : returnType
    const invoker      = this.settings.invokeFunction
    const link         =  `${window.location.origin}/natives/${native.hash}`
    const mod = this.changeCaseOnRet(invokeReturn)
    return this
      .conditional(this.settings.generateComments, gen => gen.writeComment(native.comment))
      .conditional(this.settings.generateComments && this.settings.includeNdbLinks && !!native.comment, gen => gen.writeComment(' '))
      .conditional(this.settings.includeNdbLinks, gen => gen.writeComment(link))
      .writeLine(`['${name}'] = function(${params})`)
      .wackIndent(this.settings.oneLineFunctions)
      .writeLine(`${returnString}${invoker}${mod}(${invokeParams}) end,`)
      .popBranchWithComment(`${native.hash} ${native.jhash} ${native.build ? `b${native.build}` : ''}`)
  }

  pushNamespace(name: string): this {
    return this
      .writeLine(`${name}={`)
      .wackIndent(false)
  }

  popNamespace(): this {
    return this
      .popBranch()
  }

  protected formatComment(comment: string): string {
    return `--${comment}`
  }

  protected getOpeningBracket(): string | null {
    return '{'
  }

  protected getClosingBracket(): string | null {
    return '}'
  }

  private formatType(type: CodeGenType): string {
    let { baseType } = type

    return `${type.isConst ? '' : ''}${baseType}${''.repeat(type.pointers)}`
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
