import React from 'react'
import NativeDefinition from './NativeDefinition'
import { ListItem } from '@material-ui/core'
import { useSelector } from 'react-redux'

export default React.memo(({ hash }) => {
  const { name, return_type, params } = useSelector(({ natives }) => natives[hash])

  return (
    <ListItem
      button
      dense
    >
      <NativeDefinition
        name={name}
        return_type={return_type}
        params={params}
        noWrap
      />
    </ListItem>
  )
})
