import { Typography, alpha, darken, styled } from '@mui/material'
import { NavigationItem } from './NavigationItem'
import { ReactNode } from 'react'

const Frame = styled('div')(({ theme }) => ({
  display:             'grid',
  gridTemplateRows:    'auto 1fr',
  gridTemplateColumns: 'auto 1fr',
  gridTemplateAreas:   `
      'header header'
      'side body'
    `,
  height:          '100%',
  backdropFilter:  'blur(30px)',
  backgroundColor: alpha(darken(theme.palette.primary.main, .8), .5)
}))

const Header = styled('div')(({ theme }) => ({
  gridArea: 'header',
  padding:  theme.spacing(1, 2)
}))

const Side = styled('div')(({ theme }) => ({
  gridArea:      'side',
  padding:       theme.spacing(1),
  width:         250,
  display:       'flex',
  flexDirection: 'column',
  gap:           theme.spacing(1)
}))

const Body = styled('div')(({ theme  }) => ({
  gridArea: 'body',
  padding:  theme.spacing(0, 1, 1, 0),
  overflow: 'hidden'
}))

export interface AppFrameProps {
  children?: ReactNode
}

export function AppFrame({ children }: AppFrameProps) {
  return (
    <Frame>
      <Header>
        <Typography variant="h5">Dot Industries</Typography>
      </Header>

      <Side>
        <NavigationItem activeHref="/gta5" href="/gta5/natives" label="GTA5 Natives">
          V
        </NavigationItem>

        <NavigationItem activeHref="/rdr3" href="/rdr3/natives" label="RDR3 Natives">
          II
        </NavigationItem>

        <NavigationItem href="/hash" label="Hashing">
          #
        </NavigationItem>
      </Side>

      <Body>
        {children}
      </Body>
    </Frame>
  )
}
