import _ from 'lodash'
import CodeGeneratorBase, { CodeGeneratorBaseSettings } from './CodeGeneratorBase'
import { CodeGenNative, CodeGenParam, CodeGenType } from './ICodeGenerator'

export interface CPlusPlusCodeGeneratorSettings extends CodeGeneratorBaseSettings {
  generateComments  : boolean
  useNativeTypes    : boolean
  cppCompliant      : boolean
  includes          : string[]
  invokeFunction    : string
  invokeSupportsVoid: boolean
  oneLineFunctions  : boolean
  includeNdbLinks   : boolean
  sol2Bindings      : boolean
}

export default
class CPlusPlusCodeGenerator extends CodeGeneratorBase<CPlusPlusCodeGeneratorSettings> {
  private cur_namespace: string = '';
  private natives: Map<string, Array<CodeGenNative>> = new Map<string, Array<CodeGenNative>>();

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
    this.clearExtraFiles();

    const NATIVE_DECL = '#ifndef NATIVE_DECL\n' +
      '#if defined(_MSC_VER)\n' +
      '#define NATIVE_DECL __forceinline\n' +
      '#elif defined(__clang__) || defined(__GNUC__)\n' +
      '#define NATIVE_DECL __attribute__((always_inline)) inline\n' +
      '#else\n' +
      '#define NATIVE_DECL inline\n' +
      '#endif\n' +
      '#endif'

    return super.start()
      .writeLine('#pragma once')
      .conditional(this.settings.useNativeTypes, gen => this.settings.cppCompliant ? gen.writeLine('#include <cstdint>') : gen.writeLine('#include <stdint.h>'))
      .conditional(this.settings.sol2Bindings, gen => gen.writeLine('#include <sol/sol.hpp>'))
      .conditional(_.isEmpty(this.settings.includes), gen => 
        this.settings.includes.reduce((gen, include) => (
          gen.writeLine(`#include ${include}`)
        ), gen)
      )
      .writeBlankLine()
      .writeComment(`Generated on ${new Date().toLocaleString()}`)
      .writeComment(`${window.location.origin}`)
      .writeBlankLine()
      .writeLine(NATIVE_DECL)
      .writeBlankLine()
  }

  end(): this {
    if (this.settings.sol2Bindings) {
      this.sol2Bindings();
    }

    return this
  }

  transformBaseType(type: string): string {
    if (type === 'BOOL')
      type = 'bool';

    if (!this.settings.useNativeTypes) {
      return type
    }

    switch (type) {
      case 'int'       : return 'int32_t'
      case 'Void'      : return 'void'
      case 'Any'       : return 'int32_t'
      case 'Hash'      : return 'uint32_t'
      case 'Ped'       : return 'int32_t'
      case 'Vehicle'   : return 'int32_t'
      case 'Blip'      : return 'int32_t'
      case 'Cam'       : return 'int32_t'
      case 'Objet'     : return 'int32_t'
      case 'Player'    : return 'int32_t'
      case 'Entity'    : return 'int32_t'
      case 'ScrHandle' : return 'int32_t'
      case 'FireId'    : return 'int32_t'
      case 'Pickup'    : return 'int32_t'
      case 'Interior'  : return 'int32_t'
      default          : return type
    }
  }

  addNative(native: CodeGenNative): this {
    if (this.settings.sol2Bindings) {
      if (!this.natives.has(this.cur_namespace)){
        this.natives.set(this.cur_namespace, new Array<CodeGenNative>());
      }
      this.natives.get(this.cur_namespace)!.push(native);
    }

    const name         = this.settings.cppCompliant ? this.transformNativeName(native.name) : native.name
    const params       = native.params.map(({ type, name }) => `${this.formatType(type)} ${name}`).join(', ')
    const invokeParams = [native.hash, ...native.params.map(this.formatInvokeParam)].join(', ')
    const returnType   = this.formatType(native.returnType)
    const returnString = returnType === 'void'
      ? '' 
      : 'return ' 
    const invokeReturn = (returnType === 'void' && !this.settings.invokeSupportsVoid) ? 'int' : returnType
    const invoker      = this.settings.invokeFunction
    const link         =  `${window.location.origin}/natives/${native.hash}`

    return this
      .conditional(this.settings.generateComments, gen => gen.writeComment(native.comment))
      .conditional(this.settings.generateComments && this.settings.includeNdbLinks && !!native.comment, gen => gen.writeComment(' '))
      .conditional(this.settings.includeNdbLinks, gen => gen.writeComment(link))
      .writeLine(`NATIVE_DECL ${returnType} ${name}(${params})`)
      .pushBranch(this.settings.oneLineFunctions)
      .writeLine(`${returnString}${invoker}<${invokeReturn}>(${invokeParams});`)
      .popBranchWithComment(`${native.hash} ${native.jhash} ${native.build ? `b${native.build}` : ''}`)
  }

  pushNamespace(name: string): this {
    this.cur_namespace = name;

    return this
      .writeLine(`#pragma region ${name}`)
      .writeComment(`Start of ${name} namespace`)
      .writeLine(`namespace ${name}`)
      .pushBranch(false)
  }

  popNamespace(): this {
    return this
      .popBranch()
      .writeComment(`End of ${this.cur_namespace} namespace`)
      .writeLine(`#pragma endregion ${this.cur_namespace}`)
      .writeBlankLine()
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
    let { baseType } = type

    return `${type.isConst ? 'const ' : ''}${baseType}${'*'.repeat(type.pointers)}`
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

  sol2Bindings() {
    const writer = new CPlusPlusCodeGenerator(this.settings);

    this.writeLine('namespace lua_natives {');
    this.pushIndentation();
    this.writeLine('sol::table CreateSol2Bindings(sol::state& lua_state);');
    this.popIndentation();
    this.writeLine('}');

    writer.writeLine('#pragma once');
    writer.writeLine('#include "natives.hpp"');
    writer.writeBlankLine();

    writer.writeLine('namespace lua_natives {');
    writer.pushIndentation();

    writer.writeLine('sol::table CreateSol2Bindings(sol::state& lua_state) {');
    writer.pushIndentation();

    writer.writeLine('auto root_table = lua_state.create_table_with();');

    this.natives.forEach((v, k) => {
      writer.writeBlankLine();
      writer.writeComment(`Start of ${k} namespace.`);
      writer.writeLine(`auto ${k}_table = lua_state.create_table_with();`);
      v.forEach(native => {
        const name = this.settings.cppCompliant ? this.transformNativeName(native.name) : native.name;
        let native_binding = `${k}_table.set_function("${name}", ${k}::${name});`;
        writer.writeLine(native_binding);
      });
      writer.writeComment(`End of ${k} namespace.`);
    })

    writer.writeBlankLine();
    this.natives.forEach((_, k) => {
      writer.writeLine(`root_table["${k}"] = ${k}_table;`);
    })

    writer.writeBlankLine();
    writer.writeLine('return root_table;');

    writer.popIndentation();
    writer.writeLine('}');

    writer.popIndentation();
    writer.writeLine('}');

    const code = writer.get();

    this.submitExtraFile({
      name: 'natives',
      extension: 'cpp',
      content: code,
      mimeType: 'text/cpp'
    });
  }
}
