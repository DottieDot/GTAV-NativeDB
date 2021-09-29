import { BoxProps, ButtonBaseProps } from '@material-ui/core'
import { ElementType, RefObject } from 'react'

export interface AppBarAction {
  text       : string
  icon      ?: ElementType
  buttonProps: ButtonBaseProps & { href?: string, target?: string }
}

export interface AppBarSettings {
  title  ?: string
  actions?: AppBarAction[]
}

export interface AppBarProps extends BoxProps {
  toolbarRef?: RefObject<HTMLDivElement>
  settings?: AppBarSettings
}
