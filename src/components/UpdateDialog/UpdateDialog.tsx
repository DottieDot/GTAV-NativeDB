import { Dialog, DialogTitle, DialogContent, Typography, styled, Divider, Box, DialogActions, Button, Link } from '@material-ui/core'
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
              <b>Code Examples</b><br />
              It's now possible to add code examples to natives by contributing to <Link underline="hover" href="https://github.com/DottieDot/gta5-additional-nativedb-data" target="_blank">https://github.com/DottieDot/gta5-additional-nativedb-data</Link>.
            </ListItem>
          </UnorderedList>
        </Typography> 
        <Header type="fix">
          Fixes and Changes
        </Header>
        <Typography variant="body2">
          <UnorderedList>
            <ListItem>
              <b>FiveM Native Search</b><br />
              Fixed how FiveM natives are loaded. The app will no longer crash while having them loaded.
            </ListItem>
            <ListItem>
              <b>FiveM Native Information</b><br />
              FiveM natives now include the same information they would have on FiveM's native database.
            </ListItem>
            <ListItem>
              <b>Section Titles</b><br />
              Added section titles to the native information panel.
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
