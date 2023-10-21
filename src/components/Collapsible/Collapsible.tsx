import { Button, ButtonProps, Collapse } from '@mui/material'
import { Fragment, ReactElement, useCallback, useState } from 'react'

interface CollapsibleProps {
  label     : string
  variant  ?: ButtonProps['variant']
  fullWidth?: boolean
  children  : ReactElement
}

export default function Collapsible({ children, label, variant, fullWidth }: CollapsibleProps) {
  const [ open, setOpen ] = useState(false)

  const toggle = useCallback(() => {
    setOpen(!open)
  }, [ open, setOpen ])

  return (
    <Fragment>
      <Button 
        fullWidth={fullWidth} 
        onClick={toggle} 
        variant={variant}
      >
        {label}
      </Button>

      <Collapse in={open}>
        {children}
      </Collapse>
    </Fragment>
  )
}
