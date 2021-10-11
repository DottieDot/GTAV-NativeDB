import { Typography } from '@mui/material'
import React from 'react'

export default function NoNativeSelected() {
  return (
    <div>
      <Typography variant="h5" component="h1">
        No native selected.
      </Typography>
      <Typography variant="subtitle1">
        Select a native to display its info here.
      </Typography>
    </div>
  )
}
