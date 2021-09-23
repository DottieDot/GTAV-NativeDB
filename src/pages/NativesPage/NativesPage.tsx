import { Grid, SwipeableDrawer, useTheme } from '@material-ui/core'
import React, { memo } from 'react'
import { useHistory, useParams } from 'react-router'
import { useIsMobile } from '../../hooks'
import NativeInfo from './NativeInfo'
import NativeList from './NativeList'

function Desktop() {
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

function NativeInfoDrawer() {
  const { native: nativeHash } = useParams<{ native?: string }>()
  const history = useHistory()
  const theme = useTheme()

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={!!nativeHash}
      onOpen={() => { }}
      onClose={() => history.replace('/natives')}
      PaperProps={{
        sx: {
          height: `calc(100vh - 25px)`,
          borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px`
        }
      }}
    >
      <NativeInfo />
    </SwipeableDrawer>
  )
}

function Mobile() {
  return (
    <React.Fragment>
      <Grid sx={{ flex: 1, overflow: 'hidden' }} container>
        <Grid xs={12} item>
          <NativeList />
        </Grid>
      </Grid>
      <NativeInfoDrawer />
    </React.Fragment>

  )
}

function NativesPage() {
  const mobile = useIsMobile()

  return mobile ? <Mobile /> : <Desktop />
}
export default memo(NativesPage)
