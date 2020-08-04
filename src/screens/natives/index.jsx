import React from 'react'
import { Grid, makeStyles, Portal, TextField } from '@material-ui/core'
import List from './List'
import Info from './Info'
import { useAppBar } from '../../components/AppBarProvider'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { search } from '../../store/actions/search'

const useStyles = makeStyles(theme => ({
  descriptionPane: {
    background: theme.palette.background.default,
    height: 'inherit',
  },
  nativesPane: {
    background: theme.palette.background.paper,
    height: 'inherit',
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
  const [query, setQuery] = useState('')

  return (
    <React.Fragment>
      <Portal container={toolbar.current}>
        <TextField
          className={classes.searchField}
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            dispatch(search(e.target.value))
          }}
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
