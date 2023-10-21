import { Dialog, DialogTitle, DialogContent, Typography, styled, Divider, Box, DialogActions, Button } from '@mui/material'
import { memo } from 'react'
import { useCallback } from 'react'
import { ReactNode } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { buildDate } from '../../common'

const UnorderedList = styled('ul')(({ theme }) => ({
  marginTop:   0,
  paddingLeft: theme.spacing(2)
}))

const ListItem = styled('li')(({ theme }) => ({ marginTop: theme.spacing(1) }))

interface HeaderProps {
  children: ReactNode
  type: 'new' | 'fix'
}

function Header({ children,  type }: HeaderProps) {
  const color = type === 'fix' ? 'warning.main' : 'primary.main'
  return (
    <Box
      sx={{
        display:    'flex',
        alignItems: 'center',
        gap:        1 
      }}
    >
      <Typography 
        component="h3" 
        sx={{ color: color }}
        variant="h6"
      >
        {children}
      </Typography>

      <Divider 
        sx={{ 
          flex:    1, 
          bgcolor: color, 
          mt:      .5 
        }}
      />
    </Box>
  )
}

function UpdateDialog() {
  const [ closedChangelog, setClosedChangelog ] = useLocalStorageState('UpdateDialog.Closed', { defaultValue: '' })

  const handleClose = useCallback(() => {
    setClosedChangelog(buildDate)
  }, [ setClosedChangelog ])

  return (
    <Dialog 
      maxWidth="sm"
      onClose={handleClose}
      open={false && closedChangelog !== buildDate} 
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
              <b>
                Capturing links
              </b>

              <br />
              When you click on a native db link it should now open as a PWA, provided you have it installed as one. This feature requires the &quot;enable-desktop-pwas-link-capturing&quot; flag to be enabled.
            </ListItem>
          </UnorderedList>
        </Typography> 

        {/* <Header type="fix">
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
        </Typography> */}
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
