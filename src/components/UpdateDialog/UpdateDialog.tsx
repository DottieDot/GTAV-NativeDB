import { Dialog, DialogTitle, DialogContent, Typography, styled, Divider, Box, DialogActions, Button } from '@material-ui/core'
import React, { memo } from 'react'
import { useCallback } from 'react'
import { ReactNode } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { buildDate } from '../../common'

const UnorderedList = styled('ul')(({ theme }) => ({
  marginTop: 0,
  paddingLeft: theme.spacing(2)
}))

const ListItem = styled('li')(({ theme }) => ({
  marginTop: theme.spacing(1)
}))

interface HeaderProps {
  children: ReactNode
  type: 'new' | 'fix'
}

function Header({ children,  type }: HeaderProps) {
  const color = type === 'fix' ? 'warning.main' : 'primary.main'
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography 
        variant="h6" 
        component="h3"
        sx={{ color: color }}
      >
        {children}
      </Typography>
      <Divider 
        sx={{ 
          flex: 1, 
          bgcolor: color, 
          mt: .5 
        }} 
        />
    </Box>
  )
}

function UpdateDialog() {
  const [closedChangelog, setClosedChangelog] = useLocalStorageState('UpdateDialog.Closed', '')

  const handleClose = useCallback(() => {
    setClosedChangelog(buildDate)
  }, [setClosedChangelog])

  return (
    <Dialog 
      open={closedChangelog !== buildDate}
      onClose={handleClose}
      maxWidth="sm" 
      scroll="paper" 
      fullWidth
    >
      <DialogTitle>
        Changelog
      </DialogTitle>
      <DialogContent>
        <Header type="new">
          New Features
        </Header>
        <Typography variant="body2">
          <UnorderedList>
            <ListItem>
              <b>Mobile Interface</b><br />
              It's now possible to browse natives from the comfort of your toilet seat.
            </ListItem>
            <ListItem>
              <b>Theme colors for Safari 15</b><br />
              Theme colors are now properly defined and change depending on the selected theme.
            </ListItem>
          </UnorderedList>
        </Typography> 
        <Header type="fix">
          Fixes and Changes
        </Header>
        <Typography variant="body2">
          <UnorderedList>
            <ListItem>
              <b>Old names from Alloc8or ndb</b><br />
              Old names are now taken from Alloc8or's native data instead of my "extra data" repo.
            </ListItem>
            <ListItem>
              <b>Switching to dark mode</b><br />
              Switching to dark mode is no longer broken if your system is set to light mode.
            </ListItem>
            <ListItem>
              <b>Search results are no longer cleared</b><br />
              Selecting a native would clear your search results, this is now fixed.
            </ListItem>
          </UnorderedList>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default memo(UpdateDialog)
