import React, { createContext, useRef, useContext } from 'react'
import AppBar from './AppBar'

const Context = createContext()

export const useAppBar = () => useContext(Context)

export default({ children }) => {
  const toolbar = useRef()

  return (
    <Context.Provider value={{ toolbar }}>
      <AppBar 
        toolbarRef={toolbar}
      />
      {children}
    </Context.Provider>
  )
}
