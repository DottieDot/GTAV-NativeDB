import { useMediaQuery, useTheme } from '@material-ui/core'

export default function useIsSmallDisplay() {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('sm'))
}
