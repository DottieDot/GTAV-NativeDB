import { ListItem } from '@mui/material'
import React, { memo } from 'react'
import { useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useNative } from '../../hooks'
import NativeDefinition from '../NativeDefinition'

interface NativeListItemProps {
  nativeHash: string
}

function NativeListItem({ nativeHash }: NativeListItemProps) {
  const native = useNative(nativeHash)
  const history = useHistory()
  const { native: selectedNativeHash } = useParams<{ native: string } >()
  
  const onClick = useCallback(() => {
    history.push(`/natives/${nativeHash}${history.location.search}`)
  }, [history, nativeHash])

  return (
    <ListItem
      onClick={onClick}
      selected={selectedNativeHash === nativeHash}
      button
      dense
    >
      <NativeDefinition
        name={native.name}
        returnType={native.returnType}
        params={native.params}
        nameCopyable={false}
        noWrap
      />
    </ListItem>
  )
}
export default  memo(NativeListItem)
