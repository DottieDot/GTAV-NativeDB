import { AppBarProps } from '@material-ui/core'
import React, { createContext, memo, useState } from 'react'
import AppBar, { AppBarSettings } from '../AppBar'

export const appBarContext = createContext<[AppBarSettings, React.Dispatch<React.SetStateAction<AppBarSettings>>] | null>(null)

export interface AppBarProviderProps extends AppBarProps {
  
}

function AppBarProvider({ children, ...rest }: AppBarProviderProps) {
  const state = useState<AppBarSettings>({})

  return (
    <appBarContext.Provider value={state}>
      <AppBar
        settings={state[0]}
        {...rest}
      />
      {children}
    </appBarContext.Provider>
  )
}
export default memo(AppBarProvider)
