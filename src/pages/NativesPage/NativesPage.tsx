import { Grid, SwipeableDrawer, useTheme, IconButton, Box, Typography, Paper, alpha } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import React, { memo,useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGameUrl, useIsSmallDisplay } from '../../hooks'
import { getOverlayAlpha } from '../../common'
import NativeInfo from './NativeInfo'
import NativeList from './NativeList'
import { useSearchParams } from 'react-router-dom'

function Desktop() {
  const { native } = useParams<{ native?: string }>()
  
  return (
    <Grid sx={{ flex: 1, overflow: 'hidden' }} container>
      <Grid
        xl={4} md={5} sm={6} xs={12} item
        sx={{ overflow: 'hidden scroll', height: '100%' }}
      >
        <NativeInfo native={native} />
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
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const theme = useTheme()

  const nativesUrl = useGameUrl('/natives')
  
  const handleClose = useCallback(() => {
    navigate({
      pathname: nativesUrl,
      search: search.toString()
    }, { replace: true })
  }, [navigate, search, nativesUrl])

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={!!nativeHash}
      onOpen={() => { }}
      onClose={handleClose}
      PaperProps={{
        sx: {
          height: `calc(100vh - 5px)`,
          borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px`
        }
      }}
      components={{
        Root: 'section'
      }}
    >
      <Paper 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '0px',
          position: 'sticky',
          top: 0,
          p: 1,
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          ...(theme.palette.mode === 'dark' && {
            backgroundImage: `linear-gradient(${alpha(
              '#fff',
              getOverlayAlpha(4),
            )}, ${alpha('#fff', getOverlayAlpha(4))})`,
          }),
          zIndex: 1
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Typography component="h1" variant="h6" align="center">
          Native Details
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Paper>

      <NativeInfo native={nativeHash} />
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
  const mobile = useIsSmallDisplay()

  return mobile ? <Mobile /> : <Desktop />
}
export default memo(NativesPage)
