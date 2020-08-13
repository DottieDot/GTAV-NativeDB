import React from 'react'
import NativeDefinition from './NativeDefinition'
import { ListItem } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

export default React.memo(({ hash }) => {
  const { name, return_type, params } = useSelector(({ natives }) => natives[hash]) ?? {}
  const history = useHistory()
  const { native: selectedNative } = useParams()

  return (
    <ListItem
      onClick={() => history.push(`/natives/${hash}`)}
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
