import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles, Link, IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { GitHub as GithubIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: 1101,
  },
  subAppbar: {
    background: theme.palette.background.default
  },
  githubButton: {
    marginLeft: theme.spacing(1)
  }
}))

export default ({ toolbarRef }) => {
  const classes = useStyles()
  const stats = useSelector(({ stats }) => stats)

  return (
    <React.Fragment>
      <AppBar
        className={classes.appBar}
        position="relative"
        elevation={0}
        color="default"
      >
        <Toolbar ref={toolbarRef}>
          <Typography variant="h6">
            <Link
              to="/natives"
              color="inherit"
              component={RouterLink}
            >
              GTA V Native Reference
            </Link>
          </Typography>
          <IconButton 
            aria-label="View on Github" 
            color="inherit"
            className={classes.githubButton}
            href="https://github.com/DottieDot/GTAV-NativeDB"
            target="_blank"
          >
            <GithubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppBar
        className={classes.subAppbar}
        position="relative"
        color="default"
      >
        <Toolbar variant="dense">
          <Typography variant="subtitle1">
            Namespaces:&nbsp;{stats.namespaces}&nbsp;{'| '}
            Natives:&nbsp;{stats.natives}&nbsp;{'| '}
            Comments:&nbsp;{stats.comments}&nbsp;{'| '}
            Known names:&nbsp;{stats.knownNames.confirmed} ({stats.knownNames.total})&nbsp;{'| '}
            <Link
              to="/generate-header"
              color="inherit"
              component={RouterLink}
            >
              Generate&nbsp;code
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
