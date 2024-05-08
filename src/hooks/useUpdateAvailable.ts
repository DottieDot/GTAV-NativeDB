import { useAppDataContext } from '../context'

export default function useUpdateAvailable() {
  return useAppDataContext().state.updateReady
}
