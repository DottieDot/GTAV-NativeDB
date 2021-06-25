import { Box, Paper, Stack } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { NativeComment, NativeDefinition, NativeDetails } from '../../components'
import { useNative } from '../../hooks'
import NativeNotFound from './NativeNotFound'

export default function NativeInfo() {
  const { native: nativeHash } = useParams<{ native: string }>()
  const native = useNative(nativeHash)

  if  (!native) {
    return (
      <Box sx={{ p: 2, overflow: 'hidden scroll', flex: 1 }}>
        <NativeNotFound nativeHash={nativeHash} />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 2, overflow: 'hidden scroll', flex: 1 }}>
      <Typography 
        sx={{ 
          textOverflow: 'ellipsis', 
          overflow: 'hidden' 
        }}
        variant="h5" 
        component="h1" 
        gutterBottom
      >
        {native.name}
      </Typography>
      <Stack spacing={2}>
        <Paper sx={{ p: 2 }}>
          <NativeDetails
            hash={native.hash}
            jhash={native.jhash}
            build={native.build}
            variant="body2"
          />
          <NativeDefinition
            name={native.name}
            params={native.params}
            returnType={native.returnType}
            variant="body2"
          />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <NativeComment variant="body2">
            {native.comment}
          </NativeComment>
        </Paper>
      </Stack>
    </Box>
  )
}
