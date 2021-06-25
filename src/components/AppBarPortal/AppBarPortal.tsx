import { Portal } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { useAppBar } from '../../hooks'

export interface AppBarPortalProps {
  children: ReactNode
}

export default function AppBarPortal({ children }: AppBarPortalProps) {
  const toolbar = useAppBar()

  return (
    <Portal container={toolbar?.current}>
      {children}
    </Portal>
  )
}
