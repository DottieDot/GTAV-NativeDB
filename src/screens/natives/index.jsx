import React from 'react'
import { Grid, makeStyles, Portal, TextField } from '@material-ui/core'
import List from './List'
import Info from './Info'
import { useAppBar } from '../../components/AppBarProvider'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { search } from '../../store/actions/search'
import { useLocation, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  descriptionPane: {
    background: theme.palette.background.default,
    height: 'inherit',
    [theme.breakpoints.down('xs')]: {
      height: '40%'
    }
  },
  nativesPane: {
    background: theme.palette.background.paper,
    height: 'inherit',
    [theme.breakpoints.down('xs')]: {
      height: '60%'
    }
  },
  root: {
    overflow: 'hidden',
    height: '100%',
  },
  searchField: {
    display: 'flex',
    flex: 1,
    margin: theme.spacing(0, 4)
  },
}))

export default () => {
  const classes = useStyles()
  const { toolbar } = useAppBar()
  const dispatch = useDispatch()
  const [query, setQuery] = useState(new URLSearchParams(useLocation().search).get('search') ?? '')
  const history = useHistory()
  const nativesLoaded = useSelector(({ natives }) => !!natives['0x4EDE34FBADD967A6'])

  const updateUrl = () => {
    history.replace(query ? `?search=${encodeURIComponent(query)}` : '?')
  }

  useEffect(() => {
    if (nativesLoaded) {
      dispatch(search(query))
    }
  }, [query, dispatch, nativesLoaded])

  return (
    <React.Fragment>
      <Portal container={toolbar.current}>
        <TextField
          className={classes.searchField}
          value={query}
          onChange={e => {
            setQuery(e.target.value)
          }}
          onBlur={updateUrl}
          placeholder="Search for natives..."
        />
      </Portal>
      <Grid className={classes.root} container>
        <Grid className={classes.descriptionPane} lg={4} md={5} sm={6} xs={12} item>
          <Info />
        </Grid>
        <Grid className={classes.nativesPane} lg={8} md={7} sm={6} xs={12} item>
          <List />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
