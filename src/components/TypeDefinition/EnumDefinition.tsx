import { Box, Typography, useTheme } from '@mui/material'
import { useMemo, Fragment } from 'react'
import { TypeDefinitionEnum } from '../../context'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'

interface EnumDefinitionProps {
  type: TypeDefinitionEnum,
  highlightValue?: string
}

export default function EnumDefinition({ type, highlightValue }: EnumDefinitionProps) {
  const theme = useTheme()
  const values = useMemo(() => {
    return Object.values(type.values)
  }, [ type ])

  return (
    <Typography
      component="div"
      sx={{
        p:          1,
        fontFamily: '"Roboto Mono", monospace' 
      }}
      variant="body2"
    >
      {type.comment && (
        <Fragment>
          {'// '}
          {type.comment}
          <br />
        </Fragment>
      )}

      enum&nbsp;
      <NativeType type={type.name} />
&nbsp;&#123;
      <br />

      {values.map((value, i) => (
        <Box key={value.name} sx={{ ml: 2 }}>
          {value.comment && (
            <Fragment>
              {(i !== 0) && <br />}
              {'// '}
              {value.comment}
              <br />
            </Fragment>
          )}

          <Box component="span" sx={{ color: highlightValue === value.name ? theme.extensions.constantIdentifierHighlight : 'unset' }}>
            {value.name}
          </Box>

          {value.value && (
            <Fragment>
              &nbsp;=&nbsp;
              <NativeValue value={value.value} popover />
            </Fragment>
          )}

          {(i + 1) !== values.length && ','}
        </Box>
      ))}
      &#125;
    </Typography>
  )
}
