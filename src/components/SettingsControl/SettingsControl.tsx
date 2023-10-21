import { SvgIconComponent } from '@mui/icons-material'
import { Paper, styled, SxProps, Typography } from '@mui/material'
import { createElement, ReactElement } from 'react'

const Container = styled(Paper)(({ theme }) => ({
  display:       'flex',
  flexDirection: 'row',
  alignItems:    'center',
  background:    'none',
  marginTop:     theme.spacing(1),
  padding:       theme.spacing(1),
  paddingLeft:   theme.spacing(2)
}))

const Label = styled(Typography)({
  flex:       1, 
  display:    'flex', 
  alignItems: 'center'
})

export interface SettingsControlProps {
  children?: ReactElement
  sx?: SxProps
  label: string,
  icon?: SvgIconComponent
}

function SettingsControl({ icon, label, children, sx }: SettingsControlProps) {
  return (
    <Container sx={sx} variant="outlined">
      <Label variant="body1">
        {icon && createElement(icon, { fontSize: 'small' })} 
        {' '}
        {label}
      </Label>

      {children}
    </Container>
  )
}

export default SettingsControl
