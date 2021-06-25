import { Box, BoxProps } from '@material-ui/core'
import React, { memo, useCallback, useMemo, useState, useEffect } from 'react'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import AutoSizer from 'react-virtualized-auto-sizer'
import { StickyTree } from 'react-virtualized-sticky-tree'
import { useNative } from '../../hooks'
import { Namespace } from '../../store'
import NativeHeader from '../NativeHeader'
import NativeListItem from './NativeListItem'

export interface NativeListProps extends Omit<BoxProps, 'children'> {
  namespaces: { [name: string]: Namespace }
}

function NativeList({ namespaces, sx = {}, ...rest }: NativeListProps) {
  const namespaceArray = useMemo(() => Object.values(namespaces), [namespaces])
  const namespaceData = useMemo(
    () => namespaceArray.reduce<{[name: string]: any}>((accumulator, namespace) => {
      accumulator[namespace.name] = namespace.natives.map(hash => ({
        node: {
          id: hash,
        },
        height: 28,
        isSticky: false,
      }))
      return accumulator
    }, {}), [namespaceArray])
  const { native: selectedNativeHash } = useParams<{ native: string } >()
  const selectedNative = useNative(selectedNativeHash)
  const [scrollTop, setScrollTop] = useState(-1)
  const [hasScrolledToNative, setHasScrolledToNative] = useState(false)
  const [listLoaded, setListLoaded] = useState(false)
  const listRef = useRef<StickyTree>(null)

  useEffect(() => {
    if (!listLoaded || hasScrolledToNative) {
      return
    }
    setHasScrolledToNative(true)
    if (!selectedNative) {
      return
    }

    let index = 0
    let found = false
    for (const ns of namespaceArray) {
      if (ns.name === selectedNative.namespace) {
        index += ns.natives.indexOf(selectedNative.hash) + 2
        found = true
        break
      }
      index += ns.natives.length + 1
    }
    if (found) {
      setScrollTop(index)
    }
  }, [setScrollTop, namespaceArray, selectedNative, hasScrolledToNative, setHasScrolledToNative, listLoaded])

  useEffect(() => {
    if (scrollTop !== -1) {
      setScrollTop(-1)
    }
  }, [scrollTop, setScrollTop])

  const getChildren = useCallback(({ id }) => {
    if (id === 'root') {
      return namespaceArray.map(ns => ({
        node: {
          id: ns.name
        },
        height: 73,
        isSticky: true,
      }))
    }
    else if (id && (id[0] !== '0')) {
      return namespaceData[id]
    }
  }, [namespaceData, namespaceArray])

  const renderRow = useCallback(({ node: { id }, style }) => {
    if (!listLoaded) {
      setListLoaded(true)
    }

    if (id && (id[0] !== '0')) {
      return (
        <NativeHeader 
          id={id} 
          style={{...style, zIndex: 1 }} 
        >
          {namespaces[id].name}
        </NativeHeader>
      )
    }
    
    return (
      <NativeListItem
        nativeHash={id}
        style={style}
        key={id}
      />
    )
  }, [namespaces, listLoaded, setListLoaded])

  return (
    <Box sx={{ flex: 1, ...sx }} {...rest}>
      <AutoSizer>
        {({ height, width }) => (
          <StickyTree
            root={{ node: { id: 'root' }, height: 0 }}
            scrollIndex={scrollTop}
            ref={listRef}
            width={width}
            height={height}
            getChildren={getChildren}
            rowRenderer={renderRow}
            renderRoot={false}
            overscanRowCount={5}
          />
        )}
      </AutoSizer>
    </Box>
  )
}
export default memo(NativeList)
