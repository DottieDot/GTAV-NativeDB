import { LinearProgress, Typography, Box, Stack } from '@mui/material'
import React, { memo } from 'react'

const LoadingPage = () => {
  return (
    <Box 
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack spacing={2}>
        <img 
          src="/splash.png" 
          alt="grand theft auto 5 logo" 
          height="225"
          style={{ objectFit: 'contain' }}
        />
        <Typography 
          variant="h2" 
          component="h1"
          align="center"
          gutterBottom
        >
          Loading Natives
        </Typography>
        <LinearProgress />
      </Stack>
    </Box>
  )
}
export default memo(LoadingPage)
