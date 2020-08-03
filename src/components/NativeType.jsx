import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.secondary.main
  }
}))

export default ({ name }) => {
  const classes = useStyles()

  return (
    <span className={classes.root}>{name?.replace(/ /g, '\u00A0')}</span>
  )
}
