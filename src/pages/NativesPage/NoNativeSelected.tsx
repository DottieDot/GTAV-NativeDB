import { Typography } from '@mui/material'

export default function NoNativeSelected() {
  return (
    <div>
      <Typography component="h1" variant="h5">
        No native selected.
      </Typography>

      <Typography variant="subtitle1">
        Select a native to display its info here.
      </Typography>
    </div>
  )
}
