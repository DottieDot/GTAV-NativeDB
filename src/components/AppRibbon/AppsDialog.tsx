import { Button, Dialog, DialogActions } from '@mui/material'
import Apps from './Apps'

interface Props {
  open: boolean
  onClose: () => void
}

export default function AppsDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Apps />
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
