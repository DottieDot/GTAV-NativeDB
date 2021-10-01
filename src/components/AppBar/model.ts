import { BoxProps, ButtonBaseProps } from '@material-ui/core'
import { ElementType } from 'react'

export interface AppBarAction {
  text       : string
  icon      ?: ElementType
  buttonProps: ButtonBaseProps & { href?: string, target?: string }
}

export interface AppBarSearch {
  value    ?: string
  onChange ?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur   ?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ref      ?: React.RefObject<HTMLInputElement>
}

export interface AppBarSettings {
  title  ?: string
  actions?: AppBarAction[]
  search ?: AppBarSearch
}

export interface AppBarProps extends BoxProps {

}
