import { DocumentRoot } from './model'

export default async function LoadSpecialData(): Promise<DocumentRoot | null> {
  try {
    const response = await fetch('http://localhost:8080/natives.json')

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
