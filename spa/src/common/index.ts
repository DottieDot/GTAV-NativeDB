import preval from 'preval.macro'

export function createShareUrl(path: string) {
  return `${window.location.origin}${path}`
}

export function isDevelopment() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

export const buildDate: string = preval`module.exports = new Date().toString()`

export { default as getOverlayAlpha } from './getOverlayAlpha'

