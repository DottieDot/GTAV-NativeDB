import React from 'react'
import NativeType from './NativeType'
import NativeParams from './NativeParams'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  mono: {
    fontFamily: '"Roboto Mono", monospace'
  },
  name: {
    fontWeight: 600
  }
})

export default ({ name, params, return_type, noWrap = false }) => {
  const classes = useStyles()
  
  return (
    <span 
      className={classes.mono}
      style={{
        whiteSpace: noWrap ? 'nowrap' : undefined,
      }}
    >
      <NativeType name={return_type} />
      <span className={classes.name}>
        {' '}{name}
      </span>
      <NativeParams params={params} />
    </span>
  )
}
