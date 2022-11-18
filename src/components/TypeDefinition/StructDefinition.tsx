import { Box, Typography } from '@mui/material'
import { useMemo, Fragment } from 'react'
import { TypeDefinitionStruct } from '../../store'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'

interface StructDefinitionProps {
  type: TypeDefinitionStruct
}

export default function StructDefinition({ type }: StructDefinitionProps) {
  const fields = useMemo(() => {
    return Object.values(type.fields)
  }, [type])

  return (
    <Typography sx={{ p: 1, fontFamily: '"Roboto Mono", monospace' }} variant="body2">
      struct&nbsp;<NativeType type={type.name} />&nbsp;&#123; <br />
      {fields.map((field, i) => (
        <Box sx={{ ml: 2 }}>
          <NativeType type={field.typeName} popover />
          &nbsp;{field.name}
          {field.arraySize && (
            <Fragment>
              [{field.arraySize}]
            </Fragment>
          )}
          {field.defaultValue && (
            <Fragment>
              &nbsp;=&nbsp;<NativeValue value={field.defaultValue} />
            </Fragment>
          )}
          {(i + 1) !== fields.length && ','}
        </Box>
      ))}
      &#125;
    </Typography>
  )
}
