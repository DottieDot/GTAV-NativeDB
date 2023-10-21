import { Typography } from '@mui/material'
import { Fragment } from 'react'
import { TypeDefinitionNativeType } from '../../context'
import NativeType from '../NativeType'

interface NativeTypeDefinitionProps {
  type: TypeDefinitionNativeType,
}

export default function NativeTypeDefinition({ type }: NativeTypeDefinitionProps) {
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

      type&nbsp;
      <NativeType type={type.name} />

      {type.aliasFor && (
        <Fragment>
          &nbsp;=&nbsp;
          <NativeType type={type.aliasFor} popover />
        </Fragment>
      )}
    </Typography>
  )
}
