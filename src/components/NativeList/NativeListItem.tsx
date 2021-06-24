import { ListItem } from '@material-ui/core'
import React, { memo, CSSProperties } from 'react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useNative } from '../../hooks'
import NativeDefinition from '../NativeDefinition'

interface NativeListItemProps {
  nativeHash: string
  style: CSSProperties
}

function NativeListItem({ nativeHash, style }: NativeListItemProps) {
  const native = useNative(nativeHash)
  const history = useHistory()
  
  const onClick = useCallback(() => {
    history.replace(`/natives/${nativeHash}`)
  }, [history, nativeHash])

  return (
    <ListItem
      onClick={onClick}
      selected={false}
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
