import { Dialog, List, ListItem, ListItemText, TextField } from '@mui/material'
import React, { ChangeEvent, Fragment, KeyboardEvent, memo, useCallback, useMemo, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useSetAppBarSettings } from '../../hooks'
import { Namespace } from '../../store'
import { ExitToApp as JumpToNamespaceIcon } from '@mui/icons-material'

interface Props {
  onNamespaceClicked: (namespace: string) => void
  namespaces: { [name: string]: Namespace }
}

function JumpToNamespace({ namespaces, onNamespaceClicked }: Props) {
  const namespaceArray = useMemo(() => Object.values(namespaces), [namespaces])
  const [filter, setFilter] = useState('')
  const filteredNamespaces = useMemo(
    () => namespaceArray
      .filter(ns => ns.name.toLowerCase()
      .indexOf(filter.toLowerCase()) !== -1), 
    [filter, namespaceArray]
  ) 
  const [dialogOpen, setDialogOpen] = useState(false)
  
  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }, [setFilter])

  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true)
  }, [setDialogOpen])

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
    setFilter('')
  }, [setDialogOpen])

  const handleNamespaceSelected = useCallback((namespace: string) => {
    onNamespaceClicked(namespace)
    handleDialogClose()
  }, [handleDialogClose, onNamespaceClicked])

  useSetAppBarSettings('JumpToNamespace', {
    actions: [
      {
        text: 'Jump to namespace',
        mobileIcon: JumpToNamespaceIcon,
        buttonProps: {
          onClick: handleDialogOpen
        }
      }
    ]
  })

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key  === 'Enter' && filter && filteredNamespaces) {
      handleNamespaceSelected(filteredNamespaces[0].name)
      e.preventDefault()
    }
  }, [handleNamespaceSelected, filter, filteredNamespaces])

  useHotkeys('ctrl+g', () => {
    handleDialogOpen()
  }, {
    filter: (event: globalThis.KeyboardEvent) => {
      event.preventDefault()
      return true
    },
  }, [handleDialogOpen])

  return (
    <Fragment>
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <TextField 
          label="Filter"
          variant="filled"
          value={filter}
          onChange={handleFilterChange}
          onKeyDown={onKeyDown}
          fullWidth
          autoFocus
        />
        <List sx={{ height: 200, overflowY: 'scroll' }}>
          {filteredNamespaces.map(({ name, natives }, index) => (
            <ListItem 
              key={name} 
              onClick={() => handleNamespaceSelected(name)}
              selected={!!filter && index === 0}
              button
            >
              <ListItemText 
                primary={name} 
                secondary={`${natives.length} ${natives.length === 1 ? 'native' : 'natives'}`} 
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Fragment>
  )
}

export default memo(JumpToNamespace)
