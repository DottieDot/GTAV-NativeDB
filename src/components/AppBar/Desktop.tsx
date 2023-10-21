import { Box, Button, Divider, IconButton, Link, AppBar as MaterialAppBar, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AppBarAction as AppBarActionProps } from '.'
import { Game, useSelectedGameContext } from '../../context'
import { useAppBarSettings, useGameUrl, useStats } from '../../hooks'
import DesktopSearch from './DesktopSearch'
import StatusButton from './StatusButton'
import { AppBarProps } from './model'

function AppBarAction({ text, desktopIcon, buttonProps }: AppBarActionProps) {
  if (!desktopIcon) {
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
        {React.createElement(desktopIcon)}
      </IconButton>
    </Tooltip>
  )
}

function Desktop({ ...rest }: AppBarProps) {
  const stats = useStats()
  const settings = useAppBarSettings()

  const actions: AppBarActionProps[] = useMemo(() => [ ...(settings.actions ?? []) ], [ settings ])

  const title = useSelectedGameContext() === Game.GrandTheftAuto5 ? 'GTA5 Native Reference' : 'RDR3 Native Reference'
  const generateCodeUrl = useGameUrl('/generate-code')
  const nativesUrl = useGameUrl('/natives')

  return (
    <Box {...rest}>
      <MaterialAppBar position="sticky">
        <Toolbar>
          <Typography component="div" variant="h6">
            <Link
              color="inherit"
              component={RouterLink}
              to={nativesUrl}
              underline="none"
            >
              {settings?.title ?? title}
            </Link>
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flex:    1 
            }}
          >
            {settings.search && <DesktopSearch search={settings.search} />}
          </Box>

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
            Namespaces:&nbsp;
            {stats.namespaces}&nbsp;{'| '}
            Natives:&nbsp;
            {stats.natives}&nbsp;{'| '}
            Comments:&nbsp;
            {stats.comments}&nbsp;{'| '}
            Known names:&nbsp;
            {stats.knownNames.confirmed}
            {' '}
            (
            {stats.knownNames.total}
            )&nbsp;
            {'| '}

            <Link
              color="inherit"
              component={RouterLink}
              to={generateCodeUrl}
              underline="hover"
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
