import { Typography } from '@mui/material'
import React from 'react'

interface Props {
  nativeHash: string
}

export default function NativeNotFound({ nativeHash }: Props) {
  return (
    <div>
      <Typography variant="h5" component="h1">
        Native could not found be found.
      </Typography>
      <Typography variant="subtitle1">
        A native with the hash {nativeHash} could not be found
      </Typography>
    </div>
  )
}
