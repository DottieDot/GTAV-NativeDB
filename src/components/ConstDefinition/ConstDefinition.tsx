import { Typography } from '@mui/material'
import useConstant from '../../hooks/useConstant'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'
import NativeConst from '../NativeValue/NativeConst'

export interface ConstDefinitionProps {
  constName: string
}

export default function ConstDefinition({ constName }: ConstDefinitionProps) {
  const constant = useConstant(constName)

  if (!constant) {
    return (
      <Typography sx={{ p: 1 }} variant="body2">
        No value information for <NativeConst constName={constName} />.
      </Typography>
    )
  }

  return (
    <Typography sx={{ p: 1, fontFamily: '"Roboto Mono", monospace' }} variant="body2">
      <NativeType type={constant.type_name} />&nbsp;{constant.name}&nbsp;=&nbsp;<NativeValue value={constant.value} />
    </Typography>
  )
}
