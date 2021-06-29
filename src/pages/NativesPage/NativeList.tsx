import { alpha, InputBase, styled } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import React, { Fragment, ChangeEvent, useCallback } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { AppBarPortal, NativeList as NativeListComponent } from '../../components'
import { useNativeSearch } from '../../hooks'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  margin: theme.spacing(0, 2),
  flex: 1,
  display: 'flex'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  // flex: 1,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export default function NativeList() {
  const [filter, setFilter] = useState('')
  const namespaces = useNativeSearch(filter)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }, [setFilter])

  useHotkeys('ctrl+k', () => {
    inputRef.current?.focus()
  }, {
    filter: (event: globalThis.KeyboardEvent) => {
      event.preventDefault()
      return true
    },
  }, [inputRef])

  return (
    <Fragment>
      <AppBarPortal>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={filter}
            onChange={handleFilterChange}
            inputRef={inputRef}
          />
        </Search>
      </AppBarPortal>
      <NativeListComponent
        sx={{ height: '100%' }}
        namespaces={namespaces}
      />
    </Fragment>
  )
}
