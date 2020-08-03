import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles, fade, Link } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: 1101,
  },
  subAppbar: {
    background: theme.palette.background.default
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
        color="surface"
      >
        <Toolbar>
          <Typography variant="h6">
            <Link
              to="/natives"
              color="inherit"
              component={RouterLink}
            >
              GTA V Native Reference
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar
        className={classes.subAppbar}
        position="relative"
        color="surface"
      >
        <Toolbar variant="dense">
          <Typography variant="subtitle1">
            Namespaces:&nbsp;{stats.namespaces}{' | '}
            Natives:&nbsp;{stats.natives}{' | '}
            Comments:&nbsp;{stats.comments}{' | '}
            Known names:&nbsp;{stats.knownNames.confirmed} ({stats.knownNames.total}){' | '}
            <Link
              to="/generate-header"
              color="inherit"
              component={RouterLink}
            >
              Generate&nbsp;natives.h
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
