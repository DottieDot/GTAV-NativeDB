import CodeGeneratorBase, { CodeGeneratorBaseSettings, splitCamelCaseString } from './CodeGeneratorBase'
import { CodeGenNative, CodeGenParam, CodeGenType } from './ICodeGenerator'

export interface RustCodeGeneratorSettings extends CodeGeneratorBaseSettings {
  rustNames         : boolean
  generateComments  : boolean
  oneLineFunctions  : boolean
  includeNdbLinks   : boolean
}

export default
class RustCodeGenerator extends CodeGeneratorBase<RustCodeGeneratorSettings> {
  private transformNativeName(name: string): string {
    return name.toLowerCase()
  }

  start(): this {
    return super.start()
      .writeBlankLine()
      .writeComment(`Generated on ${new Date().toLocaleString()}`)
      .writeComment(`${window.location.origin}`)
      .writeBlankLine()
  }

  end(): this {
    return this
  }

  transformBaseType(type: string, isPointer: boolean): string {
    switch (type) {
      case 'void' : return 'Void'
      case 'BOOL' : return isPointer ? 'Bool'  : 'bool'
      case 'int'  : return 'i32'
      case 'float': return 'f32'
      case 'char' : return 'i8'
      default: return type
    }
  }

  addNative(native: CodeGenNative): this {
    const name         = this.settings.rustNames ? this.transformNativeName(native.name) : native.name
    const params       = native.params.map(({ type, name }) => `${this.formatParamName(name)}: ${this.formatType(type)}`).join(', ')
    const returnType   = this.formatType(native.returnType)
    const invokeParams = [ returnType, `${native.hash}u64`, ...native.params.map(p => this.formatInvokeParam(p)) ].join(', ')
    const invoker      = 'call_native!'
    const link         =  `${window.location.origin}/natives/${native.hash}`
    const isVoid       = returnType === 'Void'

    return this
      .conditional(this.settings.generateComments, gen => gen.writeComment(native.comment, true))
      .conditional(this.settings.generateComments && this.settings.includeNdbLinks && !!native.comment, gen => gen.writeComment(' ', true))
      .conditional(this.settings.includeNdbLinks, gen => gen.writeComment(link, true))
      .writeLine(`pub unsafe fn ${name}(${params})${isVoid ? '' : `-> ${returnType}`}`)
      .pushBranch(this.settings.oneLineFunctions)
      .writeLine(`${invoker}(${invokeParams})${isVoid ? ';' : ''}`)
      .popBranchWithComment(`${native.hash} ${native.jhash} ${native.build ? `b${native.build}` : ''}`)
  }

  pushNamespace(name: string): this {
    const n = this.settings.rustNames ? this.transformNativeName(name) : name

    return this
      .writeLine('#[allow(dead_code)]')
      .writeLine(`pub mod ${n}`)
      .pushBranch(false)
      .writeLine('#[allow(unused_imports)]')
      .writeLine('use scripthookv::types::*;')
      .writeLine('use scripthookv::call_native;')
      .writeBlankLine()
  }

  popNamespace(): this {
    return this
      .popBranch()
      .writeBlankLine()
  }

  protected formatComment(comment: string, documentation: boolean): string {
    if (documentation) {
      return `/// ${comment}`
    }

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

    if (type.pointers) {
      return `${'*'.repeat(type.pointers)}${type.isConst ? 'const' : 'mut'} ${baseType}`
    }
    else {
      return baseType
    }
  }

  private formatParamName(name: string): string {
    const tmp = this.settings.rustNames 
      ? splitCamelCaseString(name).map(s => s.toLowerCase()).join('_') 
      : name

    switch (tmp) {
      // I can't be bothered with this
      case 'unk__4_0_0_0_0f': return 'unk'

      case 'type'    : return '_type'
      case 'override': return '_override'
      case 'loop'    : return '_loop'
      default        : return tmp
    }
  }

  private formatInvokeParam({ name }: CodeGenParam): string {
    return this.formatParamName(name)
  }
}
