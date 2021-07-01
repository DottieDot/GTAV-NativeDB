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
              <b>Shortcuts</b><br />
              You can now use shortcuts for certain actions. [ctrl/cmd]+K for search, and [ctrl/cmd]+G to jump to a namespace.
            </ListItem>
          </UnorderedList>
        </Typography>
        <Header type="fix">
          Fixes and Changes
        </Header>
        <Typography variant="body2">
          <UnorderedList>
            <ListItem>
              <b>Jump to namespace</b><br />
              The jump to namespace dialog will now match the search results.
            </ListItem>
            <ListItem>
              <b>Native counts</b><br />
              The number of natives shown in the namespace headers now adjust tot the search results.
            </ListItem>
            <ListItem>
              <b>Sharable search</b><br />
              Search queries are now sharable.
            </ListItem>
            <ListItem>
              <b>Fix update checker</b><br />
              Update checker should now continuesly check for updates, instead of only the first minute or so.
            </ListItem>
            <ListItem>
              <b>Improved search</b><br />
              Search now searches in the descriptions too by default.
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
