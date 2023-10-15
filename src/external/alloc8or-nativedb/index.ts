import { Game } from '../../context'
import { Alloc8orNativeJson } from './model'

function getUrl(game: Game) {
  switch (game) {
    case Game.GrandTheftAuto5:
      return 'https://raw.githubusercontent.com/alloc8or/gta5-nativedb-data/master/natives.json'
    case Game.RedDeadRedemption2:
      return 'https://raw.githubusercontent.com/alloc8or/rdr3-nativedb-data/master/natives.json'
  }
}

export default async function LoadAlloc8orNatives(game: Game): Promise<Alloc8orNativeJson | null> {
  try {
    const response = await fetch(getUrl(game))

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
