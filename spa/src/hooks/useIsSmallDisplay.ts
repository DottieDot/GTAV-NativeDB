import { useMediaQuery, useTheme } from '@mui/material'

export default function useIsSmallDisplay() {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'))
}
