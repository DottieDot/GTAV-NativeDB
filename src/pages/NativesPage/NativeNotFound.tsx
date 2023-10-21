import { Typography } from '@mui/material'

interface Props {
  nativeHash: string
}

export default function NativeNotFound({ nativeHash }: Props) {
  return (
    <div>
      <Typography component="h1" variant="h5">
        Native could not found be found.
      </Typography>

      <Typography variant="subtitle1">
        A native with the hash 
        {' '}
        {nativeHash}
        {' '}
        could not be found
      </Typography>
    </div>
  )
}
