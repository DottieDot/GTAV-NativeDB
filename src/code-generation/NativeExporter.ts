import _ from 'lodash'
import { GameNativeData } from '../context'
import ICodeGenerator from './ICodeGenerator'

export interface NativeData {
  natives   : GameNativeData['natives'],
  namespaces: GameNativeData['namespaces']
}

export default
class NativeExporter {
  codeGenerator: ICodeGenerator

  constructor(codeGenerator: ICodeGenerator) {
    this.codeGenerator = codeGenerator
  }

  exportNatives(data: NativeData): string {
    this.codeGenerator.start()
    _.forOwn(data.namespaces, (ns) => {
      this.codeGenerator.pushNamespace(ns.name)
      ns.natives.map(hash => data.natives[hash]).forEach(native => {
        this.codeGenerator.addNative(this.codeGenerator.nativeToCodeGenNative(native))
      })
      this.codeGenerator.popNamespace()
    })
    this.codeGenerator.end()

    return this.codeGenerator.get()
  }
}
