import { ListItem } from '@material-ui/core'
import React, { memo, CSSProperties } from 'react'
import { useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useNative } from '../../hooks'
import NativeDefinition from '../NativeDefinition'

interface NativeListItemProps {
  nativeHash: string
  style: CSSProperties
}

function NativeListItem({ nativeHash, style }: NativeListItemProps) {
  const native = useNative(nativeHash)
  const history = useHistory()
  const { native: selectedNativeHash } = useParams<{ native: string } >()
  
  const onClick = useCallback(() => {
    history.replace(nativeHash)
  }, [history, nativeHash])

  return (
    <ListItem
      onClick={onClick}
      selected={selectedNativeHash === nativeHash}
      style={style}
      button
      dense
    >
      <NativeDefinition
        name={native.name}
        returnType={native.returnType}
        params={native.params}
        noWrap
      />
    </ListItem>
  )
}
export default memo(NativeListItem)
