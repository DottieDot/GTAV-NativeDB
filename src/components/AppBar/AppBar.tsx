import { AppBar as MaterialAppBar, Box, BoxProps, Divider, IconButton, Link, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { GitHub as GithubIcon, Settings as SettingsIcon } from '@material-ui/icons'
import React, { memo, RefObject, useState, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useStats } from '../../hooks'
import SettingsDrawer from './SettingsDrawer'

export interface AppBarProps extends BoxProps {
  toolbarRef?: RefObject<HTMLDivElement>
}

function AppBar({ toolbarRef, ...rest }: AppBarProps) {
  const stats = useStats()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleSettingsOpen = useCallback(() => {
    setSettingsOpen(true)
  }, [setSettingsOpen])

  const handleSettingsClose = useCallback(() => {
    setSettingsOpen(false)
  }, [setSettingsOpen])

  return (
    <Box {...rest}>
      <SettingsDrawer open={settingsOpen} onClose={handleSettingsClose} />
      <MaterialAppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div">
            <Link
              to="/natives"
              color="inherit"
              underline="none"
              component={RouterLink}
            >
              GTA V Native Reference
            </Link>
          </Typography>
          <Box 
            sx={{ display: 'flex', flex: 1 }} 
            ref={toolbarRef} 
          />
          <Tooltip title="Settings">
            <IconButton
              aria-label="settings" 
              color="inherit"
              onClick={handleSettingsOpen}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View on GitHub">
            <IconButton
              aria-label="view on github" 
              color="inherit"
              href="https://github.com/DottieDot/GTAV-NativeDB/tree/v2"
              target="_blank"
            >
              <GithubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Divider variant="fullWidth" />
        <Toolbar variant="dense">
          <Typography variant="subtitle1">
            Namespaces:&nbsp;{stats.namespaces}&nbsp;{'| '}
            Natives:&nbsp;{stats.natives}&nbsp;{'| '}
            Comments:&nbsp;{stats.comments}&nbsp;{'| '}
            Known names:&nbsp;{stats.knownNames.confirmed} ({stats.knownNames.total})&nbsp;{'| '}
            <Link
              to="/generate-header"
              color="inherit"
              underline="hover"
              component={RouterLink}
            >
              Generate&nbsp;code
            </Link>
          </Typography>
        </Toolbar>
      </MaterialAppBar>
    </Box>
  )
}
export default memo(AppBar)
