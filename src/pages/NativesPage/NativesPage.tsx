import { Grid } from '@material-ui/core'
import React, { memo } from 'react'
import NativeList from './NativeList'
import NativeInfo from './NativeInfo'

function NativesPage() {
  return (
    <Grid sx={{ flex: 1, overflow: 'hidden' }} container>
      <Grid 
        xl={4} md={5} sm={6} xs={12} item
        sx={{ overflow: 'hidden scroll', height: '100%' }}
      >
        <NativeInfo />
      </Grid>
      <Grid 
        xl={8} md={7} sm={6} xs={12} item
      >
        <NativeList />
      </Grid>
    </Grid>
  )
}
export default memo(NativesPage)
