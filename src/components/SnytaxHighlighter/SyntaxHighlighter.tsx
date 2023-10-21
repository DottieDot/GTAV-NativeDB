import { useTheme } from '@mui/material'
import { memo } from 'react'
import Highlighter from 'react-syntax-highlighter'
import { atomOneDark as darkStyle, atomOneLight as lightStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export interface SyntaxHighlighterProps {
  language: string
  children?: string
  customStyle?: object
}

function SyntaxHighlighter({ language, children, customStyle }: SyntaxHighlighterProps) {
  const theme = useTheme()

  const highlighterStyle = theme.palette.mode === 'dark'
    ? darkStyle
    : lightStyle

  return (
    <Highlighter 
      customStyle={{ 
        background: 'none', 
        padding:    theme.spacing(2), 
        margin:     0,
        ...customStyle
      }} 
      language={language} 
      style={highlighterStyle}
    >
      {children}
    </Highlighter>
  )
}

export default memo(SyntaxHighlighter)
