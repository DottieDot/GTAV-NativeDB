import { Grid } from '@material-ui/core'
import React, { memo } from 'react'
import { NativeList } from '../../components'
import useNamespaces from '../../hooks/useNamespaces'
import NativeInfo from './NativeInfo'

function NativesPage() {
  const namespaces = useNamespaces()

  return (
    <Grid sx={{ flex: 1 }} container>
      <Grid 
        xl={4} md={5} sm={6} xs={12} item 
        sx={{ display: 'flex' }}
      >
        <NativeInfo />
      </Grid>
      <Grid 
        xl={8} md={7} sm={6} xs={12} item
        sx={{ display: 'flex' }}
      >
        <NativeList 
          namespaces={namespaces}
        />
      </Grid>
    </Grid>
  )
}
export default memo(NativesPage)
