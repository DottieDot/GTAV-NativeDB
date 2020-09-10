import React from 'react'
import NativeDefinition from './NativeDefinition'
import { ListItem } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedNative } from '../store/actions/app'

export default React.memo(({ hash }) => {
  const { name, return_type, params } = useSelector(({ natives }) => natives[hash]) ?? {}
  const dispatch = useDispatch()
  const selectedNative = useSelector(state => state.app.selectedNative)

  return (
    <ListItem
      onClick={() => dispatch(setSelectedNative(hash))}
      selected={selectedNative === hash}
      button
      dense
    >
      <NativeDefinition
        name={name}
        return_type={return_type}
        params={params}
        noWrap
        boldName
      />
    </ListItem>
  )
})
