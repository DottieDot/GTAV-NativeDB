import { useCallback } from 'react'
import { useAppDataContext } from '../context'

export default function useUpdateServiceWorker() {
  const { state: { serviceWorkerRegistration }} = useAppDataContext()

  return useCallback(() => {
    const registrationWaiting = serviceWorkerRegistration?.waiting
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' })
      registrationWaiting.addEventListener('statechange', e => {
        if ((e.target as ServiceWorker | null)?.state === 'activated') {
          window.location.reload()
        }
      })
    }
  }, [ serviceWorkerRegistration ])
}
