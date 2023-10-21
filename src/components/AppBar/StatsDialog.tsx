import { Button, Dialog, DialogActions, DialogTitle, List, ListItem, ListItemText } from '@mui/material'
import { useStats } from '../../hooks'

interface Props {
  open: boolean
  onClose: () => void
}

export default function StatsDialog({ open, onClose }: Props) {
  const stats = useStats()

  return (
    <Dialog
      maxWidth="xs"
      onClose={onClose}
      open={open}
      fullWidth
    >
      <DialogTitle>
        Stats
      </DialogTitle>

      <List dense>
        <ListItem sx={{ px: 3 }} >
          <ListItemText 
            primary="Namespaces"
            secondary={stats.namespaces}
          />
        </ListItem>

        <ListItem sx={{ px: 3 }} >
          <ListItemText 
            primary="Natives"
            secondary={stats.natives}
          />
        </ListItem>

        <ListItem sx={{ px: 3 }} >
          <ListItemText 
            primary="Comments"
            secondary={stats.comments}
          />
        </ListItem>

        <ListItem sx={{ px: 3 }} >
          <ListItemText 
            primary="Known names"
            secondary={`${stats.knownNames.confirmed} (${stats.knownNames.total})`}
          />
        </ListItem>
      </List>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
