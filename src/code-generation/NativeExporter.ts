import _ from 'lodash'
import { NamespaceReducerState, NativeReducerState } from '../store'
import ICodeGenerator, { CodeGenType } from './ICodeGenerator'

export interface NativeData {
  natives: NativeReducerState,
  namespaces: NamespaceReducerState
}

export default
class NativeExporter {
  createCodeGenerator: () => ICodeGenerator

  private typeStringToCodeGenType(codeGenerator: ICodeGenerator, type: string): CodeGenType {
    return {
      isPointer: type.includes('*'),
      isConst  : type.includes('const '),
      baseType : codeGenerator.transformBaseType(type.replace(/(const|) (\w+)(\*|)/, '$2'))
    }
  }

  constructor(codeGenerator: () => ICodeGenerator) {
    this.createCodeGenerator = codeGenerator
  }

  exportNatives(data: NativeData): string {
    const codeGenerator = this.createCodeGenerator()

    _.forOwn(data.namespaces, (ns) => {
      codeGenerator.pushNamespace(ns.name)
      ns.natives.map(hash => data.natives[hash]).forEach(native => {
        codeGenerator.addNative({
          name      : native.name,
          hash      : native.hash,
          jhash     : native.jhash,
          returnType: this.typeStringToCodeGenType(codeGenerator, native.returnType),
          oldNames  : native.oldNames,
          params    : native.params.map(({ type, name }) => ({ 
            type: this.typeStringToCodeGenType(codeGenerator, type), 
            name: name
          })),
          build     : native.build,
          comment   : native.comment
        })
      })
      codeGenerator.popNamespace()
    })

    return codeGenerator.get()
  }
}
