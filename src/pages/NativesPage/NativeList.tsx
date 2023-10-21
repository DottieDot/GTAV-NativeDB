import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useSearchParams } from 'react-router-dom'
import { NativeList as NativeListComponent } from '../../components'
import { useNativeSearch, useQuery, useSetAppBarSettings } from '../../hooks'

export default function NativeList() {
  const [ filter, setFilter ] = useState('')
  const namespaces = useNativeSearch(filter)
  const inputRef = useRef<HTMLInputElement>(null)
  const query = useQuery()
  const [ , setSearch ] = useSearchParams()

  useEffect(() => {
    const search = query.get('search')
    setFilter(search ?? '')
  }, [ query, setFilter ])

  const handleSearchKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
      e.preventDefault()
    }
  }, [ inputRef ])

  const handleSearchBlur = useCallback(() => {
    if (filter) {
      // history.replace(`${history.location.pathname}?search=${encodeURIComponent(filter)}`)
      setSearch({ search: filter })
    }
    else {
      setSearch()
    }
  }, [ setSearch, filter ])

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }, [ setFilter ])

  const nativeListMemo = useMemo(() => ({
    search: {
      onChange:  handleFilterChange,
      onKeyDown: handleSearchKeyDown,
      onBlur:    handleSearchBlur,
      ref:       inputRef,
      value:     filter
    }
  }), [ filter, handleFilterChange, handleSearchBlur, inputRef, handleSearchKeyDown ])
  useSetAppBarSettings('NativeList', nativeListMemo)

  useHotkeys('ctrl+k', () => {
    inputRef.current?.focus()
  }, { preventDefault: true }, [ inputRef ])

  return (
    <NativeListComponent
      namespaces={namespaces}
      sx={{ height: '100%' }}
    />
  )
}
