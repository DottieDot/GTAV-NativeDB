import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AdditionalNativeDataJson, LoadAlloc8orNatives, LoadDottieDotAdditionalData, LoadFivemNatives, NativeJson } from './external'
import { useSettings } from './hooks'
import { NativeSources, setNatives } from './store'

async function loadNativeSource(source: NativeSources): Promise<NativeJson | null> {
  switch (source) {
    case NativeSources.Alloc8or:
      return await LoadAlloc8orNatives()
    case NativeSources.FiveM:
      return await LoadFivemNatives()
    default:
      return null
  }
}

function mergeDocuments(documents: NativeJson[]) {
  return documents.reduce<NativeJson>((accumulator, document) => {
    Object.keys(document).forEach(ns => {
      accumulator[ns] = {
        ...accumulator[ns],
        ...document[ns]
      }
    })
    return accumulator
  }, {})
}

export default function NativeLoader() {
  const { sources } = useSettings()
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      const documents: NativeJson[] = []
      for (const source of sources) {
        const doc = await loadNativeSource(source)
        if (doc) {
          documents.push(doc)
        }
      }
      const merged = mergeDocuments(documents)

      let additionalData: AdditionalNativeDataJson | null = null
      if (sources.indexOf(NativeSources.DottieDot) !== -1) {
        additionalData = await LoadDottieDotAdditionalData()
      }

      dispatch(setNatives(merged, additionalData))
    })()
  }, [dispatch, sources])

  return null
}
