import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Menu, MenuItem, Button } from '@material-ui/core'

export default React.memo(({ onSelect }) => {
  const namespaces = useSelector(({ search }) => search)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button 
        aria-haspopup="true" 
        onClick={handleClick}
      >
        Goto Namespace
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        {Object.keys(namespaces).map((namespace) => (
          <MenuItem
            onClick={() => {
              handleClose()
              onSelect(namespace)
              console.log(namespace)
            }}
            key={namespace}
          >
            {namespace}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
})
