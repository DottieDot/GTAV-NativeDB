import { NativeParam } from '../store'

export function makeNativeNameCPlusPlusCompliant(name: string): string {
  if (name[0] !== '_') {
    return name
  }
  else if (name[1] === '0') {
    return `N${name}`
  }
  else {
    return `${name.substr(1)}_`
  }
}

const gtaTypeNativeTypeMap: {[gtaType: string]: string} = {
  // 'BOOL'      : 'int',
  'Any'       : 'long long',
  'Hash'      : 'unsigned',
  'Ped'       : 'int',
  'Vehicle'   : 'int',
  'Blip'      : 'int',
  'Cam'       : 'int',
  'Objet'     : 'int',
  'Player'    : 'int',
  'Entity'    : 'int',
  'ScrHandle' : 'int',
  'FireId'    : 'int',
  'Pickup'    : 'int',
  'Interior'  : 'int',
  'Object'    : 'int'
}

export function gtaTypeToNativeType(type: string) {
  let result = gtaTypeNativeTypeMap[type]
  if (!result && type.indexOf('*') !== -1) {
    let tmp = gtaTypeNativeTypeMap[type.substr(0, type.length - 1)]
    if (tmp) {
      result = `${tmp}*`
    }
  }
  return result ?? type
}

export function gtaParamsToNativeParams(params: NativeParam[]) {
  return params.map(param => ({
    ...param,
    type: gtaTypeToNativeType(param.type)
  }))
}

const gtaTypeCSharpTypeMap: {[gtaType: string]: string} = {
    'BOOL'       : 'bool',
    'Any'        : 'long',
    'Hash'       : 'uint',
    'Ped'        : 'int',
    'Vehicle'    : 'int',
    'Blip'       : 'int',
    'Cam'        : 'int',
    'Objet'      : 'int',
    'Player'     : 'int',
    'Entity'     : 'int',
    'ScrHandle'  : 'int',
    'FireId'     : 'int',
    'Pickup'     : 'int',
    'Interior'   : 'int',
    'const char*': 'string',
    'Object'     : 'int'
}

export function gtaTypeToCSharpType(type: string) {
  let result = gtaTypeCSharpTypeMap[type]
  if (!result && type.indexOf('*') !== -1) {
    let tmp = gtaTypeCSharpTypeMap[type.substr(0, type.length - 1)]
    if (tmp) {
      result = `${tmp}*`
    }
  }

  result = result ?? type
  if (result.indexOf('*') !== -1) {
    result = `out ${result.substr(0, result.length - 1)}`
  }
  
  return result
}

export function gtaParamsToCSharpParams(params: NativeParam[]) {
  return params.map(param => ({
    ...param,
    type: gtaTypeToCSharpType(param.type)
  }))
}

export function snakeCaseToPascalCase(snakeCaseString: string) {
  return snakeCaseString
    .toLowerCase()
    .replace(/(_|^)(.)/g, (_substring, _group0, group1: string) => group1.toUpperCase())
}

