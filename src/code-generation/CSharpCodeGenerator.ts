import { gtaParamsToCSharpParams, gtaTypeToCSharpType, snakeCaseToPascalCase } from '../common'
import { Namespace, NamespaceReducerState, Native, NativeReducerState, NativeParam } from '../store'

export interface CSharpCodeGeneratorData { 
  natives   : NativeReducerState, 
  namespaces: NamespaceReducerState 
}

export interface CSharpCodeGeneratorSettings {
  framework: 'SHVDN' | 'RPH',
  comments: boolean
  usePascalCase: boolean
}

export default class CSharpCodeGenerator {
  settings: CSharpCodeGeneratorSettings
  data: CSharpCodeGeneratorData
  result = ''

  constructor(settings: CSharpCodeGeneratorSettings, data: CSharpCodeGeneratorData) {
    this.settings = settings
    this.data = data
  }

  generateImports() {
    switch (this.settings.framework) {
      case 'SHVDN':
        this.result += 'using GTA.Math;\n'
        this.result += 'using GTA.Native;\n'
        break
      case 'RPH':
        this.result += 'using Rage;\n'
        this.result += 'using Rage.Native;\n'
        break
    }
  }

  generateShvdnFunctionCall(native: Native, returnType: string, params: NativeParam[]) {
    const hasOutParam = params.findIndex(({ type }) => type.indexOf('out ') === 0)
    if (hasOutParam === -1) {
      this.result += `\t\t\treturn Function.Call<${returnType}>((Hash)${native.hash}`
      if (native.params.length) {
        this.result += `, ${params.map(({ name }) => name).join(', ')}`
      }
      this.result += ');\n'
    }
    else {
      const outParams = params.filter(({ type }) => type.indexOf('out ') === 0)

      outParams.forEach(({ name }) => this.result += `\t\t\tvar _out_${name} = new OutputArgument();\n`)
      this.result += '\n'

      this.result += `\t\t\tvar _result = Function.Call<${returnType}>((Hash)${native.hash}`
      if (native.params.length) {
        this.result += `, ${params.map(({ name, type }) => type.indexOf('out ') === 0 ? `_out_${name}` : name).join(', ')}`
      }
      this.result += ');\n'
      this.result += '\n'

      outParams.forEach(({ name, type }) => this.result += `\t\t\t${name} = _out_${name}.GetResult<${type.replace('out ', '')}>();\n`)
      this.result += '\n'

      this.result += '\t\t\treturn _result;\n'
    }
  }

  generateRphFunctionCall(native: Native, returnType: string, params: NativeParam[]) {
    this.result += `\t\t\treturn NativeFunction.Natives.x${native.hash.substr(2)}<${returnType}>(`
    this.result += params.map(({ name, type }) => `${type.indexOf('out ') === 0 ? 'out ' : ''}${name}`).join(', ')
    this.result += ');\n'
  }

  generateNative(hash: string) {
    const native = this.data.natives[hash]

    // Any* could be anything, some struct, an array, or an out param.
    if (native.params.findIndex(({ type }) => type === 'Any*') !== -1) {
      return
    }

    let nativeName = native.name
    if (nativeName[1] === '0') {
      nativeName = `N${nativeName.substr(1)}`
    }
    else if (nativeName[0] === '_') {
      nativeName = `${nativeName.substr(1)}_`
    }

    const name = this.settings.usePascalCase ? snakeCaseToPascalCase(nativeName) : native.name
    const returnType = gtaTypeToCSharpType(native.returnType)
    const params = gtaParamsToCSharpParams(native.params)

    // Not sure how you'd handle something like this in C#
    if (returnType.indexOf('out ') !== -1) {
      return
    }

    if (this.settings.comments && native.comment) {
      this.result += `${native.comment.replace(/^/gm, '\t\t// ')}\n`
    }

    this.result += `\t\tpublic static ${returnType} ${name}`
    this.result += `(${params.map(({ type, name }) => `${type} ${name}`).join(', ')})\n`
    this.result += '\t\t{\n'

    switch (this.settings.framework) {
      case 'SHVDN':
        this.generateShvdnFunctionCall(native, returnType, params)
        break
      case 'RPH':
        this.generateRphFunctionCall(native, returnType, params)
        break
    }

    this.result += '\t\t}\n\n'
  }

  generateNamespace({ name, natives }: Namespace) {
    this.result += `\tpublic static class ${snakeCaseToPascalCase(name)}\n`
    this.result += '\t{\n'
    natives.forEach(hash => this.generateNative(hash))
    this.result += '\t}\n\n'
  }

  generate() {
    this.result = ''

    this.generateImports()

    this.result += '\n'
    this.result += 'namespace YourNamespace.Natives\n'
    this.result += '{\n'

    Object.values(this.data.namespaces)
      .forEach(ns => this.generateNamespace(ns))

    this.result += '}\n'
  }

  getCode() {
    return this.result
  }
}
