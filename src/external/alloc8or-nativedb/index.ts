import { getGame } from '../../constants'
import { Alloc8orNativeJson } from './model'

function getUrl() {
  switch (getGame()) {
    case 'GTA5':
      return 'https://raw.githubusercontent.com/alloc8or/gta5-nativedb-data/master/natives.json'
    case 'RDR3':
      return 'https://raw.githubusercontent.com/alloc8or/rdr3-nativedb-data/master/natives.json'
  }
}

export default async function LoadAlloc8orNatives(): Promise<Alloc8orNativeJson | null> {
  try {
    const response = await fetch(getUrl())

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
