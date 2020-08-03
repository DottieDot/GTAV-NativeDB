import React, { useState, useEffect, useCallback } from 'react'
import { NativeListItem, NamespaceHeader } from '../../components'
import { useSelector } from 'react-redux'
import { StickyTree } from 'react-virtualized-sticky-tree'
import AutoSizer from 'react-virtualized-auto-sizer'

export default React.memo(() => {
  const namespaces = useSelector(store => store.namespaces)
  const [namespaceData, setNamespaceData] = useState({})

  useEffect(() => {
    const result = Object.values(namespaces).reduce((accumulator, namespace) => {
      accumulator[namespace.name] = namespace.natives.map(hash => ({
        id: hash,
        height: 28,
        isSticky: false,
      }))
      return accumulator
    }, {})

    setNamespaceData(result)
  }, [namespaces])

  const getChildren = useCallback((id) => {
    if (id === 'root') {
      return Object.values(namespaces).map(ns => ({
        id: ns.name,
        height: 73,
        isSticky: true,
      }))
    }
    else if (id[0] !== '0') {
      return namespaceData[id]
    }
  }, [namespaces, namespaceData])

  const renderRow = useCallback(({ id, style }) => {
    if (id[0] !== '0') {
      return (
        <NamespaceHeader 
          id={id} 
          style={style} 
          name={namespaces[id].name} 
        />
      )
    }
    
    return (
      <div style={style} key={id}>
        <NativeListItem
          hash={id}
        />
      </div>
    )
  }, [namespaces])

  return (
    <AutoSizer>
      {({ height, width }) => (
        <StickyTree
          root={{ id: 'root', height: 0 }}
          width={width}
          height={height}
          getChildren={getChildren}
          rowRenderer={renderRow}
          renderRoot={false}
          overscanRowCount={5}
        />
      )}
    </AutoSizer>
  )
})
