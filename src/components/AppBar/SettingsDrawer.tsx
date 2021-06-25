import { Box, Divider, Drawer, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@material-ui/core'
import { Brightness4 as DarkIcon, Brightness6 as SystemIcon, BrightnessHigh as LightIcon, CloseOutlined as CloseIcon } from '@material-ui/icons'
import React from 'react'
import { useIsSmallDisplay } from '../../hooks'

interface SettingsDrawerProps {
  open: boolean
  onClose: () => void
}

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const smallDisplay = useIsSmallDisplay()

  return (
    <Drawer
      anchor={smallDisplay ? 'bottom' : 'right' }
      open={open}
      onClose={onClose}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: smallDisplay ? undefined : 400,
          p: 2
        }}
      >
        <Typography
          variant="h5"
        >
          Settings
        </Typography>
        <IconButton aria-label="close settings" onClick={onClose}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Divider variant="fullWidth" />
      <Box sx={{ p: 2 }}>
        <Stack spacing={1}>
          <div>
            <Typography variant="body1" gutterBottom>
              Theme
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value="system"
              exclusive
              fullWidth
            >
              <ToggleButton value="light"><LightIcon /> Light</ToggleButton>
              <ToggleButton value="system"><SystemIcon /> System</ToggleButton>
              <ToggleButton value="dark"><DarkIcon /> Dark</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Stack>
      </Box>
    </Drawer>
  )
}
