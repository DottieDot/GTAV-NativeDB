import { TextField } from '@mui/material'
import _ from 'lodash'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCustomTheme } from '../../hooks'
import { patchTheme } from '../../store'

export interface ThemeJsonEditorProps {
  themeId: string
}

export default function ThemeJsonEditor({ themeId }: ThemeJsonEditorProps) {
  const dispatch = useDispatch()
  const theme = useCustomTheme(themeId)
  const [error, setError] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => setInput(JSON.stringify(_.omit(theme, ['id']), undefined, 2)), [theme])

  const handleInputChanged = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    setError(false)
  }, [])

  const handleBlur = useCallback(() => {
    try {
      const obj = JSON.parse(input)
      dispatch(patchTheme(themeId, obj))
    }
    catch {
      setError(true)
    }
  }, [dispatch, themeId, input])

  if (!theme) {
    return null
  }

  return (
    <TextField
      inputProps={{
        style: {
          fontFamily: 'Roboto Mono, Monospace'
        }
      }}
      value={input}
      onChange={handleInputChanged}
      onBlur={handleBlur}
      spellCheck={false}
      error={error}
      multiline
    />
  )
}
