import { Divider, Paper, Stack, styled } from '@mui/material'
import { Home as HomeIcon, GitHub as GitHubIcon, Apps as AppsIcon, Settings as SettingsIcon } from '@mui/icons-material'
import { ReactNode } from 'react'
import { RibbonButton } from './RibbonButton'

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
  display: 'inline-grid',
  gridArea: 'content',
  gridTemplateRows: 'auto 1fr',
  overflowY: 'auto',
  maxWidth: '100%'
})

const Logo = styled('img')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(0.5)
}))

export default function AppRibbon({ children }: AppRibbonProps) {
  return (
    <Container>
      <Ribbon elevation={4}>
        <Stack gap={1}>
          <Logo src="/GTA5/android-chrome-192x192.png" alt="app logo" />
          <RibbonButton href="/home">
            <HomeIcon fontSize="inherit" />
          </RibbonButton>
          <RibbonButton href="/gta5/natives">
            V
          </RibbonButton>
          <RibbonButton href="/rdr3/natives">
            II
          </RibbonButton>
          <RibbonButton href="/hash">
            #
          </RibbonButton>
        </Stack>
        <Stack gap={1} sx={{ alignSelf: 'end' }}>
          <Divider />
          <RibbonButton href="/home">
            <SettingsIcon fontSize="inherit" />
          </RibbonButton>
          <RibbonButton href="/home">
            <GitHubIcon fontSize="inherit" />
          </RibbonButton>
          <RibbonButton href="/gta5/natives">
            <AppsIcon fontSize="inherit" />
          </RibbonButton>
        </Stack>
      </Ribbon>
      <Content>
        {children}
      </Content>
    </Container>
  )
}
