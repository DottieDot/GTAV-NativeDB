import { Add as AddIcon, DataObject as JsonIcon, GridView as GuiIcon } from '@mui/icons-material'
import { Autocomplete, Box, Stack, TextField, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useThemes } from '../../hooks'
import ThemeEditor from '../ThemeEditor'
import ThemeJsonEditor from '../ThemeJsonEditor'
import { useThemesContext } from '../../context'

function useCreateTheme(setSelectedTheme: (id: string) => void) {
  const { addTheme } = useThemesContext()
  const { palette, extensions } = useTheme()
  const themes = useThemes()
  
  const numNewThemes = useMemo(() => {
    let max = 0
    for (const theme of Object.values(themes)) {
      const prefix = 'New Theme '
      if (theme.name.startsWith(prefix)) {
        const n = parseInt(theme.name.slice('New Theme '.length)) ?? 0
        if (n > max) {
          max = n
        }
      }
    }

    return max
  }, [ themes ])

  return useCallback(() => {
    const id = uuidv4()
    addTheme({
      id,
      name:   `New Theme ${numNewThemes + 1}`,
      mode:   palette.mode,
      colors: {
        primary:                     palette.primary.main,
        secondary:                   palette.secondary.main,
        background:                  palette.background.default,
        paper:                       palette.background.paper,
        text:                        palette.text.primary,
        nativeValueHighlight:        extensions.nativeValueHighlight,
        constantIdentifierHighlight: extensions.constantIdentifierHighlight,
        typeInfoBorderColor:         extensions.typeInfoBorderColor,
        parameterColor:              extensions.parameterColor,
        symbolColor:                 extensions.symbolColor
      }
    })
    setSelectedTheme(id)
  }, [ palette, extensions, addTheme, numNewThemes, setSelectedTheme ])
}

function ThemeManager() {
  const [ editorMode, setEditorMode ] = useState<'gui' | 'json'>('gui')
  const themes = useThemes()
  const [ selectedTheme, setSelectedTheme ] = useState<string | null>(null)
  const themeIds = useMemo(() => Object.keys(themes), [ themes ])

  const handleEditorModeChanged = useCallback((_: unknown, value: unknown) => {
    if (value === 'gui' || value === 'json') {
      setEditorMode(value)
    }
  }, [])

  const handleSelectionChanged = useCallback((_: unknown, value: string | null) => {
    setSelectedTheme(value)
  }, [])

  useEffect(() => {
    if (selectedTheme !== null && themes[selectedTheme] === undefined) {
      setSelectedTheme(null)
    }
  }, [ themes, selectedTheme ])

  const createTheme = useCreateTheme(setSelectedTheme)

  return (
    <Stack gap={2}>
      <Box 
        sx={{
          display:       'flex',
          flexDirection: 'row',
          alignItems:    'center',
          width:         '100%',
          gap:           2
        }}
      >
        <Autocomplete
          getOptionLabel={(id) => themes[id]?.name ?? 'undefined'}
          id="theme-selector"
          onChange={handleSelectionChanged}
          options={themeIds}
          renderInput={(params: object) => <TextField {...params} label="Theme" />}
          size="small"
          value={selectedTheme}
          disablePortal
          fullWidth
        />

        <ToggleButton onClick={createTheme} size="small" value="...">
          <AddIcon />
        </ToggleButton>

        <ToggleButtonGroup
          onChange={handleEditorModeChanged}
          value={editorMode}
          exclusive
        >
          <ToggleButton size="small" value="gui">
            <GuiIcon />
          </ToggleButton>

          <ToggleButton size="small" value="json">
            <JsonIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {(selectedTheme) && (
        editorMode === 'gui' ? (
          <ThemeEditor themeId={selectedTheme} />
        ) : (
          <ThemeJsonEditor themeId={selectedTheme} />
        )
      )}
    </Stack>
  )
}

export default memo(ThemeManager)
