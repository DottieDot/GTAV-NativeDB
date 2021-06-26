import { Portal } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useAppBar } from '../../hooks'

export interface AppBarPortalProps {
  children: ReactNode
}

export default function AppBarPortal({ children }: AppBarPortalProps) {
  const toolbar = useAppBar()

  // Weird hack to get multiple portals working...
  const setTmp = useState(false)[1]
  useEffect(() => {
    setTmp(true)
  }, [setTmp])

  return (
    <Portal container={toolbar?.current}>
      {children}
    </Portal>
  )
}
