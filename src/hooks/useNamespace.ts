import { useNativeDataForGame } from './useNativeDataForGame'

export default function useNamespace(namespace: string) {
  return useNativeDataForGame().namespaces[namespace]
}
