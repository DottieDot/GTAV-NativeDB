import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { NativeListItem } from '../components'

const useStyles = makeStyles(theme => ({
  descriptionPane: {
    background: theme.palette.background.default
  },
  nativesPane: {
    background: theme.palette.background.paper,
    overflowX: 'hidden'
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid className={classes.descriptionPane} md={4} xs={12} item>

      </Grid>
      <Grid className={classes.nativesPane} md={8} xs={12} item>
        <NativeListItem
          name="CREATE_VEHICLE"
          params={[				{
            "type": "Hash",
            "name": "modelHash"
          },
          {
            "type": "float",
            "name": "x"
          },
          {
            "type": "float",
            "name": "y"
          },
          {
            "type": "float",
            "name": "z"
          },
          {
            "type": "float",
            "name": "heading"
          },
          {
            "type": "BOOL",
            "name": "isNetwork"
          },
          {
            "type": "BOOL",
            "name": "netMissionEntity"
          },
          {
            "type": "BOOL",
            "name": "p7"
          }]}
          return_type="Vehicle"
        />
      </Grid>
    </Grid>
  )
}
