import { Paper, Stack, styled } from '@mui/material'
import { Home as HomeIcon } from '@mui/icons-material'
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
  gridTemplateRows: 'auto 1fr'
})

export default function AppRibbon({ children }: AppRibbonProps) {
  return (
    <Container>
      <Ribbon elevation={4}>
        <Stack gap={1}>
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
      </Ribbon>
      <Content>
        {children}
      </Content>
    </Container>
  )
}
