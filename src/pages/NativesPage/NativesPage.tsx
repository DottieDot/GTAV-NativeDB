import { Grid } from '@material-ui/core'
import React, { memo } from 'react'
import NativeInfo from './NativeInfo'

function NativesPage() {
  return (
    <Grid sx={{ flex: 1 }} container>
      <Grid 
        lg={4} md={5} sm={6} xs={12} item 
        sx={{ display: 'flex' }}
      >
        <NativeInfo />
      </Grid>
      <Grid lg={8} md={7} sm={6} xs={12} item>
        List
      </Grid>
    </Grid>
  )
}
export default memo(NativesPage)
