import { Box, BoxProps } from '@mui/material'
import { memo, useCallback, useMemo, useState, useEffect } from 'react'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import AutoSizer from 'react-virtualized-auto-sizer'
import { StickyTree, StickyTreeRowRenderer, StickyTreeGetChildren, TreeNode, StickyTreeNode } from 'react-virtualized-sticky-tree'
import { Namespace } from '../../context'
import NamespaceHeader from '../NamespaceHeader'
import JumpToNamespace from './JumpToNamespace'
import NativeListItem from './NativeListItem'

export interface NativeListProps extends Omit<BoxProps, 'children'> {
  namespaces: { [name: string]: Namespace }
}

function NativeList({ namespaces, sx = {}, ...rest }: NativeListProps) {
  const namespaceArray = useMemo(() => Object.values(namespaces), [ namespaces ])
  const namespaceData = useMemo(
    () => namespaceArray.reduce<{[name: string]: StickyTreeNode<TreeNode>[]}>((accumulator, namespace) => {
      accumulator[namespace.name] = namespace.natives.map(hash => ({
        node:     { id: hash },
        height:   32,
        isSticky: false
      }))
      return accumulator
    }, {}), [ namespaceArray ])
  const { native: selectedNativeHash = '' } = useParams<{ native: string } >()
  const [ hasScrolledToNative, setHasScrolledToNative ] = useState(false)
  const [ listLoaded, setListLoaded ] = useState(false)
  const listRef = useRef<StickyTree>(null)

  useEffect(() => {
    if (hasScrolledToNative || !listRef.current || !listLoaded) {
      return
    }
    setHasScrolledToNative(true)

    listRef.current.scrollNodeIntoView(selectedNativeHash)
  }, [ listRef, selectedNativeHash, hasScrolledToNative, listLoaded, setHasScrolledToNative ])

  const jumpToNamespace = useCallback((namespace: string) => {
    listRef.current?.scrollNodeIntoView(namespace)
  }, [ listRef ])

  const getChildren = useCallback<StickyTreeGetChildren<TreeNode>>(({ id }) => {
    if (typeof id === 'number') {
      id = id.toString()
    }

    if (!listLoaded) {
      setListLoaded(true)
    }

    if (id === 'root') {
      return namespaceArray.map(ns => ({
        node:     { id: ns.name },
        height:   73,
        isSticky: true
      }))
    }
    else if (id && (id[0] !== '0')) {
      return namespaceData[id]
    }
  }, [ namespaceData, namespaceArray, listLoaded, setListLoaded ])

  const renderRow = useCallback<StickyTreeRowRenderer<TreeNode, unknown>>(({ node: { id }, style }) => {
    if (typeof id === 'number') {
      id = id.toString()
    }

    if (id && (id[0] !== '0')) {
      return (
        <NamespaceHeader 
          namespace={id}
          nativeCount={namespaces[id].natives.length}
          style={{
            ...style,
            zIndex: 1 
          }} 
        />
      )
    }
    
    return (
      <div key={id} style={style}>
        <NativeListItem
          nativeHash={id}
        />
      </div>
    )
  }, [ namespaces ])

  return (
    <Box
      sx={{
        flex: 1,
        ...sx 
      }}
      {...rest}
    >
      <JumpToNamespace 
        namespaces={namespaces}
        onNamespaceClicked={jumpToNamespace}
      />

      <AutoSizer>
        {({ height, width }) => (
          <StickyTree
            getChildren={getChildren}
            height={height}
            overscanRowCount={10}
            ref={listRef}
            renderRoot={false}
            root={{
              node:   { id: 'root' },
              height: 0 
            }}
            rowRenderer={renderRow}
            width={width}
          />
        )}
      </AutoSizer>
    </Box>
  )
}
export default memo(NativeList)
