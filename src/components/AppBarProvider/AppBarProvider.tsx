import { AppBarProps } from '@material-ui/core'
import React, { memo, createContext, RefObject } from 'react'
import { useRef } from 'react'
import AppBar from '../AppBar'

export const appBarContext = createContext<RefObject<HTMLDivElement> | null>(null)

export interface AppBarProviderProps extends AppBarProps {
  
}

function AppBarProvider({ children, ...rest }: AppBarProviderProps) {
  const toolbarRef = useRef<HTMLDivElement>(null)

  return (
    <appBarContext.Provider value={toolbarRef}>
      <AppBar
        toolbarRef={toolbarRef}
        {...rest}
      />
      {children}
    </appBarContext.Provider>
  )
}
export default memo(AppBarProvider)
