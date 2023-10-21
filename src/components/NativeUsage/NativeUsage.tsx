import { Box, CircularProgress } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import SyntaxHighlighter from '../SnytaxHighlighter'

export interface NativeUsageProps {
  nativeHash: string
  onNotFound?: () => void
}

function NativeUsage({ nativeHash, onNotFound }: NativeUsageProps) {
  const [ usageCode, setUsageCode ] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      setUsageCode(null)
      const response = await fetch(`https://raw.githubusercontent.com/DottieDot/gta5-additional-nativedb-data/main/usages/${nativeHash}.cpp`)
      if (response.ok) {
        const code = await response.text()
        setUsageCode(code)
      }
      else {
        onNotFound && onNotFound()
        setUsageCode('')
      }
    })()
  }, [ nativeHash, setUsageCode, onNotFound ])

  if (usageCode === null) {
    return (
      <Box
        sx={{
          p:              2,
          justifyContent: 'center',
          display:        'flex' 
        }}
      >
        <CircularProgress size={36} />
      </Box>
    )
  }

  return (
    <SyntaxHighlighter language="cpp">
      {usageCode}
    </SyntaxHighlighter>
  )
}
export default memo(NativeUsage)