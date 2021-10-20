import { Button, ButtonProps, Collapse } from '@mui/material'
import React, { Fragment, FunctionComponent, useCallback, useState } from 'react'

interface CollapsibleProps {
  label     : string
  variant  ?: ButtonProps['variant']
  fullWidth?: boolean
}

const Collapsible: FunctionComponent<CollapsibleProps> = ({ children, label, variant, fullWidth }) => {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => {
    setOpen(!open)
  }, [open, setOpen])

  return (
    <Fragment>
      <Button 
        variant={variant} 
        fullWidth={fullWidth} 
        onClick={toggle}
      >
        {label}
      </Button>
      <Collapse in={open}>
        {children}
      </Collapse>
    </Fragment>
  )
}
export default Collapsible
