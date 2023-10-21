import { Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { joaat } from '../../common'
import { useEnumOfIdentifier } from '../../hooks'
import useConstant from '../../hooks/useConstant'
import CopyableText from '../CopyableText'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'
import NativeConst from '../NativeValue/NativeConst'
import EnumDefinition from '../TypeDefinition/EnumDefinition'

export interface ConstDefinitionProps {
  constName: string
}

function HashDefinition({ constName }: ConstDefinitionProps) {
  const theme = useTheme()
  const inner = constName.slice(6, -2).toLowerCase()

  const hash = useMemo(() => {
    return `0x${(joaat(inner) >>> 0).toString(16)}`
  }, [ inner ])

  return (
    <Typography
      sx={{
        p:          1,
        fontFamily: '"Roboto Mono", monospace',
        color:      theme.extensions.nativeValueHighlight 
      }}
      variant="body2"
    >
      <NativeConst constName={constName} />

&nbsp;=&nbsp;
      <CopyableText>
        {hash}
      </CopyableText>
    </Typography>
  )
}

function EnumDefinitionForConst({ constName }: ConstDefinitionProps) {
  const enumDefinition = useEnumOfIdentifier(constName)

  if (!enumDefinition) {
    return (
      <Typography sx={{ p: 1 }} variant="body2">
        No value information for 
        {' '}
        <NativeConst constName={constName} />
        .
      </Typography>
    )
  }

  return (
    <EnumDefinition 
      highlightValue={constName} 
      type={enumDefinition}
    />
  )
}

export default function ConstDefinition({ constName }: ConstDefinitionProps) {
  const constant = useConstant(constName)

  if (constName.startsWith('HASH(')) {
    return (
      <HashDefinition constName={constName} />
    )
  }

  if (!constant) {
    return (
      <EnumDefinitionForConst constName={constName} />
    )
  }

  return (
    <Typography
      sx={{
        p:          1,
        fontFamily: '"Roboto Mono", monospace' 
      }}
      variant="body2"
    >
      <NativeType type={constant.type_name} popover />&nbsp;{constant.name}&nbsp;=&nbsp;
      <NativeValue value={constant.value} popover />
    </Typography>
  )
}
