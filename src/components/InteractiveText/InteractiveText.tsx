import { alpha, ButtonBase, ButtonBaseProps, styled } from '@mui/material'
import { forwardRef } from 'react'

const StyledButtonBase = styled(ButtonBase)(({ theme }) => {
  const background = alpha(theme.palette.getContrastText(theme.palette.background.paper), .08)
  return {
    font:         'inherit',
    fontSize:     'inherit',
    fontWeight:   'inherit',
    userSelect:   'inherit',
    transition:   'all ease-in-out .1s',
    borderRadius: theme.shape.borderRadius,
    outline:      `0px solid ${background}`,
    '&:hover':    {
      background:   background,
      outlineWidth: theme.spacing(.5)
    }
  }
})

export interface InteractiveTextProps extends ButtonBaseProps { 
  children?: string,
}

export default forwardRef(function InteractiveText({ children, ...rest }: InteractiveTextProps, ref) {
  if (!children) {
    return null
  }

  return (
    //https://github.com/mui/material-ui/issues/31194
    // @ts-ignore
    <StyledButtonBase {...rest} component="span" ref={ref}>
      {children}
    </StyledButtonBase>
  )
})
