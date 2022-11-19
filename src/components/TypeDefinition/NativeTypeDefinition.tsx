import { Typography } from '@mui/material'
import { Fragment } from 'react'
import { TypeDefinitionNativeType } from '../../store'
import NativeType from '../NativeType'

interface NativeTypeDefinitionProps {
  type: TypeDefinitionNativeType,
}

export default function NativeTypeDefinition({ type }: NativeTypeDefinitionProps) {
  return (
    <Typography sx={{ p: 1, fontFamily: '"Roboto Mono", monospace' }} component="div" variant="body2">
      {type.comment && (
        <Fragment>
          {'//'} {type.comment}<br />
        </Fragment>
      )}
      type&nbsp;<NativeType type={type.name} />
      {type.aliasFor && (
        <Fragment>
          &nbsp;=&nbsp;<NativeType type={type.aliasFor} popover />
        </Fragment>
      )}
    </Typography>
  )
}
