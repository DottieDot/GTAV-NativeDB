import { Popover, PopoverProps } from '@mui/material'
import Apps from './Apps'

export default function AppsPopover(props: PopoverProps) {
  return (
    <Popover {...props}>
      <Apps />
    </Popover>
  )
}
