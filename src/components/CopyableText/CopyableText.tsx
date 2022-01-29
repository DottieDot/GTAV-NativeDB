import { alpha, ButtonBase, styled, Tooltip } from '@mui/material'
import { useCallback } from 'react'
import { useCopyToClipboard } from '../../hooks'

const StyledButtonBase = styled(ButtonBase)(({ theme }) => {
  const background = alpha(theme.palette.getContrastText(theme.palette.background.paper), .08)
  return {
    transition: 'all ease-in-out .1s',
    borderRadius: theme.shape.borderRadius,
    outline: `0px solid ${background}`,
    '&:hover': {
      background: background,
      outlineWidth: theme.spacing(.5)
    }
  }
})

export interface CopyableTextProps { 
  children?: string 
}

export default function CopyableText({ children }: CopyableTextProps) {
  const copyToClipboard = useCopyToClipboard()

  const onClick = useCallback(() => {
    children && copyToClipboard(children.replace(/\u200b/g, ''))
  }, [copyToClipboard, children])

  if (!children) {
    return null
  }
  
  return (
    <Tooltip title="Copy to clipboard" placement="top" arrow>
      <StyledButtonBase onClick={onClick}>
        {children}
      </StyledButtonBase>
    </Tooltip>
  )
}