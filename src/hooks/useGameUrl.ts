import { Game, useSelectedGameContext } from '../context'

export default function useGameUrl(path: string): string {
  switch (useSelectedGameContext()) {
    case Game.GrandTheftAuto5:
      return `/gta5${path}`
    case Game.RedDeadRedemption2:
      return `/rdr3${path}`
  }
}
