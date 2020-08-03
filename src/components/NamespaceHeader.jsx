import React from 'react'
import { Typography, makeStyles, fade } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    background: fade(theme.palette.background.default, .6),
    padding: 16,
    backdropFilter: 'blur(20px)'
  }
}))

export default ({ name, style }) => {
  const classes = useStyles()

  return (
    <div className={classes.root} style={{
      ...style,
      zIndex: 1,
    }}>
      <Typography variant="h4">
        {name}
      </Typography>
    </div>
  )
}
