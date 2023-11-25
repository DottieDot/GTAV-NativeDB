import { alpha, styled } from '@mui/material'
import { ReactNode } from 'react'

const Container = styled('div')(({ theme }) => ({
  height:          '100%',
  backgroundColor: alpha(theme.palette.background.default, .75),
  borderRadius:    theme.shape.borderRadius * 2,
  overflow:        'hidden'
}))

export interface AppContentProps {
  children :ReactNode
}

export function AppContent({ children }: AppContentProps) {
  return (
    <Container>
      {children}
    </Container>
  )
}
