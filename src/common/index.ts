import preval from 'preval.macro'
import { NativeParam } from "../store"

// Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
export function getOverlayAlpha(elevation: number): number {
  let alphaValue
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2
  }
  return +(alphaValue / 100).toFixed(2)
}

export function createShareUrl(path: string) {
  return `${window.location.origin}${path}`
}

export function isDevelopment() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

export const buildDate: string = preval`module.exports = new Date().toString()`

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
