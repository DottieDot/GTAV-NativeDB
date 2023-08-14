import { Backdrop, Divider, Fab, Paper, Stack, styled } from '@mui/material'
import { GitHub as GitHubIcon, Apps as AppsIcon, Settings as SettingsIcon, Menu as HamburgerIcon } from '@mui/icons-material'
import { MouseEventHandler, ReactNode, useCallback, useState } from 'react'
import { RibbonButton } from './RibbonButton'
import SettingsDrawer from './SettingsDrawer'
import AppsPopover from './AppsPopover'
import { useIsSmallDisplay } from '../../hooks'
import AppsDialog from './AppsDialog'

export interface AppRibbonProps {
  children: ReactNode
}

const Container = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gridTemplateAreas: '"ribbon content"',
  height: '100%',
  position: 'relative'
})

const Ribbon = styled(Paper)(({ theme }) => ({
  display: 'inline-grid',
  gridArea: 'ribbon',
  zIndex: 1200,
  alignItems: 'baseline',
  padding: theme.spacing(0.5),
  width: `calc(2.5rem + ${theme.spacing(1)})`,
  '&.expanded': {
    width: '15rem',
    padding: theme.spacing(0.5)
  },
  [theme.breakpoints.down('sm')]: {
    width: 0,
    padding: theme.spacing(0),
    position: 'absolute',
    height: '100%'
  },
  transition: 'width ease-in-out .1s',
  overflow: 'hidden',
  borderRadius: 0
}))

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gridArea: 'content',
  gridTemplateRows: 'auto 1fr',
  overflowY: 'auto',
  position: 'relative'
})

const Logo = styled('img')(({ theme }) => ({
  width: '2.5rem',
  padding: theme.spacing(0.5)
}))

const MobileFab = styled(Fab)(({ theme }) => ({
  width: '2.3rem',
  height: '3rem',
  position: 'sticky',
  bottom: theme.spacing(2),
  left: theme.spacing(2),

 [theme.breakpoints.up('sm')]: {
  display: 'none'
 }
}))

const CloseMenuBackdrop = styled(Backdrop)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  },
  zIndex: '1101'
}))

export default function AppRibbon({ children }: AppRibbonProps) {
  const [settings, setSettings] = useState(false)
  const [appsAnchorEl, setAppsAnchorEl] = useState<HTMLElement | null>(null)
  const [expanded, setExpanded] = useState(false)
  const isSmall = useIsSmallDisplay()

  const handleAppsOpen = useCallback<MouseEventHandler<HTMLElement>>(event => {
    setAppsAnchorEl(event.currentTarget)
  }, [setAppsAnchorEl])
  
  const handleApsClose = useCallback(() => {
    setAppsAnchorEl(null)
  }, [setAppsAnchorEl])
  
  const handleOpenSettings = useCallback(() => {
    setSettings(true)
  }, [setSettings])

  const handleMenuOpen = useCallback(() => {
    setExpanded(true)
  }, [])

  const handleMenuClose = useCallback(() => {
    setExpanded(false)
  }, [])

  return (
    <Container>
      <Ribbon elevation={4} className={expanded ? 'expanded' : ''}>
        <Stack gap={1}>
          <Logo src="/GTA5/android-chrome-192x192.png" alt="app logo" />
          <RibbonButton href="/gta5/natives" activeHref="/gta5" label="GTA5 Natives">
            V
          </RibbonButton>
          <RibbonButton href="/rdr3/natives" activeHref="/rdr3" label="RDR3 Natives">
            II
          </RibbonButton>
          <RibbonButton href="/hash" label="Hashing">
            #
          </RibbonButton>
        </Stack>
        <Stack gap={1} sx={{ alignSelf: 'end' }}>
          <Divider />
          <RibbonButton onClick={handleOpenSettings} label="Settings">
            <SettingsIcon fontSize="inherit" />
          </RibbonButton>
          <RibbonButton href="https://github.com/DottieDot/GTAV-NativeDB" target="_blank" label="View on GitHub">
            <GitHubIcon fontSize="inherit" />
          </RibbonButton>
          <RibbonButton onClick={handleAppsOpen} label="Apps">
            <AppsIcon fontSize="inherit" />
          </RibbonButton>
        </Stack>
      </Ribbon>
      <Content>
        {children}
        <MobileFab color="default" onClick={handleMenuOpen}>
          <HamburgerIcon />
        </MobileFab>
      </Content>
      <SettingsDrawer
        open={settings}
        onClose={setSettings}
      />
      {isSmall ? (
        <AppsDialog
          open={!!appsAnchorEl}
          onClose={handleApsClose}
        />
      ) : ( 
        <AppsPopover
          anchorEl={appsAnchorEl}
          onClose={handleApsClose}
          open={!!appsAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        />
      )}
      <CloseMenuBackdrop open={expanded} onClick={handleMenuClose} />
    </Container>
  )
}
