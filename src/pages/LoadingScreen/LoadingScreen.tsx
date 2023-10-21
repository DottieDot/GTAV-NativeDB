import { LinearProgress, Typography, Box, Stack } from '@mui/material'
import { memo } from 'react'

const image = '/GTA5/splash.png'

function LoadingPage() {
  return (
    <Box 
      sx={{
        p:              2,
        display:        'flex',
        flexDirection:  'column',
        flex:           1,
        justifyContent: 'center',
        alignItems:     'center'
      }}
    >
      <Stack spacing={2}>
        <img 
          alt="splash screen logo"
          height="225" 
          src={image}
          style={{ objectFit: 'contain' }}
        />

        <Typography 
          align="center" 
          component="h1"
          variant="h2"
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
