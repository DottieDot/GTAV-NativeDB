import { Box, IconButton, InputBase, styled, SxProps, useTheme } from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'
import { AppBarSearch } from './model'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useIsExtraSmallDisplay } from '../../hooks'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.extensions.typeInfoBorderColor,
  transition: 'all ease-in-out .2s',
  '&:hover': {
    backgroundColor: theme.extensions.typeInfoBorderColor
  },
  '&.mobile': {
    position: 'absolute',
    margin: 'unset',
    zIndex: 1
  },
  flex: 1,
  display: 'flex'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  '.show-clear > &': {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
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

const ClearIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0
}))

export interface DesktopSearchProps {
  search: AppBarSearch
  expanded?: boolean
  onBlur?: () => void
  onFocus?: () => void
}

function setNativeValue(element: HTMLInputElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set
  const prototype = Object.getPrototypeOf(element)
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set

  if (valueSetter && prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value)
  } else if (valueSetter) {
    valueSetter.call(element, value)
  }
}

// Absolutely horrendous code, please fix.
export default function DesktopSearch({ search, onBlur, onFocus, expanded = false }: DesktopSearchProps) {
  const theme = useTheme()
  const extraSmallDisplay = useIsExtraSmallDisplay()
  const outerBox = useRef<HTMLDivElement>(null)
  const innerBox = useRef<HTMLDivElement>(null)
  const clearButton = useRef<HTMLButtonElement>(null)
  const [state, setState] = useState({
    inner: {
      top: 0,
      left: 0,
      width: 0,
    },
    outer: {
      top: 0,
      left: 0,
      width: 0,
    }
  })
  const [searchIsEmpty, setSearchIsEmpty] = useState(false)

  if (!extraSmallDisplay) {
    expanded = false
  }

  const handleClear = useCallback(() => {
    const current = search.ref?.current
    if (current) {
      setNativeValue(current, '')
      current.dispatchEvent(new Event('change', { bubbles: true }))
    }
    
    if (search.ref?.current) {
      search.ref.current.value = ''
    }
  }, [search])
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      search.ref?.current?.blur()
    }

    if (search.onKeyDown) {
      search.onKeyDown(e)
    }
  }, [search])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchIsEmpty(!e.target.value)
    search?.onChange && search.onChange(e)
  }, [search])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => { 
    if (!clearButton.current || e.relatedTarget !== clearButton.current) {
      onBlur && onBlur()
    } else if (e.target === search?.ref?.current) {
      e.target.focus()
    }
  }, [onBlur, search])

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    onFocus && onFocus()
  }, [onFocus])

  useEffect(() => {
    if (!outerBox.current || !innerBox.current) {
      return
    }

    const observer = new ResizeObserver(() => {
      if (!outerBox.current || !innerBox.current) {
        return
      }

      const outer = outerBox.current.getBoundingClientRect()
      const inner = innerBox.current.getBoundingClientRect()

      setState({
        inner: {
          top: inner.top,
          left: inner.left,
          width: inner.width
        },
        outer: {
          top: outer.top,
          left: outer.left,
          width: outer.width
        }
      })
    })

    observer.observe(outerBox.current)
    observer.observe(innerBox.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  const style: SxProps = expanded ? {
    ...state.inner
  } : {
    ...state.outer,
    top: theme.spacing(1)
  }

  const showClearIcon = (expanded || !extraSmallDisplay) && !searchIsEmpty
  const searchContent = (
    <Search 
      sx={extraSmallDisplay ? style : undefined} 
      className={`${expanded ? 'expanded' : ''} ${extraSmallDisplay ? 'mobile' : ''} ${showClearIcon ? 'show-clear' : ''}`}
      onBlur={handleBlur}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={search.value}
        inputRef={search.ref}
        onChange={handleChange}
        onBlur={search.onBlur}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      {(showClearIcon) && (
        <ClearIconWrapper>
          <IconButton ref={clearButton} size="small" onClick={handleClear}>
            <ClearIcon />
          </IconButton>
        </ClearIconWrapper>
      )}
    </Search>
  )

  if (!extraSmallDisplay) {
    return searchContent
  }

  return (
    <Box
      sx={{
        margin: theme.spacing(0, 2),
        height: '100%'
      }}
      ref={outerBox}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: theme.spacing(1),
          width: `calc(100% - ${theme.spacing(4)})`,
          margin: theme.spacing(0, 2),
          zIndex: 1
        }}
        ref={innerBox}
      />
      {!!state.outer.width && searchContent}
    </Box>
  )
}
