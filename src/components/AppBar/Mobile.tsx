import { AppBar as MaterialAppBar, Box, IconButton, Link, ListItemIcon, Menu, MenuItem, Toolbar, Typography, Zoom } from '@material-ui/core'
import { GitHub as GithubIcon, MoreVert as MoreIcon, Search as SearchIcon, Settings as SettingsIcon } from '@material-ui/icons'
import React, { MouseEvent, useCallback, useMemo, useState } from 'react'
import { Link as BrowserLink, Link as RouterLink } from 'react-router-dom'
import { AppBarAction as AppBarActionProps } from '.'
import { useAppBarSettings } from '../../hooks'
import MobileSearch from './MobileSearch'
import { AppBarProps } from './model'
import SettingsDrawer from './SettingsDrawer'
import StatusButton from './StatusButton'

function AppBarAction({ text, mobileIcon, buttonProps }: AppBarActionProps) {
  return (
    <MenuItem {...buttonProps} LinkComponent={BrowserLink}>
      {mobileIcon && <ListItemIcon>
        {React.createElement(mobileIcon)}
      </ListItemIcon>}
      {text}
    </MenuItem>
  )
}

function Mobile({ ...rest }: AppBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const settings = useAppBarSettings()

  const handleSettingsOpen = useCallback(() => {
    setSettingsOpen(true)
  }, [setSettingsOpen])

  const handleSettingsClose = useCallback(() => {
    setSettingsOpen(false)
  }, [setSettingsOpen])

  const handleMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [setAnchorEl])

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const handleSearchOpen = useCallback(() => {
    setSearchOpen(true)
  }, [setSearchOpen])

  const handleSearchClose = useCallback(() => {
    setSearchOpen(false)
  }, [setSearchOpen])

  const actions: AppBarActionProps[] = useMemo(() => [
    ...(settings.actions ?? []),
    {
      text: 'Settings',
      mobileIcon: SettingsIcon,
      buttonProps: {
        onClick: handleSettingsOpen
      }
    },
    {
      text: 'View on Github',
      mobileIcon: GithubIcon,
      buttonProps: {
        href: 'https://github.com/DottieDot/GTAV-NativeDB',
        target: '_blank'
      }
    }
  ], [settings, handleSettingsOpen])

  return (
    <Box {...rest}>
      <SettingsDrawer open={settingsOpen} onClose={handleSettingsClose} />
      <MaterialAppBar position="sticky">
        {settings.search && (
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <Zoom in={searchOpen}>
              <Box sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
                <MobileSearch 
                  search={settings.search}
                  onClose={handleSearchClose}
                />
              </Box>
            </Zoom>
          </Box>
        )}
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
          />
          <StatusButton />
          <IconButton onClick={handleSearchOpen} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton onClick={handleMenuOpen} aria-label="more">
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleMenuClose}
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
