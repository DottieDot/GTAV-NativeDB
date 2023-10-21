import CodeGeneratorBase, { CodeGeneratorBaseSettings } from './CodeGeneratorBase'
import { CodeGenNative, CodeGenType } from './ICodeGenerator'

export interface CSharpCodeGeneratorSettings extends CodeGeneratorBaseSettings {
  generateComments: boolean
  includeNdbLinks : boolean
  includeParams   : boolean
  enumName        : string
  namespaceName   : string
}

export default
class CSharpCodeGenerator extends CodeGeneratorBase<CSharpCodeGeneratorSettings> {
  protected getOpeningBracket(): string | null {
    return '{'
  }

  protected getClosingBracket(): string | null {
    return '}'
  }

  protected formatComment(comment: string): string {
    return `// ${comment}`
  }

  addNative(native: CodeGenNative): this {
    const { generateComments, includeNdbLinks, includeParams } = this.settings

    const params     = native.params.map(({ type, name }) => `${name}: ${this.formatType(type)}`).join(', ')
    const returnType = this.formatType(native.returnType)
    const link       =  `${window.location.origin}/natives/${native.hash}`

    return this
      .conditional(generateComments || includeNdbLinks || includeParams, gen => gen.writeBlankLine())
      .conditional(includeParams, gen => gen.writeComment(`${params} -> ${returnType}`))
      .conditional(generateComments && includeParams && !!native.comment, gen => gen.writeComment(' '))
      .conditional(generateComments, gen => gen.writeComment(native.comment))
      .conditional((generateComments || includeParams) && this.settings.includeNdbLinks && !!native.comment, gen => gen.writeComment(' '))
      .conditional(includeNdbLinks, gen => gen.writeComment(link))
      .writeLine(
        `${this.transformNativeName(native.name)} = ${native.hash},`,
        `${native.jhash} ${native.build ? `b${native.build}` : ''}`
      )
  }

  pushNamespace(name: string): this {
    return this
      .writeComment('='.repeat(24))
      .writeComment(name)
      .writeComment('='.repeat(24))
  }

  popNamespace(): this {
    return this
  }

  transformBaseType(type: string): string {
    return type
  }

  start(): this {
    return super.start()
      .writeComment(`Generated on ${new Date().toLocaleString()}`)
      .writeComment(`${window.location.origin}`)
      .writeBlankLine()
      .writeLine(`namespace ${this.settings.namespaceName}`)
      .pushBranch(false)
      .writeLine(`public enum ${this.settings.enumName} : ulong`)
      .pushBranch(false)
  }

  end(): this {
    return this
      .popBranch()
      .popBranch()
  }

  private transformNativeName(name: string): string {
    if (name.startsWith('_0x')) {
      return `N${name.slice(1)}`
    }
    else {
      return name
    }
  }

  private formatType(type: CodeGenType): string {
    const { baseType } = type

    return `${type.isConst ? 'const ' : ''}${baseType}${'*'.repeat(type.pointers)}`
  }
}
