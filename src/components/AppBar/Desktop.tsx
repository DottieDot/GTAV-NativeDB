import { AppBar as MaterialAppBar, Box, Button, Divider, IconButton, Link, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { GitHub as GithubIcon, Settings as SettingsIcon } from '@material-ui/icons'
import React, { useCallback, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AppBarAction as AppBarActionProps } from '.'
import { useStats } from '../../hooks'
import { AppBarProps } from './model'
import SettingsDrawer from './SettingsDrawer'
import StatusButton from './StatusButton'

function AppBarAction({ text, icon, buttonProps }: AppBarActionProps) {
  if (!icon) {
    return (
      <Button {...buttonProps} color="inherit">
        {text}
      </Button>
    )
  }

  return (
    <Tooltip title={text}>
      <IconButton
        aria-label={text}
        {...buttonProps}
        color="inherit"
      >
        {React.createElement(icon)}
      </IconButton>
    </Tooltip>
  )
}

function Desktop({ toolbarRef, settings, ...rest }: AppBarProps) {
  const stats = useStats()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleSettingsOpen = useCallback(() => {
    setSettingsOpen(true)
  }, [setSettingsOpen])

  const handleSettingsClose = useCallback(() => {
    setSettingsOpen(false)
  }, [setSettingsOpen])

  const actions: AppBarActionProps[] = [
    ...(settings?.actions ?? []),
    {
      text: 'Settings',
      icon: SettingsIcon,
      buttonProps: {
        onClick: handleSettingsOpen
      }
    },
    {
      text: 'View on Github',
      icon: GithubIcon,
      buttonProps: {
        href: 'https://github.com/DottieDot/GTAV-NativeDB',
        target: '_blank'
      }
    }
  ]

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
              {settings?.title ?? 'GTA V Native Reference'}
            </Link>
          </Typography>
          <Box
            sx={{ display: 'flex', flex: 1 }}
            ref={toolbarRef}
          />
          <StatusButton />
          {actions.map(action => (
            <AppBarAction
              key={action.text}
              {...action}
            />
          ))}
        </Toolbar>
        <Divider variant="fullWidth" />
        <Toolbar variant="dense">
          <Typography variant="subtitle1">
            Namespaces:&nbsp;{stats.namespaces}&nbsp;{'| '}
            Natives:&nbsp;{stats.natives}&nbsp;{'| '}
            Comments:&nbsp;{stats.comments}&nbsp;{'| '}
            Known names:&nbsp;{stats.knownNames.confirmed} ({stats.knownNames.total})&nbsp;{'| '}
            <Link
              to="/generate-code"
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
export default Desktop
