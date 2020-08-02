import React from 'react'
import NativeDefinition from './NativeDefinition'
import { ListItem } from '@material-ui/core'

export default React.memo(({ style, ...rest }) => {
  return (
    <ListItem
      button
      dense
      style={style}
    >
      <NativeDefinition
        {...rest}
        noWrap
      />
    </ListItem>
  )
})
