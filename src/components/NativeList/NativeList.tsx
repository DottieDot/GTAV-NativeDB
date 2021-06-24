import { BoxProps, Box } from '@material-ui/core'
import React, { memo, useMemo, useCallback } from 'react'
import { Namespace } from '../../store'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList  as List, ListChildComponentProps } from 'react-window'
import { useNative } from '../../hooks'
import { CSSProperties } from 'react'
import { forwardRef } from 'react'
import NativeHeader from '../NativeHeader'
import NativeListItem from './NativeListItem'

export interface NativeListProps extends Omit<BoxProps, 'children'> {
  namespaces: { [name: string]: Namespace }
}

function Row({ nativeHash, style }: { nativeHash: string, style: CSSProperties }) {
  const native = useNative(nativeHash)

  if (!native) {
    return <div style={style} />
  }

  return (
    <div style={style}>
      {native.name}
    </div>
  )
}

const LIST_ITEM_HEIGHT = 28
const NAMESPACE_HEADER_HEIGHT = 73

function NativeList({ namespaces, sx, ...rest }: NativeListProps) {
  const namespaceArray = useMemo(() => Object.values(namespaces), [namespaces])
  const natives = useMemo(
    () => namespaceArray.reduce<string[]>((acc, ns) => [...acc, '__GAP__', ...ns.natives], []),
    [namespaceArray]
  )

  const renderRow = useCallback(({ index, style }: ListChildComponentProps) => {
    if (natives[index] === '__GAP__') {
      return <div style={style} />
    }

    return (
      <NativeListItem 
        style={style} 
        nativeHash={natives[index]}
      />
    )
  }, [natives])

  const innerElementType = useMemo(() =>forwardRef(({ children, ...rest }: any, ref) => {
    return (
      <div ref={ref} {...rest}>
        {namespaceArray.map((ns) => (
          <div
            key={ns.name}
            style={{
              height: ns.natives.length * LIST_ITEM_HEIGHT + NAMESPACE_HEADER_HEIGHT
            }}
          >
            <NativeHeader 
              style={{
                top: 0,
                left: 0,
                position: 'sticky',
                zIndex: 1
              }}
            >
              {ns.name}
            </NativeHeader>
          </div>
        ))}

        {children}
      </div>
    )
  }), [namespaceArray])

  return (
    <Box sx={{ flex: 1, ...sx }} {...rest}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={natives.length}
            innerElementType={innerElementType}
            itemSize={(index) => natives[index] === '__GAP__' ? NAMESPACE_HEADER_HEIGHT : LIST_ITEM_HEIGHT}
          >
            {renderRow}
          </List>
        )}
      </AutoSizer>
    </Box>
  )
}
export default memo(NativeList)
