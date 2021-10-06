import React, { ChangeEvent, Fragment, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useHistory } from 'react-router-dom'
import { NativeList as NativeListComponent } from '../../components'
import { useNativeSearch, useQuery, useSetAppBarSettings } from '../../hooks'

export default function NativeList() {
  const [filter, setFilter] = useState('')
  const namespaces = useNativeSearch(filter)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory()
  const query = useQuery()

  useEffect(() => {
    const search = query.get('search')
    setFilter(search ?? '')
  }, [query, setFilter])

  const handleSearchKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
      e.preventDefault()
    }
  }, [inputRef])

  const handleSearchBlur = useCallback(() => {
    if (filter) {
      history.replace(`${history.location.pathname}?search=${encodeURIComponent(filter)}`)
    }
    else {
      history.replace(history.location.pathname)
    }
  }, [history, filter])

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }, [setFilter])

  useSetAppBarSettings('NativeList', {
    search: {
      onChange: handleFilterChange,
      onKeyDown: handleSearchKeyDown,
      onBlur: handleSearchBlur,
      ref: inputRef,
      value: filter
    }
  })

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
      <NativeListComponent
        sx={{ height: '100%' }}
        namespaces={namespaces}
      />
    </Fragment>
  )
}
