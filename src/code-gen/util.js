
const translations = {
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

export const transformTypeToNativeType = 
  (type) => {
    const baseType = type.split(/(\*| )/g)[0]
    const res = Object.keys(translations).find(v => v === baseType)
    return res ? type.replace(baseType, translations[res]) : type
  } 

export const transformParamTypesToNativeTypes = 
  (params) => params.reduce(
    (accumulator, param, index) => {
      accumulator[index] = {
        name: param.name,
        type: transformTypeToNativeType(param.type)
      }
      return accumulator
    }, []
  )