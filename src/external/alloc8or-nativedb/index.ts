import { Alloc8orNativeJson } from './model'

export default async function LoadAlloc8orNatives(): Promise<Alloc8orNativeJson | null> {
  try {
    const response = await fetch('https://raw.githubusercontent.com/alloc8or/gta5-nativedb-data/master/natives.json')

    if (!response.ok) {
      return null
    }
    
    return await response.json()
  }
  catch (e) {
    return null
  }
}

export * from './model'
