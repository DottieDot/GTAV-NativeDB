import { Box, useTheme } from '@mui/material'
import { useMemo, Fragment, memo } from 'react'
import NativeConst from './NativeConst'

export interface NativeValueProps {
  value: string,
  popover?: boolean
}

export default memo(function NativeValue({ value, popover =  false }: NativeValueProps) {
  const theme = useTheme()

  const split = useMemo(() => {
    if (value === 'true' || value === 'false') {
      return [[ value ]]
    }

    const regex = /(.*?)(?=HASH\(".*?(?=")"\))(HASH\(".*?(?=")"\))|(.*?)(?=([a-zA-Z][_0-9a-zA-Z]+))([_0-9a-zA-Z]+)|(.+)/gm
    const matches = [ ...value.matchAll(regex) ].map((arr) => { 
      arr[1] = arr[1] ?? arr[3] 
      arr[2] = arr[2] ?? arr[4]
      return arr
    })
    return matches
  }, [ value ])

  return (
    <Box component="span" sx={{ color: theme.extensions.nativeValueHighlight }}>
      {split.map(([ full, text, constant ], i) => (
        <Fragment key={i}>
          {text || (!constant && full)}

          {constant && (
            <NativeConst constName={constant} popover={popover} />
          )}
        </Fragment>
      ))}
    </Box>
  )
})
