import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.info.main
  }
}))

export default ({ children }) => {
  const classes = useStyles()

  return (
    <span className={classes.color}>
      {children}
    </span>
  )
}
