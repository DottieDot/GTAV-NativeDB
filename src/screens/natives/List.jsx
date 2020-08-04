import React, { useState, useEffect, useCallback } from 'react'
import { NativeListItem, NamespaceHeader } from '../../components'
import { useSelector } from 'react-redux'
import { StickyTree } from 'react-virtualized-sticky-tree'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useParams } from 'react-router-dom'

export default React.memo(() => {
  const namespaces = useSelector(store => store.search)
  const [namespaceData, setNamespaceData] = useState({})
  const selectedNative = useSelector(({ natives }) => natives[useParams()['native']]) ?? {}
  const [ scroll, setScroll ] = useState(-1)
  const [ hasScrolledToNative, setHasScrolledToNative ] = useState(false)
  const [ listLoaded, setListLoaded] = useState(false)

  useEffect(() => {
    if (listLoaded && Object.keys(namespaces).length) {
      setScroll(0)
    }
  }, [namespaces, listLoaded])
  
  useEffect(() => {
    if (listLoaded && scroll !== -1) {
      setScroll(-1)
    }
  }, [scroll, listLoaded])

  useEffect(() => {
    if (hasScrolledToNative || !Object.keys(namespaces).length || !listLoaded) {
      return
    }

    let result = -1
    for (const ns in namespaces) {
      if (ns === selectedNative.namespace) {
        result += 3 + namespaces[ns].natives.findIndex(hash => hash === selectedNative.hash)
        break
      }
      result += namespaces[ns]?.natives?.length + 1
    }

    setScroll(result)
    setHasScrolledToNative(true)
  }, [selectedNative, hasScrolledToNative, namespaces, scroll, listLoaded])

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
    else if (id && (id[0] !== '0')) {
      return namespaceData[id]
    }
  }, [namespaces, namespaceData])

  const renderRow = useCallback(({ id, style }) => {
    if (!listLoaded) {
      setListLoaded(true)
    }

    if (id && (id[0] !== '0')) {
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
  }, [namespaces, listLoaded ])

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
          scrollIndex={scroll}
        />
      )}
    </AutoSizer>
  )
})
