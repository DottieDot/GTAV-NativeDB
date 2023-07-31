import { Divider, Paper, Stack, styled } from '@mui/material'
import { GitHub as GitHubIcon, Apps as AppsIcon, Settings as SettingsIcon } from '@mui/icons-material'
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
  gridTemplateColumns: '3rem 1fr',
  gridTemplateAreas: '"ribbon content"',
  height: '100%'
})

const Ribbon = styled(Paper)(({ theme } ) => ({
  display: 'inline-grid',
  gridArea: 'ribbon',
  zIndex: 1200,
  alignItems: 'baseline',
  padding: theme.spacing(0.5)
}))

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gridArea: 'content',
  gridTemplateRows: 'auto 1fr',
  overflowY: 'auto'
})

const Logo = styled('img')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(0.5)
}))

export default function AppRibbon({ children }: AppRibbonProps) {
  const [settings, setSettings] = useState(false)
  const [appsAnchorEl, setAppsAnchorEl] = useState<HTMLElement | null>(null)
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

  return (
    <Container>
      <Ribbon elevation={4}>
        <Stack gap={1}>
          <Logo src="/GTA5/android-chrome-192x192.png" alt="app logo" />
          <RibbonButton href="/gta5/natives" activeHref="/gta5">
            V
          </RibbonButton>
          <RibbonButton href="/rdr3/natives" activeHref="/rdr3">
            II
          </RibbonButton>
          <RibbonButton href="/hash">
            #
          </RibbonButton>
        </Stack>
        <Stack gap={1} sx={{ alignSelf: 'end' }}>
          <Divider />
          <RibbonButton onClick={handleOpenSettings}>
            <SettingsIcon fontSize="inherit" />
          </RibbonButton>
          <RibbonButton href="https://github.com/DottieDot/GTAV-NativeDB" target="_blank">
            <GitHubIcon fontSize="inherit" />
          </RibbonButton>
          <RibbonButton onClick={handleAppsOpen}>
            <AppsIcon fontSize="inherit" />
          </RibbonButton>
        </Stack>
      </Ribbon>
      <Content>
        {children}
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
    </Container>
  )
}
