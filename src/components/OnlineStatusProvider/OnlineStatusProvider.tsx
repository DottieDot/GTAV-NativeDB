import { useState, useEffect, ReactNode } from 'react'
import { useCallback } from 'react'
import { createContext } from 'react'

export const onlineStatusContext = createContext(true)

export interface OnlineStatusProviderProps {
  children: ReactNode
}

export default function OnlineStatusProvider({ children }: OnlineStatusProviderProps) {
  const [ online, setOnline ] = useState(true)
  const handleOnline = useCallback(() => {
    setOnline(true)
  }, [ setOnline ])
  const handleOffline = useCallback(() => {
    setOnline(false)
  }, [ setOnline ])

  useEffect(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOffline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [ handleOnline, handleOffline ])

  return (
    <onlineStatusContext.Provider value={online}>
      {children}
    </onlineStatusContext.Provider>
  )
}
