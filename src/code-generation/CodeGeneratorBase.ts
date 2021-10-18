import _ from 'lodash'

interface BranchInfo {
  one_line: boolean
}

export default
abstract class CodeGeneratorBase {
  private result  : string    = ''
  private branches: BranchInfo[] = []

  private getLineEnding(): string {
    return '\n'
  }

  private isNewLine(): boolean {
    return _.last(this.result) === '\n'
  }

  private isOneLineBranch(): boolean {
    return !!_.last(this.branches)?.one_line
  }
  
  private getIndentation(): string {
    if (this.isOneLineBranch()) {
      return ''
    }
    return '\t'.repeat(this.branches.length)
  }

  private writeLineEnding(): this {
    this.result += this.getLineEnding()
    return this
  }

  protected writeLine(line: string): this {
    if (!this.isOneLineBranch()) {
      this.writeLineEnding()
      this.result += this.getIndentation()
    }
    else {
      this.result += ' '
    }
    this.result += line
    return this
  }

  protected abstract getOpeningBracket(): string | null
  protected abstract getClosingBracket(): string | null

  protected abstract formatComment(comment: string): string

  protected pushIndentation(): this {
    ++this.branches.length
    return this
  }

  protected popIndentation(): this {
    --this.branches.length
    return this
  }

  protected pushBranch(oneLine: boolean): this {
    const brace = this.getOpeningBracket()
    if (brace) {
      if ((!oneLine || !this.getClosingBracket()) && !this.isNewLine()) {
        this.writeLineEnding()
      }
      this.result += `${oneLine ? ' ' : this.getIndentation()}${brace}`
    }
    this.branches.push({
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
      if (!this.isNewLine()) {
        this.writeLineEnding()
      }
      this.branches.pop()
    }
    this.writeLine(bracket)
    if (oneLineBranch) {
      this.branches.pop()
    }
    return this
  }

  protected writeComment(comment: string): this {
    if (comment) {
      comment.split('\n')
        .map(c => this.formatComment(c))
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

  get(): string {
    return this.result
  }
}
