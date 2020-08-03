import React from 'react'
import NativeType from './NativeType'

export default React.memo(({ params = [] }) => {
  return (
    <span>
      {'(\u200B'}
      {params.map(({ type, name }, index) => (
        <React.Fragment key={name}>
          <NativeType name={type} />
          &nbsp;{name}
          {((index + 1) !== params.length) && ', '}
        </React.Fragment>
      ))}
      {')'}
    </span>
  )
})
