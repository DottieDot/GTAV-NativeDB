import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { NativeListItem } from '../components'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useCallback } from 'react'
import { StickyTree } from 'react-virtualized-sticky-tree'

const useStyles = makeStyles(theme => ({
  descriptionPane: {
    background: theme.palette.background.default
  },
  nativesPane: {
    background: theme.palette.background.paper,
    overflowX: 'hidden'
  }
}))

export default () => {
  const classes = useStyles()
  const namespaces = useSelector(store => store.namespaces)
  const natives = useSelector(store => store.natives)
  const sections = useState({})

  const getChildren = useCallback((id) => {
    if (!namespaces)
      return []

    if (id === 'root') {
      return Object.values(namespaces).map(ns => ({
        id: ns.name,
        height: 77.5,
        isSticky: true,
      }))
    }
    else if (id[0] !== '0') {
      return namespaces[id].natives.map(hash => ({
        id: hash,
        height: 28,
        isSticky: false,
      }))
    }
  }, [namespaces])

  const renderRow = useCallback(({ id, style }) => {
    if (id[0] !== '0') {
      return (
        <h1 style={style} key={id}>{namespaces[id].name}</h1>
      )
    }
    
    return (
      <NativeListItem
        key={id}
        style={style}
        name={natives[id].name}
        params={natives[id].params}
        return_type={natives[id].return_type}
      />
    )
  }, [namespaces, natives])

  return (
    <Grid container>
      <Grid className={classes.descriptionPane} md={4} xs={12} item>

      </Grid>
      <Grid className={classes.nativesPane} md={8} xs={12} item>
        <StickyTree
          root={{ id: 'root', height: 0 }}
          width={200}
          height={400}
          getChildren={getChildren}
          rowRenderer={renderRow}
          renderRoot={false}
          overscanRowCount={20}
        />
      </Grid>
    </Grid>
  )
}
