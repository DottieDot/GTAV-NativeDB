import { Button, Dialog, DialogActions } from '@mui/material'
import Apps from './Apps'

interface Props {
  open: boolean
  onClose: () => void
}

export default function AppsDialog({ open, onClose }: Props) {
  return (
    <Dialog
      maxWidth="xs"
      onClose={onClose}
      open={open}
      fullWidth
    >
      <Apps />

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
