import _ from 'lodash'
import { Native, NativeParam } from '../store'
import ICodeGenerator, { CodeGenNative, CodeGenType } from './ICodeGenerator'

interface BranchInfo {
  one_line: boolean
}

export interface CodeGeneratorBaseSettings {
  indentation   : string
  lineEnding    : 'crlf' | 'lf'
  compactVectors: boolean
}

export function splitCamelCaseString(str: string): string[] {
  return str.replace(/([A-Z0-9])/g, '_$1').toLowerCase().split('_')
}

export default
abstract class CodeGeneratorBase<TSettings extends CodeGeneratorBaseSettings> implements ICodeGenerator {
  private _result   : string = ''
  private _branches : BranchInfo[] = []
  private _settings : TSettings
  private _blankLine: boolean = false
  private _newLine  : boolean = true

  protected get settings() {
    return this._settings
  }

  constructor(settings: TSettings) {
    this._settings = settings
  }

  private getLineEnding(): string {
    switch (this.settings.lineEnding) {
      case 'lf':
        return '\n'
      case 'crlf':
        return '\r\n'
    }
  }

  private isNewLine(): boolean {
    return this._newLine
  }

  private isOneLineBranch(): boolean {
    return !!_.last(this._branches)?.one_line
  }

  private getIndentation(): string {
    if (this.isOneLineBranch()) {
      return ''
    }
    return this.settings.indentation.repeat(this._branches.length)
  }

  private writeLineEnding(blank: boolean = false): this {
    if (!this.isOneLineBranch() && (!this.isNewLine() || this._blankLine)) {
      this._result += this.getLineEnding()
      this._newLine = true
    }
    this._blankLine = blank
    return this
  }

  protected writeLine(line: string, comment?: string, documentation: boolean = false): this {
    this.writeLineEnding()
    if (this.isOneLineBranch()) {
      this._result += ' '
    }
    this._result += `${this.getIndentation()}${line}`
    if (comment) {
      this._result += ` ${this.formatComment(comment, documentation)}`
    }
    this._newLine = false
    return this
  }

  protected abstract getOpeningBracket(): string | null
  protected abstract getClosingBracket(): string | null

  protected abstract formatComment(comment: string, documentation: boolean): string
  
  abstract addNative(native: CodeGenNative): this
  abstract pushNamespace(name: string): this
  abstract popNamespace(): this
  abstract transformBaseType(type: string, isPointer: boolean): string
  abstract end(): this

  protected pushIndentation(): this {
    ++this._branches.length
    return this
  }

  protected popIndentation(): this {
    --this._branches.length
    return this
  }
  wackIndent(oneLine: boolean): this {
    const brace = this.getOpeningBracket()
    if (brace) {
      if (!oneLine || !this.getClosingBracket()) {
        this.writeLineEnding()
      }
    }

    this._branches.push({
      one_line: oneLine
    })

    return this
  }
  protected pushBranch(oneLine: boolean): this {
    const brace = this.getOpeningBracket()
    if (brace) {
      if (!oneLine || !this.getClosingBracket()) {
        this.writeLineEnding()
      }
      this._result += `${brace}`
      this._newLine = false
    }

    this._branches.push({
      one_line: oneLine
    })

    return this
  }

  protected popBranch(): this {
    const bracket = this.getClosingBracket()
    if (!bracket) {
      return this
    }

    const oneLineBranch = this.isOneLineBranch()
    if (!oneLineBranch) {
      this._branches.pop()
    }
    this.writeLine(bracket)
    if (oneLineBranch) {
      this._branches.pop()
    }
    return this
  }

  protected popBranchWithComment(comment: string, documentation: boolean = false): this {
    const bracket = this.getClosingBracket()
    if (!bracket) {
      return this
    }

    const oneLineBranch = this.isOneLineBranch()
    if (!oneLineBranch) {
      this._branches.pop()
    }
    this.writeLine(`${this.formatComment(comment, documentation)}`)
    if (oneLineBranch) {
      this._branches.pop()
    }
    return this
  }

  protected writeBlankLine(): this {
    return this.writeLineEnding(true)
  }

  protected writeComment(comment: string, documentation: boolean = false): this {
    if (comment) {
      comment.split('\n')
        .map(c => this.formatComment(c, documentation))
        .forEach(c => this.writeLine(c))
    }
    return this
  }

  protected conditional(condition: boolean, fn: (generator: this) => this): this {
    if (condition) {
      return fn(this)
    }
    return this
  }

  private getParamGroup(params: NativeParam[]): [number, string] {
    const set = ['x', 'y', 'z', 'w']

    let group: string = splitCamelCaseString(params[0].name)
      .filter(g => g !== 'x')
      .join('')

    const selected = _.takeWhile(params, ({ name, type }, index) => {
      const split = splitCamelCaseString(name)

      return (
        split.includes(set[index]) &&
        split.filter(g => g !== set[index]).join('') === group &&
        type === 'float'
      )
    })

    return [selected.length, group]
  }

  private getParamNameForParamGroup(_: string, groupName: string) {
    let defaultName = 'vec'

    return groupName
      ? `${groupName.replace(/^(\d)$/, `${defaultName}$1`)}_`
      : defaultName
  }

  private compactParams(nativeName: string, params: NativeParam[]): NativeParam[] {
    if (!this.settings.compactVectors) {
      return params
    }

    let result: NativeParam[] = []

    for (let i = 0; i < params.length; ++i) {
      const [groupLength, groupName] = this.getParamGroup(params.slice(i))

      if (groupLength >= 2) {
        result.push({
          type: `Vector${groupLength}`,
          name: this.getParamNameForParamGroup(nativeName, groupName)
        })
        i += groupLength - 1
      }
      else {
        result.push(params[i])
      }
    }

    return result
  }

  private typeStringToCodeGenType(type: string): CodeGenType {
    const pointers = _.sumBy(type, c => +(c === '*'))
    return {
      pointers: pointers,
      isConst : type.includes('const '),
      baseType: this.transformBaseType(type.replace(/^(--[] |)([A-Z0-9]+)\**$/i, '$2'), !!pointers)
    }
  }

  public nativeToCodeGenNative(native: Native): CodeGenNative {
    return {
      name: native.name,
      hash: native.hash,
      jhash: native.jhash,
      returnType: this.typeStringToCodeGenType(native.returnType),
      oldNames: native.oldNames,
      params: this.compactParams(native.name, native.params).map(({ type, name }) => ({
        type: this.typeStringToCodeGenType(type),
        name: name
      })),
      build: native.build,
      comment: native.comment
    }
  }

  start(): this {
    this._result = ''
    return this
  }

  get(): string {
    return this._result
  }
}
