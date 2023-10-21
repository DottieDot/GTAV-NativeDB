import { memo } from 'react'
import { useIsSmallDisplay } from '../../hooks'
import Desktop from './Desktop'
import Mobile from './Mobile'
import { AppBarProps } from './model'

function AppBar(props: AppBarProps) {
  const mobile = useIsSmallDisplay()

  return mobile ? <Mobile {...props} /> : <Desktop {...props} /> 
}
export default memo(AppBar)
