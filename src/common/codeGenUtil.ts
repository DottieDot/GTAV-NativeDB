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

const translations: {[gtaType: string]: string} = {
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
}

export function gtaTypeToNativeType(type: string) {
  return translations[type] ?? type
}

export function gtaParamsToNativeParams(params: NativeParam[]) {
  return params.map(param => ({
    ...param,
    type: gtaTypeToNativeType(param.type)
  }))
}
