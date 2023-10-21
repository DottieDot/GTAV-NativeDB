import { Divider, Typography, styled } from '@mui/material'
import { HomeRepairService as HomeRepairServiceIcon, Storage as Alloc8orNdbIcon } from '@mui/icons-material'
import AppTile from './AppTile'

const Container = styled('div')(({ theme }) => ({ padding: theme.spacing(2) }))

const AppGrid = styled('div')(({ theme }) => ({
  display:             'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap:                 theme.spacing(2),

  '&:not(:last-of-type)': { marginBottom: theme.spacing(2) }
}))

export default function Apps() {
  return (
    <Container>
      <Typography component="h2" variant="overline">
        External Tools
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <AppGrid>
        <AppTile
          icon={<HomeRepairServiceIcon fontSize="inherit" />}
          text="Pleb Masters: Forge"
          url="https://forge.plebmasters.de/"
        />

        <AppTile
          icon={<Alloc8orNdbIcon fontSize="inherit" />}
          text="Alloc8or NativeDB"
          url="https://alloc8or.re/gta5/nativedb/"
        />
      </AppGrid>
    </Container>
  )
}
