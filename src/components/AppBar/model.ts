import { BoxProps } from '@mui/material'
import { ElementType, MouseEventHandler } from 'react'

export interface AppBarAction {
  text: string
  desktopIcon?: ElementType
  mobileIcon?: ElementType
  buttonProps: {
    onClick?: MouseEventHandler<HTMLElement>,
    href?: string,
    target?: string
  }
}

export interface AppBarSearch {
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ref?: React.RefObject<HTMLInputElement>
}

export interface AppBarSettings {
  title?: string
  actions?: AppBarAction[]
  search?: AppBarSearch
}

export interface AppBarProps extends BoxProps {

}
