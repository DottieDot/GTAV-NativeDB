import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles, Link, TextField } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import { search } from '../store/actions/search'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: 1101,
  },
  subAppbar: {
    background: theme.palette.background.default
  },
  searchField: {
    display: 'flex',
    flex: 1,
    marginLeft: theme.spacing(4)
  }
}))

export default () => {
  const classes = useStyles()
  const stats = useSelector(({ stats }) => stats)
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')

  return (
    <React.Fragment>
      <AppBar
        className={classes.appBar}
        position="relative"
        elevation={0}
        color="default"
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
          <TextField
            className={classes.searchField}
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              dispatch(search(e.target.value))
            }}
            placeholder="Search for natives..."
          />
        </Toolbar>
      </AppBar>
      <AppBar
        className={classes.subAppbar}
        position="relative"
        color="default"
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
