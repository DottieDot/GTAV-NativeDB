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
              <b>Update checker</b><br />
              The app will now periodically check for new updates.
            </ListItem>
            <ListItem>
              <b>Changelog</b><br />
              You will now be able to see all the new features in a neat list.
            </ListItem>
          </UnorderedList>
        </Typography>
        <Header type="fix">
          Fixes and Changes
        </Header>
        <Typography variant="body2">
          <UnorderedList>
            <ListItem>
              <b>Additional data no longer loaded by default</b><br />
              Loading additional data is now opt-in to decrease initial load times.
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
