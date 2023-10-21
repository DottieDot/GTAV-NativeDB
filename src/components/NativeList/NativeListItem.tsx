import { ListItem } from '@mui/material'
import { memo } from 'react'
import { useCallback } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGameUrl, useNative } from '../../hooks'
import NativeDefinition from '../NativeDefinition'

interface NativeListItemProps {
  nativeHash: string
}

function NativeListItem({ nativeHash }: NativeListItemProps) {
  const native = useNative(nativeHash)
  const navigate = useNavigate()
  const [ search ] = useSearchParams()
  const { native: selectedNativeHash } = useParams<{ native: string } >()
  
  const url = useGameUrl(`/natives/${nativeHash}`)

  const onClick = useCallback(() => {
    navigate({
      pathname: url,
      search:   search.toString()
    })
  }, [ navigate, url, search ])

  return (
    <ListItem
      onClick={onClick}
      selected={selectedNativeHash === nativeHash}
      button
      dense
    >
      <NativeDefinition
        name={native.name}
        nameCopyable={false}
        params={native.params}
        returnType={native.returnType}
        noWrap
      />
    </ListItem>
  )
}
export default  memo(NativeListItem)
