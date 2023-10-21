import _ from 'lodash'
import { Namespace, Native, TypeDefinition } from '../context'
import LoadAlloc8orNatives from './alloc8or-nativedb'
import LoadDottieDotAdditionalData from './dottiedot-additional-data'
import LoadFivemNatives from './fivem-nativedb'
import LoadSpecialData from './special-data'
import { Game } from '../context'

interface AdditionalNativeData {
  examples?: Native['examples']
}

export default class NativeDataLoader {
  private _game: Game
  
  natives   : { [hash: string]: Native } = {}
  namespaces: { [name: string]: Namespace } = {}
  types     : { [name: string]: TypeDefinition } = {}
  constants : { [name: string]: unknown } = {}

  constructor(game: Game) {
    this._game = game
  }
  

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
          namespace:  native.ns,
          name:       native.name,
          hash:       native.hash,
          comment:    native.description,
          params:     native.params,
          returnType: native.results,
          apiSet:     native.apiset,
          examples:   native.examples
        })
      })
    })
  }

  async loadAlloc8or() {
    const data = await LoadAlloc8orNatives(this._game)

    if (!data) {
      return
    }
    
    Object.keys(data).forEach(namespace => {
      this.addNamespace(namespace)

      const natives  = data[namespace]
      Object.keys(natives).forEach(hash => {
        const native = natives[hash]

        this.addNative({
          namespace:  namespace,
          name:       native.name,
          hash:       hash,
          comment:    native.comment,
          params:     native.params,
          returnType: native.return_type,
          jhash:      native.jhash ?? native.gta_jhash,
          build:      native.build,
          oldNames:   native.old_names,
          gtaHash:    native.gta_hash
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

      this.addAdditionalData(hash, { examples: native.examples })
    })
  }

  async loadSpecialData(dataString: string) {
    const data = await LoadSpecialData(dataString)
    
    if (!data) {
      return
    }

    Object.keys(data.natives).forEach(hash => {
      const native = data.natives[hash]

      if (this.natives[hash]) {
        this.natives[hash] = {
          ...this.natives[hash],
          // Alloc8or's native db has a typo for FORCE_SUBMARINE_NEUTRAL_BUOYANCY
          // Technically the one with the typo is correct? But in the scripts it's used without the typo.
          name:       native.name,
          schComment: native.sch_comment,
          returnType: native.return_type,  
          params:     native.params.map(p => ({
            type:         p.type,
            name:         p.name,
            defaultValue: p.default
          }))
        }
      }
    })

    Object.keys(data.constants).forEach(name => {
      const constant = data.constants[name]

      this.constants[name] = {
        ...constant,
        name
      }
    })

    Object.keys(data.types).forEach(name => {
      const type = data.types[name]

      switch (type.type) {
        case 'Enum':
          this.types[name] = {
            ...type,
            name,
            values: _.mapValues(type.values, (value, key) => ({
              ...value,
              name: key
            }))
          }
          break
        case 'Struct':
          this.types[name] = {
            type:    'Struct',
            comment: type.comment,
            fields:  _.mapValues(type.fields, (value, key) => ({
              name:         key,
              comment:      value.comment,
              typeName:     value.type_name,
              arraySize:    value.array_size,
              defaultValue: value.default_value
            })),
            
            name
          }
          break
        case 'NativeType':
          this.types[name] = {
            type:     type.type,
            aliasFor: type.alias_for,
            comment:  type.comment,
            name
          }
          break
      }
    })
  }
}
