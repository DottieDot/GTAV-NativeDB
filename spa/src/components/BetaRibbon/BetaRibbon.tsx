import { styled, Paper } from '@mui/material'
import React from 'react'

const Container = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  background: theme.palette.secondary.dark,
  color: theme.palette.getContrastText(theme.palette.secondary.dark),
  zIndex: 99999999,
  bottom: 10,
  right: -60,
  padding: theme.spacing(2, 10),
  transform: 'rotate(-45deg)'
}))

export default function BetaRibbon() {
  return (
    <Container elevation={4}>
      BETA
    </Container>
  )
}
