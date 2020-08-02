import React from 'react'
import NativeDefinition from './NativeDefinition'
import { ListItem } from '@material-ui/core'

export default React.memo((props) => {
  return (
    <ListItem
      button
      dense
    >
      <NativeDefinition
        {...props}
        noWrap
      />
    </ListItem>
  )
})
