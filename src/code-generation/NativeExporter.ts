import _ from 'lodash'
import { NamespaceReducerState, NativeReducerState } from '../store'
import ICodeGenerator, {CodeGeneratorFile} from './ICodeGenerator'

export interface NativeData {
  natives   : NativeReducerState,
  namespaces: NamespaceReducerState
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

  getExtraFiles(): CodeGeneratorFile[] {
    return this.codeGenerator.getExtraFiles();
  }
}
