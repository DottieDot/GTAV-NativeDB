import React, { memo } from 'react'
import Desktop from './Desktop'
import { AppBarProps } from './model'

function AppBar(props: AppBarProps) {
  return (
    <Desktop {...props} />
  )
}
export default memo(AppBar)
