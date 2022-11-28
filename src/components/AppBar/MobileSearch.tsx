import { alpha, IconButton, InputBase, styled } from '@mui/material'
import { Search as SearchIcon, Close as CancelIcon } from '@mui/icons-material'
import { useCallback, useEffect, useRef } from 'react'
import { getOverlayAlpha } from '../../common'
import { AppBarSearch } from './model'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'dark' && {
    backgroundImage: `linear-gradient(${alpha(
      '#fff',
      getOverlayAlpha(4),
    )}, ${alpha('#fff', getOverlayAlpha(4))})`,
  }),
  flex: 1,
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  zIndex: 1,
  padding: theme.spacing(0, 1)
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.background.paper),
  flex: 1,
  padding: theme.spacing(0, 1),
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}))

export default function MobileSearch({ search, onClose, visible }: { search: AppBarSearch, onClose: () => void, visible: boolean }) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClose()
    }
    if (search.onKeyDown) {
      search.onKeyDown(e)
    }
  }, [onClose, search])

  useEffect(() => {
    if (visible) {
      search.ref?.current?.focus()
    }
  }, [search, visible])

  return (
    <Search>
      <SearchIcon />
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={search.value}
        inputRef={search.ref}
        onChange={search.onChange}
        onBlur={search.onBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <IconButton onClick={onClose}>
        <CancelIcon />
      </IconButton>
    </Search>
  )
}
