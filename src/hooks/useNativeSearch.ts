import { useMemo } from 'react'
import { Namespace, Native } from '../context'
import useNatives from './useNatives'
import useSettings from './useSettings'
import useNamespaces from './useNamespaces'

interface SearchData {
  name       ?: string
  namespace  ?: string
  build      ?: string
  description?: string
  all         : string
}

function parseSearchQuery(searchQuery: string) {
  const result: SearchData = { all: '' }
  const regex = /((\w+):(\w+))|((\w+):"(.+?(?="))")|(\w+)/g
  let m

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

function matchNativeLoose(search: string, native: Native) {
  if (!search) {
    return true
  }

  let nameMatches = false
  const names = [ ...(native.oldNames ?? []), native.hash, native.jhash, native.name ]
  const nameSearch = search.replace(/ |_/gm, '')
  for (const name of names) {
    if (name && name.replaceAll('_', '').toLowerCase().indexOf(nameSearch) !== -1) {
      nameMatches = true
      break
    }
  }

  const buildMatches = search
    ? native.build === search
    : true

  const namespaceMatches = search
    ? native.namespace.toLowerCase() === search
    : true

  const descriptionMatches = search
    ? native.comment
      .toLowerCase()
      .indexOf(search) !== -1
    : true

  return nameMatches 
    || buildMatches
    || namespaceMatches
    || descriptionMatches
}

function matchNativeStrict(searchData: SearchData, native: Native) {
  let nameMatches = false
  if (searchData.name) {
    const names = [ ...(native.oldNames ?? []), native.hash, native.jhash, native.name ]
    for (const name of names) {
      if (name && name.toLowerCase().indexOf(searchData.name) !== -1) {
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

  const namespaceMatches = searchData.namespace
    ? native.namespace.toLowerCase() === searchData.namespace
    : true

  const descriptionMatches = searchData.description
    ? native.comment
      .toLowerCase()
      .indexOf(searchData.description) !== -1
    : true

  return nameMatches 
    && buildMatches
    && namespaceMatches
    && descriptionMatches
}

export default function useNativeSearch(searchQuery: string) {
  const ordering = useSettings().nativeOrdering
  const natives = useNatives()
  const namespaces = useNamespaces()
  return useMemo(() => {
    const searchData = parseSearchQuery(searchQuery)

    const nativesList = Object.values(natives)
    if (ordering === 'alphabetical') {
      nativesList.sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
    }

    return nativesList.reduce<{[name: string]: Namespace}>((accumulator, native) => {
      if (matchNativeStrict(searchData, native) && matchNativeLoose(searchData.all, native)) {
        accumulator[native.namespace].natives.push(native.hash)
      }
      return accumulator
    }, Object.values(namespaces).reduce<{[name: string]: Namespace}>((accumulator, ns) => {
      accumulator[ns.name] = {
        name:    ns.name,
        natives: []
      }
      return accumulator
    }, {}))
  }, [ natives, searchQuery, ordering, namespaces ])
}
