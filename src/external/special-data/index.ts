import { DocumentRoot } from './model'

export default async function LoadSpecialData(dataString: string): Promise<DocumentRoot | null> {
  try {
    const data = JSON.parse(dataString)

    if (typeof data !== 'object') {
      return null
    }

    return data as DocumentRoot
  }
  catch (e) {
    return null
  }
}

export * from './model'
