import { upperFirst } from 'lodash'
import preval from 'preval.macro'
import { Game } from '../context'

function getGamePath(game: Game) {
  switch (game) {
    case Game.GrandTheftAuto5:
      return '/gta5'
    case Game.RedDeadRedemption2:
      return '/rdr3'
  }
}

export function createShareUrl(path: string, game?: Game) {
  const gamePath = game !== undefined ? getGamePath(game) : ''

  return `${window.location.origin}${gamePath}${path}`
}

export function isDevelopment() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

export function joaat(key: string): number {
  let hash = 0
  for (let i = 0, length = key.length; i < length; i++) {
    hash += key.charCodeAt(i)
    hash += (hash << 10)
    hash ^= (hash >>> 6)
  }
  hash += (hash << 3)
  hash ^= (hash >>> 11)
  hash += (hash << 15)

  return hash
}

export const buildDate: string = preval`module.exports = new Date().toString()`

export { default as getOverlayAlpha } from './getOverlayAlpha'

export function toPascalCase(name: string, joinChar = ''): string {
  return name.toLocaleLowerCase().split('_').map((part,) => upperFirst(part)).join(joinChar)
}

export * from './hashing'
