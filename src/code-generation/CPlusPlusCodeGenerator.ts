import CodeGeneratorBase from './CodeGeneratorBase'
import ICodeGenerator, { CodeGenNative, CodeGenType } from './ICodeGenerator'

export default
class CPlusPlusCodeGenerator extends CodeGeneratorBase implements ICodeGenerator {
  transformBaseType(type: string): string {
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
    return this
      .conditional(true /* generate comments? */, gen => gen.writeComment(''))
      .writeLine(`${this.formatType(native.returnType)} ${native.name} ${native.params.map(({ type, name }) => `${this.formatType(type)} ${name}`).join(', ')}`)
      .pushBranch(true)
      .writeLine(`return invoke(${[native.hash, ...native.params.map(({ name }) => name)].join(', ')});`)
      .popBranch()
  }

  pushNamespace(name: string): this {
    return this
      .writeLine(`namespace ${name}`)
      .pushBranch(false)
  }

  popNamespace(): this {
    return this.popBranch()
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
    return `${type.isConst ? 'const ' : ''} ${type.baseType}${type.isPointer ? '*' : ''}`
  }
}
