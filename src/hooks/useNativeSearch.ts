import { useMemo } from 'react'
import { Namespace, Native } from '../store'
import useTypedSelector from './useTypedSelector'

interface SearchData {
  name       ?: string
  namespace  ?: string
  build      ?: string
  description?: string
  all         : string
}

function parseSearchQuery(searchQuery: string) {
  const result: SearchData = {
    all: ''
  }
  const regex = /((\w+):(\w+))|((\w+):"(.+?(?="))")|(\w+)/g
  let m;

  while ((m = regex.exec(searchQuery.toLocaleLowerCase())) !== null) {
    if (m.index === regex.lastIndex) {
      ++regex.lastIndex
    }

    const matches = m.filter(m => m)
    if (matches.length === 2) {
      result.all += m[0]
    }
    else if (matches.length === 4) {
      switch (matches[2]) {
        case 'name':
          result.name = matches[3].trim()
          break
        case 'namespace':
          result.namespace = matches[3].trim()
          break
        case 'build':
          result.build = matches[3].trim()
          break
        case 'description':
          result.description = matches[3]
          break
        default:
          break
      }
    }
  }

  return result
}

function matchNative2(search: string, native: Native) {
  let nameMatches = false
  if (search) {
    const names = [...(native.oldNames ?? []), native.hash, native.jhash, native.name]
    for (const name of names) {
      if (name?.toLocaleLowerCase().indexOf(search) !== -1) {
        nameMatches = true
        break
      }
    }
  }
  else {
    nameMatches = true
  }

  const buildMatches = search
    ? native.build === search
    : true

  const namespaceMathces = search
    ? native.namespace.toLocaleLowerCase() === search
    : true

  const descriptionMatches = search
    ? native.comment
      .toLowerCase()
      .indexOf(search) !== -1
    : true

  return nameMatches 
    || buildMatches
    || namespaceMathces
    || descriptionMatches
}

function matchNative(searchData: SearchData, native: Native) {
  let nameMatches = false
  if (searchData.name) {
    const names = [...(native.oldNames ?? []), native.hash, native.jhash, native.name]
    for (const name of names) {
      if (name?.toLocaleLowerCase().indexOf(searchData.name) !== -1) {
        nameMatches = true
        break
      }
    }
  }
  else {
    nameMatches = true
  }

  const buildMatches = searchData.build
    ? native.build === searchData.build
    : true

  const namespaceMathces = searchData.namespace
    ? native.namespace.toLocaleLowerCase() === searchData.namespace
    : true

  const descriptionMatches = searchData.description
    ? native.comment
      .toLowerCase()
      .indexOf(searchData.description) !== -1
    : true

  return matchNative2(searchData.all, native)
    && nameMatches 
    && buildMatches
    && namespaceMathces
    && descriptionMatches
}

export default function useNativeSearch(searchQuery: string) {
  const natives = useTypedSelector(state => state.natives)
  return useMemo(() => {
    const searchData = parseSearchQuery(searchQuery)
    return Object.values(natives).reduce<{[name: string]: Namespace}>((accumulator, native) => {
      if (matchNative(searchData, native)) {
        if (!accumulator[native.namespace]) {
          accumulator[native.namespace] = {
            name: native.namespace,
            natives: []
          }
        }
        accumulator[native.namespace].natives.push(native.hash)
      }
      return accumulator
    }, {})
  }, [natives, searchQuery])
}
