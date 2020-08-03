import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.info.main,
    fontFamily: '"Roboto Mono", monospace',
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
