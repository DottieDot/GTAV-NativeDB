import { AppBar as MaterialAppBar, Box, IconButton, Link, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { MoreVert as MoreIcon,  ShowChart as StatsIcon, Code as CodeIcon } from '@mui/icons-material'
import React, { MouseEvent, MouseEventHandler, useCallback, useMemo, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { AppBarAction as AppBarActionProps } from '.'
import { useAppBarSettings, useGameUrl } from '../../hooks'
import { AppBarProps } from './model'
import StatsDialog from './StatsDialog'
import StatusButton from './StatusButton'
import DesktopSearch from './DesktopSearch'
import { Game, useSelectedGameContext } from '../../context'

function AppBarAction({ text, mobileIcon, buttonProps: { href, target, onClick, ...buttonProps } }: AppBarActionProps) {
  const navigate = useNavigate()

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(e => {
    if (href) {
      if (href.includes('://') || target) {
        window.open(href, target)
      }
      else {
        navigate(href)
      }
    }

    onClick && onClick(e)
  }, [href, target, onClick, navigate])

  return (
    <MenuItem onClick={handleClick}>
      {mobileIcon && <ListItemIcon>
        {React.createElement(mobileIcon)}
      </ListItemIcon>}
      {text}
    </MenuItem>
  )
}

function Mobile({ ...rest }: AppBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [statsDialog, setStatsDialog] = useState(false)
  const settings = useAppBarSettings()

  const handleMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [setAnchorEl])

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const handleStatsDialogOpen = useCallback(() => {
    setStatsDialog(true)
  }, [setStatsDialog])

  const handleStatsDialogClose = useCallback(() => {
    setStatsDialog(false)
  }, [setStatsDialog])

  const generateCodeUrl = useGameUrl('/generate-code')

  const actions: AppBarActionProps[] = useMemo(() => [
    ...(settings.actions ?? []),
    {
      text: 'Stats',
      mobileIcon: StatsIcon,
      buttonProps: {
        onClick: handleStatsDialogOpen
      }
    },
    {
      text: 'Generate Code',
      mobileIcon: CodeIcon,
      buttonProps: {
        href: generateCodeUrl
      }
    }
  ], [settings, handleStatsDialogOpen, generateCodeUrl])

  const shortTitle = useSelectedGameContext() === Game.GrandTheftAuto5 ? 'GTA5 NDB' : 'RDR3 NDB'
  const nativesUrl = useGameUrl('/natives')

  return (
    <Box {...rest}>
      <StatsDialog open={statsDialog} onClose={handleStatsDialogClose} />
      <MaterialAppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div">
            <Link
              to={nativesUrl}
              color="inherit"
              underline="none"
              component={RouterLink}
            >
              {settings?.title ?? shortTitle}
            </Link>
          </Typography>
          {settings.search ? (
            <Box sx={{ flex: 1, ml: 2 }}>
              <DesktopSearch search={settings.search} />
            </Box>
          ) : (
            <Box sx={{ flex: 1}} />
          )}
          <StatusButton />
          <IconButton onClick={handleMenuOpen} color="inherit" aria-label="more">
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
          >
            {actions.map(action => (
              <AppBarAction
                key={action.text}
                {...action}
              />
            ))}
          </Menu>
        </Toolbar>
      </MaterialAppBar>
    </Box>
  )
}
export default Mobile
