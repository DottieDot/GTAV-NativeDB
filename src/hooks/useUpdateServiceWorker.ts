import { useCallback } from 'react'
import useTypedSelector from './useTypedSelector'

export default function useUpdateServiceWorker() {
  const serviceWorkerRegistration = useTypedSelector(state => state.app.serviceWorkerRegistration)
  return useCallback(() => {
    const registrationWaiting = serviceWorkerRegistration?.waiting
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' })
      registrationWaiting.addEventListener('statechange', e => {
        if ((e.target as any | null)?.state === 'activated') {
          window.location.reload();
        }
      })
    }
  }, [serviceWorkerRegistration])
}
