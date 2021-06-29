import useTypedSelector from './useTypedSelector'

export default function useUpdateAvailable() {
  return useTypedSelector(state => state.app.updateReady)
}
