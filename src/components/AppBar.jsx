import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles, fade } from '@material-ui/core'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  appBar: {
    background: theme.palette.type === 'dark' ? '#333' : theme.palette.primary.main,
    zIndex: 1101,
  },
  subAppbar: {
    background: fade(
      theme.palette.type === 'dark' ? '#3a3a3a' : theme.palette.primary.main, 
      .9
    )
  }
}))

export default () => {
  const classes = useStyles()
  const stats = useSelector(({ stats }) => stats)

  return (
    <React.Fragment>
      <AppBar 
        className={classes.appBar}
        position="relative" 
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6">
            GTA V Native Reference
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar 
        className={classes.subAppbar} 
        position="relative"
      >
        <Toolbar variant="dense">
          <Typography variant="subtitle1">
            Namespaces:&nbsp;{stats.namespaces}{' | '}
            Natives:&nbsp;{stats.natives}{' | '}
            Comments:&nbsp;{stats.comments}{' | '}
            Known names:&nbsp;{stats.knownNames.confirmed} ({stats.knownNames.total}){' | '}
            Generate&nbsp;natives.h
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
