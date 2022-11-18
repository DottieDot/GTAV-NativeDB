import { Box, Typography } from '@mui/material'
import { useMemo, Fragment } from 'react'
import { TypeDefinitionEnum } from '../../store'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'

interface EnumDefinitionProps {
  type: TypeDefinitionEnum
}

export default function EnumDefinition({ type }: EnumDefinitionProps) {
  const values = useMemo(() => {
    return Object.values(type.values)
  }, [type])

  return (
    <Typography sx={{ p: 1, fontFamily: '"Roboto Mono", monospace' }} variant="body2">
      enum&nbsp;<NativeType type={type.name} />&nbsp;&#123; <br />
      {values.map((value, i) => (
        <Box sx={{ ml: 2 }}>
          {value.name}
          {value.value && (
            <Fragment>
              &nbsp;=&nbsp;<NativeValue value={value.value} />
            </Fragment>
          )}
          {(i + 1) !== values.length && ','}
        </Box>
      ))}
      &#125;
    </Typography>
  )
}
