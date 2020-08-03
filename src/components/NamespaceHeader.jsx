import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.paper,
    padding: 16,
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
