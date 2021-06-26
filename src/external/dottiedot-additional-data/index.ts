import { AdditionalNativeDataJson } from './model'

export default async function LoadDottieDotAdditionalData(): Promise<AdditionalNativeDataJson | null> {
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
