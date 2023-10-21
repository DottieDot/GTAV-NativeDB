import { Box, Typography } from '@mui/material'
import { useMemo, Fragment } from 'react'
import { TypeDefinitionStruct } from '../../context'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'

interface StructDefinitionProps {
  type: TypeDefinitionStruct
}

export default function StructDefinition({ type }: StructDefinitionProps) {
  const fields = useMemo(() => {
    return Object.values(type.fields)
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

      struct&nbsp;
      <NativeType type={type.name} />&nbsp;&#123;
      <br />

      {fields.map((field, i) => (
        <Box key={field.name} sx={{ ml: 2 }}>
          {field.comment && (
            <Fragment>
              {(i !== 0) && <br />}
              {'// '}
              {field.comment}
              <br />
            </Fragment>
          )}

          <NativeType type={field.typeName} popover />
          &nbsp;{field.name}

          {field.arraySize && (
            <Fragment>
              [
              <NativeValue value={field.arraySize} popover />
              ]
            </Fragment>
          )}

          {field.defaultValue && (
            <Fragment>
              &nbsp;=&nbsp;
              <NativeValue value={field.defaultValue} popover />
            </Fragment>
          )}

          {(i + 1) !== fields.length && ','}
        </Box>
      ))}
      &#125;
    </Typography>
  )
}
