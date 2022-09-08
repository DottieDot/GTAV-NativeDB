import useTypedSelector from './useTypedSelector'

export default function useNamespace(namespace: string) {
  return useTypedSelector(state => state.namespaces[namespace])
}
