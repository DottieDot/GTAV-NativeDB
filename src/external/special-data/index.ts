import { DocumentRoot } from './model'

export default async function LoadSpecialData(source: string): Promise<DocumentRoot | null> {
  try {
    const response = await fetch(source)

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
