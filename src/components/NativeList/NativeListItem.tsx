import { ListItem } from '@mui/material'
import React, { memo } from 'react'
import { useCallback } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useNative } from '../../hooks'
import NativeDefinition from '../NativeDefinition'

interface NativeListItemProps {
  nativeHash: string
}

function NativeListItem({ nativeHash }: NativeListItemProps) {
  const native = useNative(nativeHash)
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const { native: selectedNativeHash } = useParams<{ native: string } >()
  
  const onClick = useCallback(() => {
    navigate({
      pathname: `/natives/${nativeHash}`,
      search: search.toString()
    })
  }, [navigate, nativeHash, search])

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
