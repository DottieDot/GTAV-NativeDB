import { Tooltip } from '@mui/material'
import { useCallback } from 'react'
import { useCopyToClipboard } from '../../hooks'
import InteractiveText from '../InteractiveText'

export interface CopyableTextProps { 
  children?: string 
}

export default function CopyableText({ children }: CopyableTextProps) {
  const copyToClipboard = useCopyToClipboard()

  const onClick = useCallback(() => {
    children && copyToClipboard(children.replace(/\u200b/g, ''))
  }, [ copyToClipboard, children ])

  if (!children) {
    return null
  }
  
  return (
    <Tooltip placement="top" title="Copy to clipboard" arrow>
      <InteractiveText onClick={onClick}>
        {children}
      </InteractiveText>
    </Tooltip>
  )
}