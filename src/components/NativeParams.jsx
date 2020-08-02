import React from 'react'
import NativeType from './NativeType'

export default React.memo(({ params = [] }) => {
  return (
    <span>
      {'('}
      {params.map(({ type, name }, index) => (
        <React.Fragment>
          <NativeType name={type} />
          {' '}{name}
          {((index + 1) !== params.length) && ', '}
        </React.Fragment>
      ))}
      {')'}
    </span>
  )
})
