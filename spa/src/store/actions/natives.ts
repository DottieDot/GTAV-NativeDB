import { Native, NativeStats } from '../model'
import Namespace from '../model/Namespace'
import { NativeDataLoader } from '../../external'

export const SET_NATIVES = 'SET_NATIVES'

export interface SetNatives {
  type      : typeof SET_NATIVES
  natives   : { [hash: string]: Native }
  namespaces: { [name: string]: Namespace }
  stats     : NativeStats
}

export function setNatives({ namespaces, natives }: NativeDataLoader): SetNatives {
  const stats: NativeStats = {
    namespaces: Object.keys(namespaces).length,
    natives   : Object.keys(natives).length,
    comments  : Object.values(natives).reduce((accumulator, { comment }) => {
      accumulator += +!!comment
      return accumulator
    }, 0),
    knownNames: Object.values(natives).reduce((accumulator, native) => {
      accumulator.total += +(native.name.slice(0, 2) !== '_0')
      accumulator.confirmed += +(native.name[0] !== '_')
      return accumulator
    }, { total: 0, confirmed: 0 })
  }
  
  return {
    type: SET_NATIVES,
    natives,
    namespaces,
    stats
  }
}
