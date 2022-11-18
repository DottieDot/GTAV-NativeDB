import { Box, useTheme } from '@mui/material'
import { useMemo, Fragment, memo } from 'react'
import NativeConst from './NativeConst'

export interface NativeValueProps {
  value: string
}

export default memo(function NativeValue({ value }: NativeValueProps) {
  const theme = useTheme()

  let split = useMemo(() => {
    if (value === 'true' || value === 'false' || value.startsWith("NATIVE(")) {
      return [[value]]
    }

    const regex = /(.*?)(?=([a-zA-Z][_0-9a-zA-Z]+))([_0-9a-zA-Z]+)|(.+)/gm
    const matches = [...value.matchAll(regex)]
    return matches
  }, [value])

  return (
    <Box sx={{ color: theme.extensions.nativeValueHighlight }} component="span">
      {split.map(([full, text, constant]) => (
        <Fragment>
          {text || (!constant && full)}
          {constant && (
            <NativeConst constName={constant} popover />
          )}
        </Fragment>
      ))}
    </Box>
  )
})
