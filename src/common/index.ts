import preval from 'preval.macro'

export function createShareUrl(path: string) {
  return `${window.location.origin}${path}`
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

