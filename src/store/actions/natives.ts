import { Native, NativeStats } from '../model'
import Namespace from '../model/Namespace'
import { NativeJson as Alloc8orNativeJson } from '../../external/alloc8or-nativedb'

export const SET_NATIVES = 'SET_NATIVES'

export interface SetNatives {
  type      : typeof SET_NATIVES
  natives   : { [hash: string]: Native }
  namespaces: { [name: string]: Namespace }
  stats     : NativeStats
}

export function setNatives(nativeJson: Alloc8orNativeJson): SetNatives {
  const namespaces = Object.keys(nativeJson)
    .reduce<SetNatives['namespaces']>((accumulator, namespaceName) => {
      const namespace = nativeJson[namespaceName]
      accumulator[namespaceName] = {
        name: namespaceName,
        natives: Object.keys(namespace)
      }
      return accumulator
    }, {})

  const natives = Object.keys(namespaces)
    .map(name => namespaces[name])
    .reduce<SetNatives['natives']>((accumulator, namespace) => {
      namespace.natives.forEach((nativeHash) => {
        const native = nativeJson[namespace.name][nativeHash]
        accumulator[nativeHash] = {
          namespace : namespace.name,
          name      : native.name,
          jhash     : native.jhash,
          hash      : nativeHash,
          comment   : native.comment,
          params    : native.params,
          returnType: native.return_type,
          build     : native.build
        }
      })

      return accumulator
    }, {})

  const stats: NativeStats = {
    namespaces: Object.keys(namespaces).length,
    natives   : Object.keys(natives).length,
    comments  : Object.values(natives).reduce((accumulator, { comment }) => {
      accumulator += +!!comment
      return accumulator
    }, 0),
    knownNames: Object.values(natives).reduce((accumulator, native) => {
      accumulator.total += +(native.name.substr(0, 2) !== '_0')
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
