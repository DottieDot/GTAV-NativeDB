import { Box } from '@material-ui/core'
import React, { memo, useCallback, useMemo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { StickyTree } from 'react-virtualized-sticky-tree'
import NativeHeader from '../NativeHeader'
import NativeListItem from './NativeListItem'

// export interface NativeListProps extends Omit<BoxProps, 'children'> {
//   namespaces: { [name: string]: Namespace }
// }

function NativeList({ namespaces, sx = {}, ...rest }) {
  const namespaceArray = useMemo(() => Object.values(namespaces), [namespaces])
  const namespaceData = useMemo(
    () => namespaceArray.reduce((accumulator, namespace) => {
      accumulator[namespace.name] = namespace.natives.map(hash => ({
        node: {
          id: hash,
        },
        height: 28,
        isSticky: false,
      }))
      return accumulator
    }, {}), [namespaceArray])

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
    if (id && (id[0] !== '0')) {
      return (
        <NativeHeader 
          id={id} 
          style={style} 
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
  }, [namespaces])

  return (
    <Box sx={{ flex: 1, ...sx }} {...rest}>
      <AutoSizer>
        {({ height, width }) => (
          <StickyTree
            root={{ node: { id: 'root' }, height: 0 }}
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
