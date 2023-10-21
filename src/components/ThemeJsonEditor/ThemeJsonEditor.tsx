import { TextField } from '@mui/material'
import _ from 'lodash'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useCustomTheme } from '../../hooks'
import { useThemesContext } from '../../context'

export interface ThemeJsonEditorProps {
  themeId: string
}

export default function ThemeJsonEditor({ themeId }: ThemeJsonEditorProps) {
  const { patchTheme } = useThemesContext()
  const theme = useCustomTheme(themeId)
  const [ error, setError ] = useState(false)
  const [ input, setInput ] = useState('')

  useEffect(() => setInput(JSON.stringify(_.omit(theme, [ 'id' ]), undefined, 2)), [ theme ])

  const handleInputChanged = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    setError(false)
  }, [])

  const handleBlur = useCallback(() => {
    try {
      const obj = JSON.parse(input)
      patchTheme(themeId, obj)
    }
    catch {
      setError(true)
    }
  }, [ patchTheme, themeId, input ])

  if (!theme) {
    return null
  }

  return (
    <TextField
      error={error}
      inputProps={{ style: { fontFamily: 'Roboto Mono, Monospace' }}}
      onBlur={handleBlur}
      onChange={handleInputChanged}
      spellCheck={false}
      value={input}
      multiline
    />
  )
}
