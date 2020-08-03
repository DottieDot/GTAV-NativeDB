import React from 'react'
import NativeType from './NativeType'
import NativeParams from './NativeParams'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  mono: {
    fontFamily: '"Roboto Mono", monospace'
  },
})

export default ({ name, params, return_type, noWrap = false, boldName = false }) => {
  const classes = useStyles()
  
  return (
    <span 
      className={classes.mono}
      style={{
        whiteSpace: noWrap ? 'nowrap' : undefined,
      }}
    >
      <NativeType name={return_type} />
      <span style={{ fontWeight: boldName ? 600 : undefined }}>
        {' '}{name}
      </span>
      <NativeParams params={params} />
    </span>
  )
}
