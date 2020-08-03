import React from 'react'
import NativeDefinition from './NativeDefinition'
import { ListItem } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default React.memo(({ hash }) => {
  const { name, return_type, params } = useSelector(({ natives }) => natives[hash])
  const history = useHistory()

  return (
    <ListItem
      onClick={() => history.push(`/natives/${hash}`)}
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
