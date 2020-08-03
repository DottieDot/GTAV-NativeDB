import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import List from './List'
import Info from './Info'

const useStyles = makeStyles(theme => ({
  descriptionPane: {
    background: theme.palette.background.default,
  },
  nativesPane: {
    background: theme.palette.background.paper,
  },
  root: {
    overflow: 'hidden',
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.descriptionPane} lg={4} md={5} sm={6} xs={12} item>
        <Info />
      </Grid>
      <Grid className={classes.nativesPane} lg={8} md={7} sm={6} xs={12} item>
        <List />
      </Grid>
    </Grid>
  )
}
