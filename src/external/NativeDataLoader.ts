import { Namespace, Native } from '../store'
import LoadAlloc8orNatives from './alloc8or-nativedb'
import LoadDottieDotAdditionalData from './dottiedot-additional-data'
import LoadFivemNatives from './fivem-nativedb'

interface AdditionalNativeData {
  examples?: Native['examples']
}

export default class NativeDataLoader {
  natives   : { [hash: string]: Native } = {}
  namespaces: { [name: string]: Namespace } = {}

  addNative(native: Native) {
    if (this.natives[native.hash]) {
      this.natives[native.hash] = {
        ...native,
        ...this.natives[native.hash]
      }
    }
    else {
      this.natives[native.hash] = native
      this.namespaces[native.namespace].natives.push(native.hash)
    }
  }

  addNamespace(name: string) {
    if (!this.namespaces[name]) {
      this.namespaces[name] = {
        name,
        natives: []
      }
    }
  }
  
  addAdditionalData(hash: string, data: AdditionalNativeData) {
    if (this.natives[hash]) {
      this.natives[hash] = {
        ...this.natives[hash],
        ...data
      }
    }
  }

  async loadFiveM() {
    const data = await LoadFivemNatives()

    if (!data) {
      return
    }
    
    Object.keys(data).forEach(namespace => {
      this.addNamespace(namespace)

      const natives  = data[namespace]
      Object.keys(natives).forEach(hash => {
        const native = natives[hash]

        this.addNative({
          namespace : native.ns,
          name      : native.name,
          hash      : native.hash,
          comment   : native.description,
          params    : native.params,
          returnType: native.results,
          apiSet    : native.apiset,
          examples  : native.examples
        })
      })
    })
  }

  async loadAlloc8or() {
    const data = await LoadAlloc8orNatives()

    if (!data) {
      return
    }
    
    Object.keys(data).forEach(namespace => {
      this.addNamespace(namespace)

      const natives  = data[namespace]
      Object.keys(natives).forEach(hash => {
        const native = natives[hash]

        this.addNative({
          namespace : namespace,
          name      : native.name,
          hash      : hash,
          comment   : native.comment,
          params    : native.params,
          returnType: native.return_type,
          jhash     : native.jhash,
          build     : native.build,
          oldNames  : native.old_names
        })
      })
    })
  }

  async loadDottieDot() {
    const data = await LoadDottieDotAdditionalData()

    if (!data) {
      return
    }
    
    Object.keys(data).forEach(hash => {
      const native = data[hash]

      this.addAdditionalData(hash, {
        examples: native.examples
      })
    })
  }
}
