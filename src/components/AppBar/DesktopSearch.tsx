import { Box, IconButton, InputBase, styled, useTheme } from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'
import { AppBarSearch } from './model'
import { useCallback, useEffect, useState } from 'react'
import { useIsExtraSmallDisplay } from '../../hooks'

interface StyleProps {
  inner: {
    top: number,
    left: number,
    width: number
  },
  outer: {
    top: number,
    left: number,
    width: number
  }
}

const Search = styled('div')<StyleProps>(({ theme, inner, outer }) => ({
  position:          'relative',
  margin:            theme.spacing(0, 2),
  borderRadius:      theme.shape.borderRadius,
  backgroundColor:   theme.extensions.typeInfoBorderColor,
  transition:        'all ease-in-out .2s',
  '&:hover':         { backgroundColor: theme.extensions.typeInfoBorderColor },
  '& .clear-button': { display: 'none' },
  '&:not(.mobile)':  { '&:not(:has(input:placeholder-shown))': { '& .clear-button': { display: 'block' }}},
  '&.mobile':        {
    position:                  'absolute',
    margin:                    'unset',
    zIndex:                    1,
    ...outer,
    top:                       theme.spacing(1),
    '&:focus-within, &:hover': {
      ...inner,
      '&:not(:has(input:placeholder-shown))': { '& .clear-button': { display: 'block' }}
    }
  },
  flex:    1,
  display: 'flex'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color:                   'inherit',
  width:                   '100%',
  '& .MuiInputBase-input': {
    padding:     theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition:  theme.transitions.create('width'),
    width:       '100%'
  },
  '.show-clear > &': { paddingRight: `calc(1em + ${theme.spacing(4)})` }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding:        theme.spacing(0, 2),
  height:         '100%',
  position:       'absolute',
  pointerEvents:  'none',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center'
}))

const ClearIconWrapper = styled('div')(({ theme }) => ({
  padding:        theme.spacing(0, 2),
  height:         '100%',
  position:       'absolute',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  right:          0
}))

export interface DesktopSearchProps {
  search: AppBarSearch
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
export default function DesktopSearch({ search }: DesktopSearchProps) {
  const theme = useTheme()
  const extraSmallDisplay = useIsExtraSmallDisplay()
  const [ outerBox, setOuterBox ] = useState<HTMLDivElement|null>(null)
  const [ innerBox, setInnerBox ] = useState<HTMLDivElement | null>(null)
  const [ state, setState ] = useState({
    inner: {
      top:   0,
      left:  0,
      width: 0
    },
    outer: {
      top:   0,
      left:  0,
      width: 0
    }
  })

  const handleClear = useCallback(() => {
    const current = search.ref?.current
    if (current) {
      setNativeValue(current, '')
      current.dispatchEvent(new Event('change', { bubbles: true }))
      current.focus()
    }
  }, [ search ])
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      search.ref?.current?.blur()
    }

    if (search.onKeyDown) {
      search.onKeyDown(e)
    }
  }, [ search ])

  const handleInner = useCallback((e: HTMLDivElement) => {
    setInnerBox(e)
  }, [])

  const handleOuter = useCallback((e: HTMLDivElement) => {
    setOuterBox(e)
  }, [])

  useEffect(() => {
    if (!outerBox || !innerBox) {
      return
    }

    const observer = new ResizeObserver(() => {
      if (!outerBox || !innerBox) {
        return
      }

      const outer = outerBox.getBoundingClientRect()
      const inner = innerBox.getBoundingClientRect()

      setState({
        inner: {
          top:   inner.top,
          left:  inner.left,
          width: inner.width
        },
        outer: {
          top:   outer.top,
          left:  outer.left,
          width: outer.width
        }
      })
    })

    observer.observe(outerBox)
    observer.observe(innerBox)

    return () => {
      observer.disconnect()
    }
  }, [ outerBox, innerBox ])

  const searchContent = (
    <Search
      className={`${extraSmallDisplay ? 'mobile' : ''}`}
      inner={state.inner}
      outer={state.outer}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        inputProps={{ 'aria-label': 'search' }}
        inputRef={search.ref}
        onBlur={search.onBlur}
        onChange={search.onChange}
        onKeyDown={handleKeyDown}
        placeholder="Search…"
        value={search.value}
      />

      <ClearIconWrapper className="clear-button">
        <IconButton onClick={handleClear} size="small" sx={{ mt: '2px' }}>
          <ClearIcon />
        </IconButton>
      </ClearIconWrapper>
    </Search>
  )

  if (!extraSmallDisplay) {
    return searchContent
  }

  return (
    <Box
      ref={handleOuter}
      sx={{
        margin: theme.spacing(0, 2),
        height: '100%'
      }}
    >
      <Box
        ref={handleInner}
        sx={{
          position: 'absolute',
          left:     0,
          top:      theme.spacing(1),
          width:    `calc(100% - ${theme.spacing(4)})`,
          margin:   theme.spacing(0, 2),
          zIndex:   1
        }}
      />

      {!!state.outer.width && searchContent}
    </Box>
  )
}
