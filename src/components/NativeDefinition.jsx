import React from 'react'
import NativeType from './NativeType'
import NativeParams from './NativeParams'

export default React.memo(({ name, params, return_type, noWrap = false }) => {
  return (
    <span 
      style={{
        whiteSpace: noWrap ? 'nowrap' : undefined
      }}
    >
      <NativeType name={return_type} />
      {' '}{name}
      <NativeParams params={params} />
    </span>
  )
})
