import { alpha, Box, ButtonBase, styled, Typography } from '@mui/material'
import { useMemo } from 'react'

const Container = styled(ButtonBase)(({ theme }) => ({
  display:         'flex',
  flexDirection:   'column',
  padding:         theme.spacing(1),
  backgroundColor: alpha(theme.palette.getContrastText(theme.palette.background.paper), 0.05),
  borderRadius:    theme.shape.borderRadius,
  transition:      'background-color 0.1s ease-in-out',
  '&:hover':       { backgroundColor: alpha(theme.palette.getContrastText(theme.palette.background.paper), 0.1) },
  
  '&.active': {
    background: alpha(theme.palette.primary.light, 0.08),
    border:     `1px solid ${theme.palette.primary.main}`,
    color:      theme.palette.primary.dark
  }
}))


export interface AppTileProps {
  icon: React.ReactElement,
  text: string,
  url: string
}

export default function AppTile({ icon, text, url }: AppTileProps) {
  const active = useMemo(() => {
    return window.origin === url
  }, [ url ])

  return (
    <Container 
      className={active ? 'active' : ''} 
      // https://github.com/mui/material-ui/issues/31194
      // @ts-ignore
      component="a" 
      disabled={active} 
      href={url}
      target="_blank"
    >
      <Box
        sx={{
          display:  'inline-flex',
          fontSize: 36,
          pb:       1 
        }}
      >
        {icon}
      </Box>

      <Typography textAlign="center" variant="body1">
        {text}
      </Typography>
    </Container>
  )
}
