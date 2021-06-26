import useTypedSelector from './useTypedSelector'

export default function useNamespaces() {
  return useTypedSelector(state => state.namespaces)
}
