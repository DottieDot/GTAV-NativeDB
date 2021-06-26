import { Button, Dialog, List, ListItem, ListItemText, TextField } from '@material-ui/core'
import React, { ChangeEvent, Fragment, KeyboardEvent, useCallback, useMemo, useState } from 'react'
import { useNamespaces } from '../../hooks'
import AppBarPortal from '../AppBarPortal'

interface Props {
  onNamespaceClicked: (namespace: string) => void
}

export default function JumpToNamespace({ onNamespaceClicked }: Props) {
  const namespaces = useNamespaces()
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

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key  === 'Enter' && filter && filteredNamespaces) {
      handleNamespaceSelected(filteredNamespaces[0].name)
      e.preventDefault()
    }
  }, [handleNamespaceSelected, filter, filteredNamespaces])

  return (
    <Fragment>
      <AppBarPortal>
        <Button onClick={handleDialogOpen} color="inherit">
          jump to namespace
        </Button>
      </AppBarPortal>
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
                secondary={`${natives.length} natives`} 
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Fragment>
  )
}
