import { DottieDotAdditionalNativeDataJson } from './model'

export default async function LoadDottieDotAdditionalData(): Promise<DottieDotAdditionalNativeDataJson | null> {
  try {
    const response = await fetch('https://raw.githubusercontent.com/DottieDot/gta5-additional-nativedb-data/main/natives.json')

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
