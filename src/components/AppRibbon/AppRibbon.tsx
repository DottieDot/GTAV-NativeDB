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
  display:             'grid',
  gridTemplateColumns: 'auto 1fr',
  gridTemplateAreas:   '"ribbon content"',
  height:              '100%',
  position:            'relative'
})

const Ribbon = styled(Paper)(({ theme }) => ({
  display:      'inline-grid',
  gridArea:     'ribbon',
  zIndex:       1200,
  alignItems:   'baseline',
  padding:      theme.spacing(0.5),
  width:        `calc(2.5rem + ${theme.spacing(1)})`,
  '&.expanded': {
    width:   '15rem',
    padding: theme.spacing(0.5)
  },
  [theme.breakpoints.down('sm')]: {
    width:    0,
    padding:  theme.spacing(0),
    position: 'absolute',
    height:   '100%'
  },
  transition:   'width ease-in-out .1s',
  overflow:     'hidden',
  borderRadius: 0
}))

const Content = styled('div')({
  display:          'flex',
  flexDirection:    'column',
  gridArea:         'content',
  gridTemplateRows: 'auto 1fr',
  overflowY:        'auto',
  position:         'relative'
})

const Logo = styled('img')(({ theme }) => ({
  width:   '2.5rem',
  padding: theme.spacing(0.5)
}))

const MobileFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom:   theme.spacing(2),
  left:     theme.spacing(2),

  [theme.breakpoints.up('sm')]: { display: 'none' }
}))

const CloseMenuBackdrop = styled(Backdrop)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { display: 'none' },
  zIndex:                       '1101'
}))

export default function AppRibbon({ children }: AppRibbonProps) {
  const [ settings, setSettings ] = useState(false)
  const [ appsAnchorEl, setAppsAnchorEl ] = useState<HTMLElement | null>(null)
  const [ expanded, setExpanded ] = useState(false)
  const isSmall = useIsSmallDisplay()

  const handleAppsOpen = useCallback<MouseEventHandler<HTMLElement>>(event => {
    setAppsAnchorEl(event.currentTarget)
  }, [ setAppsAnchorEl ])
  
  const handleApsClose = useCallback(() => {
    setAppsAnchorEl(null)
  }, [ setAppsAnchorEl ])
  
  const handleOpenSettings = useCallback(() => {
    setSettings(true)
  }, [ setSettings ])

  const handleMenuOpen = useCallback(() => {
    setExpanded(true)
  }, [])

  const handleMenuClose = useCallback(() => {
    setExpanded(false)
  }, [])

  return (
    <Container>
      <Ribbon className={expanded ? 'expanded' : ''} elevation={4}>
        <Stack gap={1}>
          <Logo alt="app logo" src="/GTA5/android-chrome-192x192.png" />

          <RibbonButton activeHref="/gta5" href="/gta5/natives" label="GTA5 Natives">
            V
          </RibbonButton>

          <RibbonButton activeHref="/rdr3" href="/rdr3/natives" label="RDR3 Natives">
            II
          </RibbonButton>

          <RibbonButton href="/hash" label="Hashing">
            #
          </RibbonButton>
        </Stack>

        <Stack gap={1} sx={{ alignSelf: 'end' }}>
          <Divider />

          <RibbonButton label="Settings" onClick={handleOpenSettings}>
            <SettingsIcon fontSize="inherit" />
          </RibbonButton>

          <RibbonButton href="https://github.com/DottieDot/GTAV-NativeDB" label="View on GitHub" target="_blank">
            <GitHubIcon fontSize="inherit" />
          </RibbonButton>

          <RibbonButton label="Apps" onClick={handleAppsOpen}>
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
        onClose={setSettings}
        open={settings}
      />

      {isSmall ? (
        <AppsDialog
          onClose={handleApsClose}
          open={!!appsAnchorEl}
        />
      ) : ( 
        <AppsPopover
          anchorEl={appsAnchorEl}
          anchorOrigin={{
            vertical:   'bottom',
            horizontal: 'right'
          }}
          onClose={handleApsClose}
          open={!!appsAnchorEl}
          transformOrigin={{
            vertical:   'bottom',
            horizontal: 'left'
          }}
        />
      )}

      <CloseMenuBackdrop onClick={handleMenuClose} open={expanded} />
    </Container>
  )
}
